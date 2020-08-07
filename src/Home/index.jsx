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
import { Trans as T } from 'react-i18next';
import { homeOutline, albumsOutline, add } from 'ionicons/icons';
import savedSamples from 'savedSamples';
import habitatsIcon from 'common/images/habitats.svg';
import Home from './Home';
import Species from './Species';
import Surveys from './Surveys';
import UserSurveys from './UserSurveys';
import Habitats from './Habitats';
import 'common/images/flower.svg';
import './styles.scss';

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
            render={() => <UserSurveys savedSamples={savedSamples} />}
            exact
          />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home/info" href="/home/info">
            <IonIcon icon={homeOutline} />
            <IonLabel>
              <T>Home</T>
            </IonLabel>
          </IonTabButton>

          <IonTabButton tab="home/species" href="/home/species">
            <IonIcon src="/images/flower.svg" />
            <IonLabel>
              <T>Species</T>
            </IonLabel>
          </IonTabButton>

          <IonTabButton tab="home/surveys" href="/home/surveys" disabled>
            {/* placeholder */}
          </IonTabButton>

          <IonTabButton tab="home/habitats" href="/home/habitats">
            <IonIcon src={habitatsIcon} />
            <IonLabel>
              <T>Habitats</T>
            </IonLabel>
          </IonTabButton>

          <IonTabButton tab="/home/user-surveys" href="/home/user-surveys">
            <IonIcon icon={albumsOutline} />
            <IonLabel>
              <T>Surveys</T>
            </IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
};

Component.propTypes = {};

export default Component;
