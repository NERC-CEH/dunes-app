import React from 'react';
import { AttrPage as Attr, RouteWithModels } from '@apps';
import savedSamples from 'savedSamples';
import appModel from 'appModel';
import userModel from 'userModel';
import survey from 'common/config/surveys/photography';
import StartNewSurvey from 'Survey/common/Components/StartNewSurvey';
import LocationTransects from 'Survey/common/Components/Transects';
import LocationSites from 'Survey/common/Components/Sites';
import Edit from './Home';
import LocationMenu from './Location';
import LocationPointEdit from './Point';

const baseURL = `/survey/${survey.name}`;

const routes = [
  [`${baseURL}/new`, StartNewSurvey.with(survey), true],
  [`${baseURL}/:smpId/edit`, Edit],
  [
    `${baseURL}/:smpId/edit/transects`,
    params => <LocationMenu appModel={appModel} {...params} />,
  ],
  [
    `${baseURL}/:smpId/edit/transects/sites`,
    params => <LocationSites appModel={appModel} {...params} />,
  ],
  [
    `${baseURL}/:smpId/edit/transects/list`,
    params => (
      <LocationTransects
        appModel={appModel}
        userModel={userModel}
        {...params}
      />
    ),
  ],
  [`${baseURL}/:smpId/edit/transects/:subSmpId`, LocationPointEdit],
  [`${baseURL}/:smpId/edit/transects/:subSmpId/:attr`, Attr],
  [`${baseURL}/:smpId/edit/:attr`, Attr],
];

export default RouteWithModels.fromArray(savedSamples, routes);
