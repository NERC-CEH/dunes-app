import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { IonButton, NavContext } from '@ionic/react';
import {
  Page,
  Header,
  showInvalidsMessage,
  toast,
  loader,
  device,
} from '@apps';
import { Trans as T } from 'react-i18next';
import Footer from 'common/Components/Footer';
import Main from './Main';

const { warn } = toast;

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

    sample.metadata.saved = true;
    await sample.save();

    const invalids = sample.validateRemote();
    if (invalids) {
      showInvalidsMessage(invalids);
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
    const isDisabled = sample.isDisabled();

    const uploadButton = !isDisabled ? (
      <IonButton onClick={this.onUpload}>
        <T>Upload</T>
      </IonButton>
    ) : null;

    return (
      <Page id={`survey-${survey.name}-edit`}>
        <Header title={survey.label} rightSlot={uploadButton} />
        <Main {...this.props} isDisabled={isDisabled} />
        <Footer sample={sample} />
      </Page>
    );
  }
}

export default Controller;
