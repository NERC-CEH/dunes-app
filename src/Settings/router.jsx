import React from 'react';
import { Route } from 'react-router-dom';
import appModel from 'appModel';
import userModel from 'userModel';
import saveSamples from 'savedSamples';
import Menu from './Menu';
import Language from './Language';
import Sites from '../common/Components/Sites';

export default [
  <Route
    path="/settings/menu"
    key="/settings/menu"
    exact
    render={() => (
      <Menu
        saveSamples={saveSamples}
        userModel={userModel}
        appModel={appModel}
      />
    )}
  />,

  <Route
    path="/settings/language"
    key="/settings/language"
    exact
    render={() => <Language userModel={userModel} appModel={appModel} />}
  />,

  <Route
    path="/settings/sites"
    key="/settings/sites"
    appModel={appModel}
    userModel={userModel}
    exact
    component={() => <Sites userModel={userModel} appModel={appModel} />}
  />,
];
