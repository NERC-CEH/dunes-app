import React, { useEffect } from 'react';
import { alert } from '@apps';
import appModel from 'appModel';
import Sample from 'sample';
import savedSamples from 'savedSamples';
import { Trans as T } from 'react-i18next';

async function showDraftAlert() {
  return new Promise(resolve => {
    alert({
      header: 'Draft',
      message: (
        <T>Previous survey draft exists, would you like to continue it?</T>
      ),
      backdropDismiss: false,
      buttons: [
        {
          text: 'Discard',
          handler: () => {
            resolve(false);
          },
        },
        {
          text: 'Continue',
          cssClass: 'primary',
          handler: () => {
            resolve(true);
          },
        },
      ],
    });
  });
}

async function getDraft(draftIdKey) {
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

async function getNewSample(survey, draftIdKey) {
  const sample = await survey.create(Sample);
  await sample.save();

  savedSamples.push(sample);

  appModel.attrs[draftIdKey] = sample.cid;
  await appModel.save();

  return sample;
}

export default function StartNewSurvey({ match, history, location, survey }) {
  const baseURL = `/survey/${survey.name}`;
  const draftIdKey = `draftId:${survey.name}`;

  if (location.pathname !== `${baseURL}/new`) {
    return null;
  }

  useEffect(() => {
    (async () => {
      let sample = await getDraft(draftIdKey);
      if (!sample) {
        sample = await getNewSample(survey, draftIdKey);
      }

      const url = match.url.replace('/new', '');
      history.replace(`${url}/${sample.cid}/edit`);
    })();
  }, []);

  return null;
}

StartNewSurvey.with = survey => {
  return params => <StartNewSurvey survey={survey} {...params} />;
};
