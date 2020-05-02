import React from 'react';
import ReactDOM from 'react-dom';
// import appModel from 'app_model';
// import userModel from 'user_model';
// import savedSamples from 'saved_samples';
// import Analytics from 'helpers/analytics';
// import App from './App';

async function init() {
  // await appModel._init;
  // await userModel._init;
  // await savedSamples._init;
  // Analytics.init();

  const hideSplashscreen = () => {
    if (navigator && navigator.splashscreen) {
      navigator.splashscreen.hide();
    }
  };
  document.addEventListener('deviceready', hideSplashscreen, false);

  // appModel.attrs.appSession += 1;
  // appModel.save();

  ReactDOM.render(<h1>Hello from JS!</h1>, document.getElementById('root'));
}

init();
