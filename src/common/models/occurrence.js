import { Occurrence } from '@apps';
import Media from './media';

export default class AppOccurrence extends Occurrence {
  keys = () => {
    return { ...Occurrence.keys };
  };

  static fromJSON(json) {
    return super.fromJSON(json, Media);
  }

  isDisabled() {
    if (!this.parent) {
      throw new Error('No occurrence parent to return disabled status.');
    }

    return this.parent.isDisabled();
  }
}
