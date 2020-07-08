import { Sample } from '@apps';
import surveys from 'common/config/surveys';
import config from 'config';
import { modelStore } from './store';
import Occurrence from './occurrence';
import userModel from './userModel';
import Media from './media';

export default class AppSample extends Sample {
  store = modelStore;

  constructor(...args) {
    super(...args);

    this.remote.url = `${config.backend.url}/api/v2/samples`;
    this.remote.headers = async () => ({
      Authorization: `Bearer ${await userModel.getAccessToken()}`,
    });
  }

  keys = () => {
    return { ...Sample.keys, ...this.getSurvey().attrs };
  };

  static fromJSON(json) {
    return super.fromJSON(json, Occurrence, AppSample, Media);
  }

  getSurvey() {
    const survey = surveys[this.metadata.survey];
    if (!survey) {
      throw new Error('No survey config was found');
    }

    if (this.parent) {
      return survey.smp;
    }

    return survey;
  }

  isDisabled() {
    if (this.parent) {
      return this.parent.isDisabled();
    }

    return !!this.metadata.synced_on;
  }

  async saveRemote() {
    await super.saveRemote();
    return this.save();
  }

  validateRemote() {
    const survey = this.getSurvey();
    const invalidAttributes = survey.verify && survey.verify(this.attrs);
    const attributes = { ...invalidAttributes };

    const validateSubModel = (agg, model) => {
      const invalids = model.validateRemote();
      if (invalids) {
        agg[model.cid] = invalids; // eslint-disable-line
      }
      return agg;
    };

    const samples = this.samples.reduce(validateSubModel, {});
    const occurrences = this.occurrences.reduce(validateSubModel, {});
    const media = this.media.reduce(validateSubModel, {});

    if (
      Object.keys(attributes).length ||
      Object.keys(samples).length ||
      Object.keys(occurrences).length ||
      Object.keys(media).length
    ) {
      return { attributes, samples, occurrences, media };
    }

    return null;
  }
}
