import React from 'react';
import { AttrPage as Attr, RouteWithModels } from '@apps';
import savedSamples from 'savedSamples';
import appModel from 'appModel';
import userModel from 'userModel';
import survey from 'common/config/surveys/plantQuadrat';
import StartNewSurvey from 'Survey/common/Components/StartNewSurvey';
import Transects from 'Survey/common/Components/Transects';
import Sites from 'Survey/common/Components/Sites';
import Edit from './Home';
import Location from './Location';
import Quadrat from './Quadrat';
import Vegetation from './Vegetation';

const baseURL = `/survey/${survey.name}`;

const routes = [
  [`${baseURL}/new`, StartNewSurvey.with(survey), true],
  [`${baseURL}/:smpId/edit`, Edit],
  [
    `${baseURL}/:smpId/edit/location`,
    params => <Location appModel={appModel} {...params} />,
  ],
  [
    `${baseURL}/:smpId/edit/location/sites`,
    params => <Sites appModel={appModel} {...params} />,
  ],
  [
    `${baseURL}/:smpId/edit/location/list`,
    params => (
      <Transects appModel={appModel} userModel={userModel} {...params} />
    ),
  ],
  [`${baseURL}/:smpId/edit/location/:subSmpId`, Quadrat],
  [`${baseURL}/:smpId/edit/location/:subSmpId/cover`, Vegetation],
  [`${baseURL}/:smpId/edit/location/:subSmpId/cover/:attr`, Attr],
  [`${baseURL}/:smpId/edit/location/:subSmpId/:attr`, Attr],
  [`${baseURL}/:smpId/edit/:attr`, Attr],
];

export default RouteWithModels.fromArray(savedSamples, routes);
