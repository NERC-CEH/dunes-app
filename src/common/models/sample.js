import { Sample } from '@apps';
import surveys from 'common/config/surveys';
import { modelStore } from './store';
import Occurrence from './occurrence';
import Media from './media';

export default class AppSample extends Sample {
  store = modelStore;

  keys = () => {
    return { ...Sample.keys };
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
}
