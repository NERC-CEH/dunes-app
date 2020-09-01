import React from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { device, Page, Header, loader, toast } from '@apps';
import Sample from 'sample';
import Occurrence from 'occurrence';
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
    userModel: PropTypes.object.isRequired,
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
      const sectionSample = survey.smp.create(Sample, loc, Occurrence);
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

    const { sample, userModel, appModel, t } = this.props;

    if (!device.isOnline()) {
      warn(t("Sorry, looks like you're offline."));
      return;
    }

    const isLoggedIn = !!userModel.attrs.id;
    if (!isLoggedIn) {
      warn(t('Please log in to refresh the data.'));
      return;
    }

    this.setState({ refreshing: true });

    await loader.show({
      message: `${t('Please wait...')}<br/><small>${t(
        'Getting locations.'
      )}</small>`,
    });

    try {
      await appModel.updateLocations(sample.metadata.site);

      await loader.show({
        message: `${t('Please wait...')}<br/><small>${t(
          'Downloading images.'
        )}</small>`,
      });

      await appModel.updateLocationImages();

      if (!appModel.attrs.locations.length) {
        warn(
          t('Sorry, this site do not have any locations for this activity yet.')
        );
      } else {
        success(t('List was successfully updated.'));
      }
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

    const title =
      sample.metadata.survey === 'plant-quadrat'
        ? 'Quadrat groups'
        : 'Transects';

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
          title={title}
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
