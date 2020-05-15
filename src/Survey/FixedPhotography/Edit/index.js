import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
// import { IonButton } from '@ionic/react';
import { Page, Header } from '@apps';
// import { Trans as T } from 'react-i18next';
import survey from 'common/config/surveys/photography';
import Main from './Main';

@observer
class Controller extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
    match: PropTypes.object,
  };

  onUpload = async () => {
    // TODO:
  };

  render() {
    const { match, sample } = this.props;

    // const uploadButton = (
    //   <IonButton onClick={this.onUpload}>
    //     <T>Upload</T>
    //   </IonButton>
    // );

    return (
      <Page id="survey-fixed-photography-edit">
        <Header
          title={survey.label}
          // rightSlot={uploadButton}
          defaultHref="/home/surveys"
        />
        <Main sample={sample} baseURL={match.url} />
      </Page>
    );
  }
}

export default Controller;
