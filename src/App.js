// import 'helpers/system_checkup';
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { IonApp, IonPage, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
// import appModel from 'app_model';
import Home from './Home';
import Info from './Info';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import 'common/theme.scss';

window.t = str => str; // import 'common/translations/translator';

const App = () => (
  <IonApp>
    <IonReactRouter>
      <Route exact path="/" render={() => <Redirect to="/home/info" />} />
      <IonPage id="main">
        <Switch>
          <Route path="/home" component={Home} />
          <IonRouterOutlet>{Info}</IonRouterOutlet>
        </Switch>
      </IonPage>
    </IonReactRouter>
  </IonApp>
);

export default App;
