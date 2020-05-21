import { Occurrence } from '@apps';
import Media from './media';

export default class AppOccurrence extends Occurrence {
  keys = () => {
    return { ...Occurrence.keys };
  };

  static fromJSON(json) {
    return super.fromJSON(json, Media);
  }
}
