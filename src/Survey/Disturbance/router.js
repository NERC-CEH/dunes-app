import React from 'react';
import { AttrPage as Attr, RouteWithModels, ModelLocation } from '@apps';
import appModel from 'appModel';
import userModel from 'userModel';
import savedSamples from 'savedSamples';
import StartNewSurvey from 'Survey/common/Components/StartNewSurvey';
import Sites from 'Survey/common/Components/Sites';
import config from 'config';
import survey from './config';
import Home from './Home';

const baseURL = `/survey/${survey.name}`;

const routes = [
  [`${baseURL}/new`, StartNewSurvey.with(survey), true],
  [
    `${baseURL}/:smpId/edit/`,
    params => (
      <Home
        appModel={appModel}
        userModel={userModel}
        survey={survey}
        {...params}
      />
    ),
  ],
  [
    `${baseURL}/:smpId/edit/sites`,
    params => <Sites appModel={appModel} userModel={userModel} {...params} />,
  ],
  [
    `${baseURL}/:smpId/edit/location`,
    params => (
      <ModelLocation
        appModel={appModel}
        userModel={userModel}
        mapProviderOptions={config.map}
        {...params}
      />
    ),
  ],
  [`${baseURL}/:smpId/edit/:attr`, Attr],
];

export default RouteWithModels.fromArray(savedSamples, routes);
