import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonCol,
  IonRow,
  IonIcon,
  IonGrid,
  IonRouterLink,
  IonTitle,
} from '@ionic/react';
import PropTypes from 'prop-types';
import { Trans as T } from 'react-i18next';
import surveys from 'common/config/surveys';
import { Page, Main } from '@apps';
import './styles.scss';

function getSurveys() {
  // eslint-disable-next-line
  const getSurveyButton = ({ name, label, icon }) => (
    <IonCol size="6" key={name}>
      <IonRouterLink routerLink={`/survey/${name}/new`}>
        <IonIcon icon={icon} />
        <span className="survey-button-label">
          <T>{label}</T>
        </span>
      </IonRouterLink>
    </IonCol>
  );
  const surveyButtons = Object.values(surveys).map(getSurveyButton);

  return (
    <IonGrid className="survey-buttons">
      <IonRow>{surveyButtons}</IonRow>
    </IonGrid>
  );
}

function index({ history }) {
  return (
    <Page id="home-surveys">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle color="dark">
            <T>Activities</T>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <Main>{getSurveys(history)}</Main>
    </Page>
  );
}

index.propTypes = {
  history: PropTypes.object,
};

export default index;
