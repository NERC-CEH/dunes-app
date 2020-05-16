import React from 'react';
import { Route } from 'react-router-dom';
import appModel from 'appModel';
import userModel from 'userModel';
import saveSamples from 'savedSamples';
import Menu from './Menu';

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
];
