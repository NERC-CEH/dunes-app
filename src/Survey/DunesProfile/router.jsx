import React from 'react';
import { AttrPage as Attr, RouteWithModels, ModelLocation } from '@apps';
import appModel from 'appModel';
import userModel from 'userModel';
import savedSamples from 'savedSamples';
import config from 'config';
import StartNewSurvey from 'Survey/common/Components/StartNewSurvey';
import Home from 'Survey/common/Components/SurveyHomePage';
import Sites from 'Survey/common/Components/Sites';
import Transects from 'Survey/common/Components/Transects';
import Map from 'Survey/common/Components/Map';
import Location from './Location';
import Point from './Point';
import survey from './config';

const baseURL = `/survey/${survey.name}`;

const routes = [
  [`${baseURL}/new`, StartNewSurvey.with(survey), true],
  [
    `${baseURL}/:smpId/edit`,
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
    `${baseURL}/:smpId/edit/location`,
    params => <Location appModel={appModel} {...params} />,
  ],
  [
    `${baseURL}/:smpId/edit/location/sites`,
    params => <Sites appModel={appModel} userModel={userModel} {...params} />,
  ],
  [
    `${baseURL}/:smpId/edit/location/list`,
    params => (
      <Transects appModel={appModel} userModel={userModel} {...params} />
    ),
  ],
  [`${baseURL}/:smpId/edit/location/map`, Map],
  [`${baseURL}/:smpId/edit/location/:subSmpId`, Point],
  [
    `${baseURL}/:smpId/edit/location/:subSmpId/location`,
    params => (
      <ModelLocation
        appModel={appModel}
        userModel={userModel}
        mapProviderOptions={config.map}
        {...params}
      />
    ),
  ],
  [`${baseURL}/:smpId/edit/location/:subSmpId/:attr`, Attr],
  [`${baseURL}/:smpId/edit/:attr`, Attr],
];

export default RouteWithModels.fromArray(savedSamples, routes);
