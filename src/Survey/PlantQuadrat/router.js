import React from 'react';
import { AttrPage as Attr, RouteWithModels } from '@apps';
import savedSamples from 'savedSamples';
import appModel from 'appModel';
import userModel from 'userModel';
import StartNewSurvey from 'Survey/common/Components/StartNewSurvey';
import Transects from 'Survey/common/Components/Transects';
import Sites from 'Survey/common/Components/Sites';
import Map from 'Survey/common/Components/Map';
import Home from 'Survey/common/Components/SurveyHomePage';
import survey from './config';
import Location from './Location';
import Quadrat from './Quadrat';
import VegetationCover from './VegetationCover';
import VegetationHeight from './VegetationHeight';
import IndicatorSpecies from './IndicatorSpecies';

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
    params => <Sites appModel={appModel} {...params} />,
  ],
  [
    `${baseURL}/:smpId/edit/location/list`,
    params => (
      <Transects appModel={appModel} userModel={userModel} {...params} />
    ),
  ],
  [`${baseURL}/:smpId/edit/location/map`, Map],
  [`${baseURL}/:smpId/edit/location/:subSmpId`, Quadrat],
  [`${baseURL}/:smpId/edit/location/:subSmpId/cover`, VegetationCover],
  [`${baseURL}/:smpId/edit/location/:subSmpId/cover/:attr`, Attr],
  [`${baseURL}/:smpId/edit/location/:subSmpId/height`, VegetationHeight],
  [`${baseURL}/:smpId/edit/location/:subSmpId/height/:attr/:heightID`, Attr],
  [
    `${baseURL}/:smpId/edit/location/:subSmpId/species/:indicatorType`,
    IndicatorSpecies,
  ],
  [`${baseURL}/:smpId/edit/location/:subSmpId/:attr`, Attr],
  [`${baseURL}/:smpId/edit/:attr`, Attr],
];

export default RouteWithModels.fromArray(savedSamples, routes);
