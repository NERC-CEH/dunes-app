import React from 'react';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton } from '@ionic/react';
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
      </Main>
    </Page>
  );
}

index.propTypes = {};

export default index;
