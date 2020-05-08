import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonItem,
} from '@ionic/react';
import { Page, Main } from '@apps';
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

        <IonItem class="empty-page-message" lines="none">
          <p>Buttons list will be here.</p>
        </IonItem>
      </Main>
    </Page>
  );
}

index.propTypes = {};

export default index;
