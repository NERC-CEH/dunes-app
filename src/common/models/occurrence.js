import { Occurrence } from '@apps';
import Media from './media';

export default class AppOccurrence extends Occurrence {
  keys = () => {
    return { ...Occurrence.keys, ...this.getSurvey().attrs };
  };

  static fromJSON(json) {
    return super.fromJSON(json, Media);
  }

  getSurvey() {
    const survey = this.parent.getSurvey();
    return survey.occ;
  }

  isDisabled() {
    if (!this.parent) {
      throw new Error('No occurrence parent to return disabled status.');
    }

    return this.parent.isDisabled();
  }

  // eslint-disable-next-line class-methods-use-this
  validateRemote() {
    return null;
  }
}
