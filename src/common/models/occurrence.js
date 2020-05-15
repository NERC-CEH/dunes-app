import { Occurrence, Media } from '@apps';

export default class AppOccurrence extends Occurrence {
  keys = () => {
    return { ...Occurrence.keys };
  };

  static fromJSON(json) {
    return super.fromJSON(json, Media);
  }
}
