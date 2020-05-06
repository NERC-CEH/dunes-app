import React from 'react';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton } from '@ionic/react';
import { Page, Main } from '@apps';
import './styles.scss';

function index() {
  return (
    <Page id="home-info">
      <IonHeader translucent className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <Main>{/* <IonButton>Link</IonButton> */}</Main>
    </Page>
  );
}

index.propTypes = {};

export default index;
