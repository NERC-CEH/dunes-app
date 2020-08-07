import React from 'react';
import { Route } from 'react-router-dom';
import Credits from './Credits';
import About from './About';
import Manual from './Manual';

export default [
  <Route path="/info/about" key="/info/about" exact component={About} />,
  <Route path="/info/credits" key="/info/credits" exact component={Credits} />,
  <Route path="/info/manual" key="/info/manual" exact component={Manual} />,
];
