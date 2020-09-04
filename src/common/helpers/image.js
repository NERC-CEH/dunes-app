/** ****************************************************************************
 * Functions to work with media.
 **************************************************************************** */
import Indicia from '@indicia-js/core';
import {
  Capacitor,
  Plugins,
  CameraResultType,
  FilesystemDirectory,
} from '@capacitor/core';
import Log from './log';

const { Camera, Filesystem } = Plugins;

async function getImageMeta(url) {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = url;
  });
}

const Image = {
  /**
   * Gets a fileEntry of the selected image from the camera or gallery.
   * If none selected then fileEntry is empty.
   * @param options
   * @returns {Promise}
   */
  async getImage(options = {}) {
    Log('Helpers:Image: getting.');

    const defaultCameraOptions = {
      quality: 40,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      saveToGallery: true,
      correctOrientation: true,
      promptLabelHeader: t('Choose a method to upload a photo'),
      promptLabelPhoto: t('Gallery'),
      promptLabelPicture: t('Camera'),
      promptLabelCancel: t('Cancel'),
    };

    const cameraOptions = { ...{}, ...defaultCameraOptions, ...options };

    const file = await Camera.getPhoto(cameraOptions);
    const name = `${Date.now()}.jpeg`;

    // This example copies a file within the documents directory
    await Filesystem.copy({
      from: file.path,
      to: name,
      toDirectory: FilesystemDirectory.Data,
    });

    const { uri } = await Filesystem.stat({
      path: name,
      directory: FilesystemDirectory.Data,
    });

    return uri;
  },

  /**
   * Create new record with a photo
   */
  async getImageModel(ImageModel, imageURL) {
    if (!imageURL) {
      throw new Error('File not found while creating image model.');
    }

    let width;
    let height;
    let data;

    if (Capacitor.isNative) {
      imageURL = Capacitor.convertFileSrc(imageURL); // eslint-disable-line
      const imageMetaData = await getImageMeta(imageURL);

      width = imageMetaData.width;
      height = imageMetaData.height;
      data = imageURL.split('/').pop();
    } else {
      [data, , width, height] = await Indicia.Media.getDataURI(imageURL);
    }

    const imageModel = new ImageModel({
      attrs: {
        data,
        type: 'jpeg',
        width,
        height,
      },
    });

    await imageModel.addThumbnail();

    return imageModel;
  },
};

export { Image as default };
