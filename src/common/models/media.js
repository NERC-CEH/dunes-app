import { Media } from '@apps';
import Log from 'helpers/log';

function fixPreviousVersions(URL) {
  if (URL.search('file://') >= 0) {
    return URL.split('/').pop();
  }
  return URL;
}

function deleteFile(fileName) {
  return new Promise((resolve, reject) => {
    function onFileGet(fileEntry) {
      if (!fileEntry) {
        resolve();
        return;
      }

      fileEntry.remove(() => {
        Log('Helpers:Image: removed.');
        resolve();
      }, reject);
    }

    window.resolveLocalFileSystemURL(
      cordova.file.dataDirectory,
      fileSystem => {
        fileSystem.getFile(fileName, { create: false }, onFileGet, reject);
      },
      reject
    );
  });
}

export default class AppMedia extends Media {
  async destroy(silent) {
    Log('MediaModel: destroying.');

    // remove from internal storage
    if (!window.cordova || window.testing) {
      if (!this.parent) {
        return null;
      }

      this.parent.media.remove(this);

      if (silent) {
        return null;
      }

      return this.parent.save();
    }

    let URL = this.attrs.data;
    URL = fixPreviousVersions(URL);

    try {
      await deleteFile(URL);
      if (!this.parent) {
        return null;
      }
      this.parent.media.remove(this);

      if (silent) {
        return null;
      }

      return this.parent.save();
    } catch (err) {
      Log(err, 'e');
      return null;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  validateRemote() {
    return null;
  }
}
