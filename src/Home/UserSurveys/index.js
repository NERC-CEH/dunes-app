import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
} from '@ionic/react';
import { Page, Main } from '@apps';

function index() {
  return (
    <Page id="home-surveys">
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>User surveys</IonTitle>
        </IonToolbar>
      </IonHeader>

      <Main>{/*  */}</Main>
    </Page>
  );
}

index.propTypes = {};

export default index;
