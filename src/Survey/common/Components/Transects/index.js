import React from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { device, Page, Header, loader, toast } from '@apps';
import Sample from 'sample';
import { Trans as T, withTranslation } from 'react-i18next';
import { IonButton, NavContext } from '@ionic/react';
import Main from './Main';

const { success, error, warn } = toast;

@observer
class index extends React.Component {
  static contextType = NavContext;

  static propTypes = {
    sample: PropTypes.object.isRequired,
    appModel: PropTypes.object.isRequired,
    match: PropTypes.object,
    t: PropTypes.func.isRequired,
  };

  state = { refreshing: false };

  addSectionSubSamples = () => {
    const { sample } = this.props;
    const { location } = sample.attrs;
    const survey = sample.getSurvey();

    sample.samples.length = 0;

    location.locations.forEach(loc => {
      const sectionSample = survey.smp.create(Sample, loc);
      sample.samples.push(sectionSample);
    });
  };

  onSelect = async locationGroup => {
    const { sample } = this.props;

    const location = toJS(locationGroup);
    sample.attrs.location = location;

    if (!sample.metadata.ignoreTransectSections) {
      this.addSectionSubSamples();
    }

    await sample.save();
    this.context.goBack();
  };

  refreshData = async () => {
    if (this.state.refreshing) {
      return;
    }

    const { appModel, t } = this.props;

    if (!device.isOnline()) {
      warn(t("Sorry, looks like you're offline."));
      return;
    }

    this.setState({ refreshing: true });

    await loader.show({
      message: `${t('Please wait...')}<br/><small>${t(
        'Getting locations.'
      )}</small>`,
    });

    try {
      await appModel.updateLocations();

      await loader.show({
        message: `${t('Please wait...')}<br/><small>${t(
          'Downloading images.'
        )}</small>`,
      });

      await appModel.updateLocationImages();

      success(t('List was successfully updated.'));
    } catch (e) {
      error(e.message);
    }

    this.setState({ refreshing: false });
    await loader.hide();
  };

  cancelSelectedTransect = () => {
    this.context.goBack();
  };

  componentDidMount = () => {
    const { appModel } = this.props;
    if (!appModel.attrs.locations.length && device.isOnline()) {
      this.refreshData();
    }
  };

  render() {
    const { sample, appModel, match } = this.props;
    const refreshButton = (
      <IonButton onClick={this.refreshData}>
        <T>Refresh</T>
      </IonButton>
    );

    const { locationType } = sample.getSurvey();
    const locations = appModel.attrs.locations.filter(
      ({ type }) => type === locationType
    );

    return (
      <Page id="transects-list">
        <Header
          title="Transects"
          rightSlot={refreshButton}
          defaultHref="/home/user-surveys"
        />
        <Main
          sample={sample}
          locations={locations}
          onSelect={this.onSelect}
          match={match}
          cancelSelectedTransect={this.cancelSelectedTransect}
        />
      </Page>
    );
  }
}

export default withTranslation()(index);
