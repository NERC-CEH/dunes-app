import React, { useEffect } from 'react';
import { alert, AttrPage as Attr, RouteWithModels } from '@apps';
import Sample from 'sample';
import i18n from 'i18next';
import savedSamples from 'savedSamples';
import appModel from 'appModel';
import userModel from 'userModel';
import survey from 'common/config/surveys/photography';
import Edit from './Edit';
import LocationMenu from './Location/Menu';
import LocationTransects from './Location/Transects';
import LocationSites from './Location/Sites';
import LocationPointEdit from './Location/EditPoint';

const baseURL = `/survey/${survey.name}`;
const draftIdKey = `draftId:${survey.name}`;

async function showDraftAlert() {
  const t = i18n.t.bind(i18n);

  return new Promise(resolve => {
    alert({
      header: t('Draft'),
      message: t(
        'Previous survey draft exists, would you like to continue it?'
      ),
      backdropDismiss: false,
      buttons: [
        {
          text: t('Discard'),
          handler: () => {
            resolve(false);
          },
        },
        {
          text: t('Continue'),
          cssClass: 'primary',
          handler: () => {
            resolve(true);
          },
        },
      ],
    });
  });
}

async function getDraft() {
  const draftID = appModel.attrs[draftIdKey];
  if (draftID) {
    const draftSample = savedSamples.find(({ cid }) => cid === draftID);
    if (draftSample) {
      const continueDraftRecord = await showDraftAlert();
      if (continueDraftRecord) {
        return draftSample;
      }

      draftSample.destroy();
    }
  }

  return null;
}

async function getNewSample() {
  const sample = await survey.create(Sample);
  sample.save();
  savedSamples.push(sample);
  appModel.attrs[draftIdKey] = sample.cid;
  await appModel.save();
  return sample;
}

function startNewSurvey({ match, history, location }) {
  if (location.pathname !== `${baseURL}/new`) {
    return null;
  }

  useEffect(() => {
    (async () => {
      let sample = await getDraft();
      if (!sample) {
        sample = await getNewSample();
      }

      const url = match.url.replace('/new', '');
      history.replace(`${url}/${sample.cid}/edit`);
    })();
  }, []);

  return null;
}

const routes = [
  [`${baseURL}/new`, startNewSurvey, true],
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
