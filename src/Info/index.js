import React from 'react';
import { Route } from 'react-router-dom';
import Credits from './Credits';
import Menu from './Menu';

export default [
  <Route path="/info/menu" key="/info/menu" exact render={() => <Menu />} />,
  <Route path="/info/credits" key="/info/credits" exact component={Credits} />,
];
