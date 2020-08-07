import React from 'react';
import ReactDOM from 'react-dom';
import { setupConfig } from '@ionic/react';
import appModel from 'appModel';
import userModel from 'userModel';
import savedSamples from 'savedSamples';
import initAnalytics from 'helpers/analytics';
import { Capacitor, Plugins, StatusBarStyle } from '@capacitor/core';
import App from './App';
import 'mobx-react/batchingForReactDom';

const { App: AppPlugin, StatusBar, SplashScreen } = Plugins;

setupConfig({
  hardwareBackButton: false, // android back button
});

(async function() {
  await appModel._init;
  await userModel._init;
  await savedSamples._init;
  initAnalytics();

  appModel.attrs.appSession += 1;
  appModel.save();

  ReactDOM.render(<App />, document.getElementById('root'));

  Capacitor.isNative &&
    StatusBar.setStyle({
      style: StatusBarStyle.Dark,
    });

  Capacitor.isNative && SplashScreen.hide();

  Capacitor.isNative &&
    AppPlugin.addListener('backButton', () => {
      /* disable android app exit using back button */
    });
})();
