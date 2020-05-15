import { Sample, Media } from '@apps';
import { modelStore } from './store';
import Occurrence from './occurrence';

export default class AppSample extends Sample {
  store = modelStore;

  keys = () => {
    return { ...Sample.keys };
  };

  static fromJSON(json) {
    return super.fromJSON(json, Occurrence, AppSample, Media);
  }
}
