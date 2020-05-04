import React from 'react';
import { IonList, IonItem } from '@ionic/react';
import Page from 'Lib/Page';
import Main from 'Lib/Main';
import Header from 'Lib/Header';

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
