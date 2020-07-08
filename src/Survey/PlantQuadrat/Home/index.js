import React from 'react';
import { observer } from 'mobx-react';
// import { IonButton } from '@ionic/react';
import { Page, Header } from '@apps';
// import { Trans as T } from 'react-i18next';
import survey from '../config';
import Main from './Main';

@observer
class Controller extends React.Component {
  static propTypes = {};

  onUpload = async () => {
    // TODO:
  };

  render() {
    // const uploadButton = (
    //   <IonButton onClick={this.onUpload}>
    //     <T>Upload</T>
    //   </IonButton>
    // );

    return (
      <Page id="survey-plant-quadrat-edit">
        <Header
          title={survey.label}
          // rightSlot={uploadButton}
        />
        <Main {...this.props} />
      </Page>
    );
  }
}

export default Controller;
