import { Sample, Media } from '@apps';
import surveys from 'common/config/surveys';
import { modelStore } from './store';
import Occurrence from './occurrence';

export default class AppSample extends Sample {
  store = modelStore;

  keys = () => {
    return { ...Sample.keys };
  };

  constructor(...args) {
    super(...args);

    this.survey = surveys[this.metadata.survey];
    if (!this.survey) {
      throw new Error('No survey config was found');
    }
  }

  static fromJSON(json) {
    return super.fromJSON(json, Occurrence, AppSample, Media);
  }
}
