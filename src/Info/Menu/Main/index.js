import React from 'react';
import { IonIcon, IonItem, IonList, IonItemDivider } from '@ionic/react';
import { heart } from 'ionicons/icons';
import Main from 'Lib/Main';

const Component = () => {
  return (
    <Main>
      <IonList lines="full">
        <IonItemDivider>{t('Info')}</IonItemDivider>

        <IonItem routerLink="/info/credits" detail>
          <IonIcon icon={heart} size="small" slot="start" />
          {t('Credits')}
        </IonItem>
      </IonList>
    </Main>
  );
};

export default Component;
