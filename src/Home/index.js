import React, { useRef } from 'react';
import { Route } from 'react-router-dom';
import {
  IonTabs,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonRouterOutlet,
  IonFab,
  IonFabButton,
} from '@ionic/react';
import {
  homeOutline as home,
  menuOutline as menu,
  personOutline as person,
  bookOutline as book,
  add,
} from 'ionicons/icons';
import Home from './Home';
import Species from './Species';
import Surveys from './Surveys';
import UserSurveys from './UserSurveys';
import './styles.scss';

const Component = () => {
  const tabsRef = useRef();
  const navigateToSurveys = () =>
    tabsRef.current.tabBarRef.current.selectTab('home/surveys');

  return (
    <>
      <IonFab className="home-fab" vertical="bottom" horizontal="center" slot="fixed">
        <IonFabButton onClick={navigateToSurveys}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>

      <IonTabs ref={tabsRef}>
        <IonRouterOutlet>
          <Route path="/home/info" component={Home} exact />
          <Route path="/home/species" component={Species} exact />
          <Route path="/home/surveys" component={Surveys} exact />
          <Route path="/home/user-surveys" component={UserSurveys} exact />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home/info" href="/home/info">
            <IonIcon icon={home} />
            <IonLabel>{t('Home')}</IonLabel>
          </IonTabButton>

          <IonTabButton tab="home/species" href="/home/species">
            <IonIcon icon={book} />
            <IonLabel>{t('Species')}</IonLabel>
          </IonTabButton>

          <IonTabButton tab="home/surveys" href="/home/surveys" disabled>
            {/* placeholder */}
          </IonTabButton>

          <IonTabButton tab="/home/user-surveys" href="/home/user-surveys">
            <IonIcon icon={person} />
            <IonLabel>{t('Surveys')}</IonLabel>
          </IonTabButton>

          <IonTabButton tab="info/menu" href="/info/menu">
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
