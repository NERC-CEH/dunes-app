import React from 'react';
import { Route } from 'react-router-dom';
import {
  IonTabs,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonRouterOutlet,
} from '@ionic/react';
import { home, menu } from 'ionicons/icons';

const Info = () => <div>Info Page</div>
const Menu = () => <div>Menu Page</div>

const Component = () => {
  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
          <Route
            path="/home/info"
            render={props => <Info {...props} />}
            exact
          />
        </IonRouterOutlet>
        <IonRouterOutlet>
          <Route
            path="/home/menu"
            render={props => <Menu {...props} />}
            exact
          />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home/info" href="/home/info">
            <IonIcon icon={home} />
            <IonLabel>{t('Home')}</IonLabel>
          </IonTabButton>

          <IonTabButton>{/* placeholder */}</IonTabButton>
          <IonTabButton>{/* placeholder */}</IonTabButton>
          <IonTabButton>{/* placeholder */}</IonTabButton>
          
          <IonTabButton tab="home/menu" href="/home/menu">
            <IonIcon icon={menu} />
            <IonLabel>{t('Menu')}</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
};

Component.propTypes = {};

export default Component;
