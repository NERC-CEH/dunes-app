import React from 'react';
import ReactDOM from 'react-dom';
import appModel from 'appModel';
import userModel from 'userModel';
import savedSamples from 'savedSamples';
import initAnalytics from 'helpers/analytics';
import App from './App';

async function init() {
  await appModel._init;
  await userModel._init;
  await savedSamples._init;
  initAnalytics();

  const hideSplashscreen = () => {
    if (navigator && navigator.splashscreen) {
      navigator.splashscreen.hide();
    }
  };
  document.addEventListener('deviceready', hideSplashscreen, false);

  appModel.attrs.appSession += 1;
  appModel.save();

  ReactDOM.render(<App />, document.getElementById('root'));
}

init();
