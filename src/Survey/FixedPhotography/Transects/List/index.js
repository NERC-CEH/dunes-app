import React from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { device, Page, Header } from '@apps';
import { Trans as T, withTranslation } from 'react-i18next';
import loader from 'common/helpers/loader';
import { IonButton, NavContext } from '@ionic/react';
import { success, error, warn } from 'common/helpers/toast';
import Main from './Main';

@observer
class index extends React.Component {
  static contextType = NavContext;

  static propTypes = {
    sample: PropTypes.object.isRequired,
    userModel: PropTypes.object.isRequired,
    match: PropTypes.object,
    t: PropTypes.func.isRequired,
  };

  addSectionSubSamples = () => {
    const { sample } = this.props;
    const transect = sample.attrs.location;

    transect.sections.forEach(() => {
      // const sectionSample = modelFactory.createTransectSectionSample(section);
      // sample.samples.push(sectionSample);
    });
  };

  onTransectSelect = async transect => {
    const { sample } = this.props;

    const location = toJS(transect);
    sample.attrs.location = location;
    this.addSectionSubSamples();

    await sample.save();
    this.context.goBack();
  };

  refreshUserTransects = async () => {
    const { userModel, t } = this.props;

    if (!device.isOnline()) {
      warn(t("Sorry, looks like you're offline."));
      return;
    }

    await loader.show({
      message: t('Please wait...'),
    });

    try {
      await userModel.updateTransects();

      success(t('Transect list was successfully updated.'));
    } catch (e) {
      error(e.message);
    }
    await loader.hide();
  };

  componentDidMount = () => {
    const { userModel } = this.props;
    if (!userModel.attrs.transects.length && device.isOnline()) {
      this.refreshUserTransects();
    }
  };

  render() {
    const { sample, userModel, match } = this.props;
    const refreshButton = (
      <IonButton onClick={this.refreshUserTransects}>
        <T>Refresh</T>
      </IonButton>
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
          userModel={userModel}
          onTransectSelect={this.onTransectSelect}
          match={match}
        />
      </Page>
    );
  }
}

export default withTranslation()(index);
