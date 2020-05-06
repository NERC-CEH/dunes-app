import React, { useRef } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {
  IonTabs,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonRouterOutlet,
  IonFabButton,
} from '@ionic/react';
import { homeOutline, albumsOutline, add } from 'ionicons/icons';
import Home from './Home';
import Species from './Species';
import Surveys from './Surveys';
import UserSurveys from './UserSurveys';
import Habitats from './Habitats';
import './styles.scss';
import './flower.svg';
import './habitats.svg';

const Component = () => {
  const tabsRef = useRef();
  const navigateToSurveys = () =>
    tabsRef.current.tabBarRef.current.selectTab('home/surveys');

  return (
    <>
      <IonFabButton onClick={navigateToSurveys} className="home-fab">
        <IonIcon icon={add} />
      </IonFabButton>

      <IonTabs ref={tabsRef}>
        <IonRouterOutlet>
          <Redirect exact path="/home" to="/home/info" />
          <Route path="/home/info" render={() => <Home />} exact />
          <Route path="/home/species" render={() => <Species />} exact />
          <Route path="/home/surveys" render={() => <Surveys />} exact />
          <Route path="/home/habitats" render={() => <Habitats />} exact />
          <Route
            path="/home/user-surveys"
            render={() => <UserSurveys />}
            exact
          />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home/info" href="/home/info">
            <IonIcon icon={homeOutline} />
            <IonLabel>{t('Home')}</IonLabel>
          </IonTabButton>

          <IonTabButton tab="home/species" href="/home/species">
            <IonIcon src="/images/flower.svg" />
            <IonLabel>{t('Species')}</IonLabel>
          </IonTabButton>

          <IonTabButton tab="home/surveys" href="/home/surveys" disabled>
            {/* placeholder */}
          </IonTabButton>

          <IonTabButton tab="home/habitats" href="/home/habitats">
            <IonIcon src="/images/habitats.svg" />
            <IonLabel>{t('Habitats')}</IonLabel>
          </IonTabButton>

          <IonTabButton tab="/home/user-surveys" href="/home/user-surveys">
            <IonIcon icon={albumsOutline} />
            <IonLabel>{t('Surveys')}</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
};

Component.propTypes = {};

export default Component;
