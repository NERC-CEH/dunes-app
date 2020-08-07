import React from 'react';
import PropTypes from 'prop-types';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonBadge,
  IonIcon,
  IonButton,
} from '@ionic/react';
import { Trans as T } from 'react-i18next';
import InfoBackgroundMessage from 'Components/InfoBackgroundMessage';
import { add } from 'ionicons/icons';
import { observer } from 'mobx-react';
import { Page, Main } from '@apps';
import Survey from './components/Survey';
import './styles.scss';

function byCreateTime(occ1, occ2) {
  const date1 = new Date(occ1.metadata.created_on);
  const date2 = new Date(occ2.metadata.created_on);
  return date2.getTime() - date1.getTime();
}

@observer
class Component extends React.Component {
  static propTypes = {
    savedSamples: PropTypes.array.isRequired,
  };

  state = {
    segment: 'pending',
  };

  onSegmentClick = e => this.setState({ segment: e.detail.value });

  getSamplesList(uploaded) {
    const { savedSamples } = this.props;

    const byUploadStatus = sample =>
      uploaded ? sample.metadata.synced_on : !sample.metadata.synced_on;

    return savedSamples.filter(byUploadStatus).sort(byCreateTime);
  }

  getSurveys = surveys => {
    const getSurvey = sample => <Survey key={sample.cid} sample={sample} />;
    const surveysList = surveys.map(getSurvey);

    return surveysList;
  };

  getUploadedSurveys = () => {
    const surveys = this.getSamplesList(true);

    if (!surveys.length) {
      return <InfoBackgroundMessage>No uploaded surveys</InfoBackgroundMessage>;
    }
    return this.getSurveys(surveys);
  };

  getPendingSurveys = () => {
    const surveys = this.getSamplesList(false);
    const finishedSurvey = surveys.find(sample => sample.metadata.saved);

    if (!surveys.length) {
      return (
        <InfoBackgroundMessage>
          No finished pending surveys.
          <br />
          <br />
          Press <IonIcon icon={add} /> to add.
        </InfoBackgroundMessage>
      );
    }

    if (finishedSurvey) {
      return (
        <>
          {this.getSurveys(surveys)}

          <InfoBackgroundMessage name="showSurveyUploadTip">
            Please do not forget to upload any pending surveys!
          </InfoBackgroundMessage>
        </>
      );
    }

    return (
      <>
        {this.getSurveys(surveys)}

        <InfoBackgroundMessage name="showSurveysDeleteTip">
          To delete any surveys swipe it to the left.
        </InfoBackgroundMessage>
      </>
    );
  };

  getPendingSurveysCount = () => {
    const pendingSurveys = this.getSamplesList();

    if (!pendingSurveys.length) {
      return null;
    }
    return (
      <IonBadge color="danger" slot="end">
        {pendingSurveys.length}
      </IonBadge>
    );
  };

  getUploadedSurveysCount = () => {
    const uploadedSurveys = this.getSamplesList(true);

    if (!uploadedSurveys.length) {
      return null;
    }

    return (
      <IonBadge color="light" slot="end">
        {uploadedSurveys.length}
      </IonBadge>
    );
  };

  render() {
    const { segment } = this.state;

    const showingPending = segment === 'pending';
    const showingUploaded = segment === 'uploaded';

    return (
      <Page id="home-user-surveys">
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonSegment onIonChange={this.onSegmentClick} value={segment}>
              <IonSegmentButton value="pending" checked={showingPending}>
                <IonLabel className="ion-text-wrap">
                  <T>Pending</T>
                  {this.getPendingSurveysCount()}
                </IonLabel>
              </IonSegmentButton>

              <IonSegmentButton value="uploaded" checked={showingUploaded}>
                <IonLabel className="ion-text-wrap">
                  <T>Uploaded</T>
                  {this.getUploadedSurveysCount()}
                </IonLabel>
              </IonSegmentButton>
            </IonSegment>
            <IonButtons slot="end">
              <IonButton>
                {/* <IonIcon slot="icon-only" icon={cloudUploadOutline} /> */}
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <Main class="ion-padding">
          {showingPending && this.getPendingSurveys()}
          {showingUploaded && this.getUploadedSurveys()}
        </Main>
      </Page>
    );
  }
}

export default Component;
