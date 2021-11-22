import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { IonButton, NavContext } from '@ionic/react';
import {
  Page,
  Header,
  toast,
  loader,
  device,
  showInvalidsMessage,
  alert,
} from '@apps';
import { Trans as T } from 'react-i18next';
import Footer from 'common/Components/Footer/';
import Main from './Main';

const { warn } = toast;

function confirmLocations(sample) {
  const isCompleted = smp => smp.metadata.completed;
  const getSampleName = smp => (
    <p>
      <b>{smp.getPrettyName()}</b>
    </p>
  );
  const locations = sample.samples.filter(isCompleted).map(getSampleName);

  return new Promise(resolve => {
    alert({
      header: 'Locations',
      message: (
        <>
          <T>You have finished recording these locations, is this correct?</T>
          {locations}
        </>
      ),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => resolve(false),
        },
        {
          text: 'OK',
          cssClass: 'primary',
          handler: () => resolve(true),
        },
      ],
    });
  });
}

@observer
class Controller extends React.Component {
  static contextType = NavContext;

  static propTypes = {
    survey: PropTypes.object.isRequired,
    sample: PropTypes.object.isRequired,
    appModel: PropTypes.object.isRequired,
    userModel: PropTypes.object.isRequired,
  };

  onUpload = async () => {
    const { sample, appModel, userModel, survey } = this.props;
    const draftIdKey = `draftId:${survey.name}`;

    appModel.attrs[draftIdKey] = null;
    await appModel.save();

    const invalids = sample.validateRemote();

    if (invalids) {
      showInvalidsMessage(invalids);
      return;
    }

    if (!sample.metadata.saved) {
      if (sample.isFixedLocationSurvey()) {
        const confirmedCorrect = await confirmLocations(sample);
        if (!confirmedCorrect) return;
      }

      sample.metadata.saved = true;
      await sample.save();

      this.context.navigate('/home/user-surveys', 'root');
      return;
    }

    if (!device.isOnline()) {
      warn(t('Looks like you are offline!'));
      return;
    }

    const isLoggedIn = !!userModel.attrs.id;
    if (!isLoggedIn) {
      warn(t('Please log in first to upload the records.'));
      return;
    }

    if (!userModel.attrs.verified) {
      await loader.show({
        message: t('Please wait...'),
      });

      try {
        await userModel.refreshProfile();
      } catch (e) {
        // do nothing
      }

      loader.hide();

      if (!userModel.attrs.verified) {
        warn(t("Sorry, your account hasn't been verified yet or is blocked."));
        return;
      }
    }

    sample.saveRemote();
    this.context.navigate('/home/user-surveys', 'root');
  };

  render() {
    const { sample, survey } = this.props;
    const isSaved = sample.metadata.saved;

    const uploadButton = !sample.isDisabled() ? (
      <IonButton onClick={this.onUpload}>
        {isSaved ? <T>Upload</T> : <T>Finish</T>}
      </IonButton>
    ) : null;

    return (
      <Page id={`survey-${survey.name}-edit`}>
        <Header title={survey.label} rightSlot={uploadButton} />
        <Main {...this.props} />
        <Footer sample={sample} />
      </Page>
    );
  }
}

export default Controller;
