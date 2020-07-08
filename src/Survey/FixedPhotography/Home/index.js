import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { IonButton, NavContext } from '@ionic/react';
import { Page, Header, toast, device } from '@apps';
import { Trans as T } from 'react-i18next';
import showInvalidsMessage from 'helpers/invalidsMessage';
import survey from '../config';
import Main from './Main';

const { warn } = toast;

@observer
class Controller extends React.Component {
  static contextType = NavContext;

  static propTypes = {
    sample: PropTypes.object.isRequired,
    appModel: PropTypes.object.isRequired,
    userModel: PropTypes.object.isRequired,
  };

  onUpload = async () => {
    const { sample, appModel, userModel } = this.props;

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

    // should we sync?
    if (!device.isOnline()) {
      warn(t('Looks like you are offline!'));
      return;
    }

    const isLoggedIn = !!userModel.attrs.id;
    if (!isLoggedIn) {
      warn(t('Please log in first to upload the records.'));
      return;
    }

    sample.saveRemote();
    this.context.navigate('/home/user-surveys', 'root');
  };

  render() {
    const { sample } = this.props;

    const uploadButton = !sample.isDisabled() ? (
      <IonButton onClick={this.onUpload}>
        <T>Upload</T>
      </IonButton>
    ) : null;

    return (
      <Page id="survey-fixed-photography-edit">
        <Header title={survey.label} rightSlot={uploadButton} />
        <Main {...this.props} />
      </Page>
    );
  }
}

export default Controller;
