import React from 'react';
import { IonList, IonItem } from '@ionic/react';
import { Header, Page, Main } from '@apps';

export default () => (
  <Page id="credits">
    <Header title={t('Credits')} />
    <Main class="ion-padding">
      <IonList lines="none">
        <IonItem>Lorrum ipsum</IonItem>
      </IonList>
    </Main>
  </Page>
);
