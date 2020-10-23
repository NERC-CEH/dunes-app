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

  _checkIfEmptyPlantQuadrat() {
    const isPlantQuadratSurvey =
      this.parent.metadata.survey === 'plant-quadrat';
    if (isPlantQuadratSurvey) {
      const isEmptyOccurrence =
        !Number.isFinite(this.attrs.health) &&
        !Number.isFinite(this.attrs.nitrogen);

      if (isEmptyOccurrence) {
        return true;
      }
    }
    return false;
  }

  getSubmission() {
    if (this._checkIfEmptyPlantQuadrat()) {
      return null;
    }

    return super.getSubmission();
  }

  // eslint-disable-next-line class-methods-use-this
  validateRemote() {
    return null;
  }
}
