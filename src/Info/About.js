import React from 'react';
import { IonList, IonItem } from '@ionic/react';
import { Header, Page, Main } from '@apps';

export default () => (
  <Page id="about">
    <Header title={t('About')} />
    <Main class="ion-padding">
      <IonList lines="none">
        <IonItem>
          Dynamic Dunescapes is a fantastic new project to restore sand dunes
          across England and Wales for the benefit of people, communities and
          wildlife. Sand dunes in the UK look very different today. Gone are the
          sandy features, which made homes for special creatures, so let’s bring
          them back, to stay!
        </IonItem>
      </IonList>
    </Main>
  </Page>
);
