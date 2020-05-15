/** ****************************************************************************
 * Indicia Sample.
 **************************************************************************** */
import Indicia from '@indicia-js/core';
import { observable, intercept, toJS } from 'mobx';
import CONFIG from 'config';
import userModel from 'userModel';
import Occurrence from './occurrence';
import Media from './image';
import { modelStore } from './store';

class Sample extends Indicia.Sample {
  static fromJSON(json) {
    return super.fromJSON(json, Occurrence, Sample, Media);
  }

  store = modelStore;

  constructor(...args) {
    super(...args);

    this.attrs = observable(this.attrs);
    this.error = observable({ message: null });
    this.remote = observable({
      api_key: CONFIG.backend.indicia.apiKey,
      host_url: CONFIG.backend.indicia.host,
      user: () => userModel.attrs.email,
      password: () => userModel.attrs.password,
      synchronising: false,
    });
    this.metadata = observable(this.metadata);
    this.samples = observable(this.samples);
    this.occurrences = observable(this.occurrences);
    this.media = observable(this.media);

    const onAddedSetParent = change => {
      if (change.added && change.added.length) {
        const model = change.added[0];
        model.parent = this;
      }

      return change;
    };
    intercept(this.samples, onAddedSetParent);
    intercept(this.occurrences, onAddedSetParent);
    intercept(this.media, onAddedSetParent);
  }

  toJSON() {
    return toJS(super.toJSON(), { recurseEverything: true });
  }

  async save() {
    if (this.parent) {
      return this.parent.save();
    }

    if (!this.store) {
      return Promise.reject(
        new Error('Trying to sync locally without a store')
      );
    }

    await this.store.save(this.cid, this.toJSON());
    return this;
  }

  async destroy(silent) {
    const destroySubModels = () =>
      Promise.all([
        Promise.all(this.media.map(media => media.destroy(true))),
        Promise.all(this.occurrences.map(occ => occ.destroy(true))),
      ]);

    if (this.parent) {
      this.parent.samples.remove(this);

      await destroySubModels();

      if (silent) {
        return null;
      }

      return this.parent.save();
    }

    if (!this.store) {
      return Promise.reject(
        new Error('Trying to sync locally without a store')
      );
    }

    await this.store.destroy(this.cid);

    if (this.collection) {
      this.collection.remove(this);
    }

    await destroySubModels();

    return this;
  }
}

export { Sample as default };
