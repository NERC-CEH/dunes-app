import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonItem,
  IonItemGroup,
  IonLabel,
} from '@ionic/react';
import { Page, Main } from '@apps';
import { Trans as T } from 'react-i18next';
import { openOutline } from 'ionicons/icons';
import config from 'config';
import './styles.scss';
import './appLogo.png';
import './homePageBackground.jpg';

function index() {
  return (
    <Page id="home-info">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <Main>
        <img className="app-logo" src="/images/appLogo.png" alt="" />
        <div className="background-image" />

        <IonItemGroup>
          <IonItem
            className="language-button"
            detail
            href={config.backend.url}
            detailIcon={openOutline}
          >
            <IonLabel>
              <T>Project Website</T>
            </IonLabel>
          </IonItem>
        </IonItemGroup>
      </Main>
    </Page>
  );
}

index.propTypes = {};

export default index;
