// import 'helpers/system_checkup';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import appModel from 'appModel';
import userModel from 'userModel';
import LanguageSelectRequired from 'Components/LanguageSelectRequire';
import Menu from 'Components/Menu';
import SplashScreenRequired from './Info/SplashScreenRequired';
import Home from './Home';
import Info from './Info';
import User from './User';
import Settings from './Settings';
import Survey from './Survey';
import 'common/translations/translator';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import 'common/theme.scss';

const HomeOrTutorial = () => {
  return <Redirect to="/home" />;
};

const App = () => (
  <IonApp>
    <IonReactRouter>
      <LanguageSelectRequired appModel={appModel}>
        <SplashScreenRequired appModel={appModel}>
          <Menu userModel={userModel} />
          <IonRouterOutlet id="main">
            <Route path="/home" component={Home} />
            {Info}
            {User}
            {Survey}
            {Settings}
            <Route path="/" component={HomeOrTutorial} exact />
          </IonRouterOutlet>
        </SplashScreenRequired>
      </LanguageSelectRequired>
    </IonReactRouter>
  </IonApp>
);

export default App;
