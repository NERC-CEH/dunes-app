import { Sample, validateRemoteModel } from '@apps';
import surveys from 'common/config/surveys';
import config from 'config';
import i18n from 'i18next';
import { modelStore } from './store';
import Occurrence from './occurrence';
import userModel from './userModel';
import Media from './media';
import GPSExtension from './sampleGPSExt';

class AppSample extends Sample {
  store = modelStore;

  constructor(...args) {
    super(...args);

    this.remote.url = `${config.backend.url}/api/v2/samples`;
    this.remote.headers = async () => ({
      Authorization: `Bearer ${await userModel.getAccessToken()}`,
    });

    this.gpsExtensionInit();
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

  validateRemote = validateRemoteModel;

  getPrettyName() {
    const survey = this.parent ? this.parent.getSurvey() : this.getSurvey();
    const surveyName = survey.name;

    const index =
      this.parent &&
      this.parent.samples.findIndex(({ cid }) => cid === this.cid);

    if (surveyName === 'plant-quadrat') {
      return `${i18n.t('Quadrat')} #${index + 1}`;
    }

    if (surveyName === 'fixed-photography') {
      return `${i18n.t('Point')} #${index + 1}`;
    }

    if (surveyName === 'dipwell') {
      return `${i18n.t('Dipwell')} #${index + 1}`;
    }

    return '';
  }
}

AppSample.prototype = Object.assign(AppSample.prototype, GPSExtension);
AppSample.prototype.constructor = AppSample;

export default AppSample;
