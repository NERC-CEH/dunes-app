import React from 'react';
import { AttrPage as Attr, RouteWithModels } from '@apps';
import appModel from 'appModel';
import userModel from 'userModel';
import savedSamples from 'savedSamples';
import StartNewSurvey from 'Survey/common/Components/StartNewSurvey';
import Home from 'Survey/common/Components/SurveyHomePage';
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

  [`${baseURL}/:smpId/edit/:attr`, Attr],
];

export default RouteWithModels.fromArray(savedSamples, routes);
