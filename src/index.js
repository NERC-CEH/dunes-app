import React from 'react';
import ReactDOM from 'react-dom';
import appModel from 'appModel';
import userModel from 'userModel';
import savedSamples from 'savedSamples';
import initAnalytics from 'helpers/analytics';
import { Capacitor, Plugins, StatusBarStyle } from '@capacitor/core';
import App from './App';
import 'mobx-react/batchingForReactDom';

const { StatusBar, SplashScreen } = Plugins;

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
})();
