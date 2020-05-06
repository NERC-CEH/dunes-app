import React from 'react';
import { IonList, IonItem } from '@ionic/react';
import { Header, Page, Main } from '@apps';

export default () => (
  <Page id="credits">
    <Header title="Credits" i18n />
    <Main class="ion-padding">
      <IonList lines="none">
        <IonItem>Lorrum ipsum</IonItem>
      </IonList>
    </Main>
  </Page>
);
