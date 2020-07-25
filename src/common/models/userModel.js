/** ****************************************************************************
 * User model describing the user model on backend. Persistent.
 **************************************************************************** */
import Log from 'helpers/log';
import CONFIG from 'config';
import { DrupalUserModel } from '@apps';
import { Capacitor, FilesystemDirectory, Plugins } from '@capacitor/core';
import * as Yup from 'yup';
import { genericStore } from './store';
import dummyTransects from './dummyTransects.json';

const { Filesystem } = Plugins;

const hashCode = s =>
  s.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0); // eslint-disable-line

function toDataUrl(url) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      const reader = new FileReader();
      reader.onloadend = function() {
        resolve(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  });
}

class UserModel extends DrupalUserModel {
  async updateTransects() {
    // TODO:
    return new Promise(resolve => {
      setTimeout(() => {
        this.attrs.transects = dummyTransects;
        this.save();
        resolve();
      }, 2000);
    });
  }

  async updateTransectsImages() {
    // TODO:
    const images = this.attrs.transects
      .map(transect => transect.sections)
      .flat()
      .map(location => [location.url, location]);

    const promises = images.map(async ([url, location]) => {
      const imageHashName = hashCode(url);
      const cachedUrl = `cache/${imageHashName}.jpg`;

      if (!Capacitor.isNative) {
        await new Promise(r => setTimeout(r, 1000));
      } else {
        const data = await toDataUrl(url);
        await Filesystem.writeFile({
          data, // eslint-disable-line
          path: cachedUrl,
          toDirectory: FilesystemDirectory.Data,
          recursive: true,
        });
      }

      location.cachedUrl = cachedUrl; // eslint-disable-line
    });

    await Promise.all(promises);

    return this.save();
  }

  registerSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string().required(),
    fullName: Yup.string().required(),
  });
}

const defaults = {
  fullName: '',
  transects: [],
};

Log('UserModel: initializing');
const userModel = new UserModel(genericStore, 'user', defaults, CONFIG.backend);
export { userModel as default, UserModel };
