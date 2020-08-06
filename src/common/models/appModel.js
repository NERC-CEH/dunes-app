/** ****************************************************************************
 * App model. Persistent.
 **************************************************************************** */
import { Model } from '@apps';
import config from 'config';
import userModel from 'userModel';
import axios from 'axios';
import { Capacitor, FilesystemDirectory, Plugins } from '@capacitor/core';
import { getLocationGroups, hashCode, toDataUrl } from './appModelLocationExt';
import { genericStore } from './store';

const { Filesystem } = Plugins;

class AppModel extends Model {
  async updateSites() {
    const options = {
      url: `${config.backend.url}/api/v2/reports?location_type_ids=17804&locattrs=262&report=library/locations/locations_list_3.xml`,
      headers: {
        Authorization: `Bearer ${await userModel.getAccessToken()}`,
      },
    };

    const { data } = await axios(options);

    this.attrs.sites = data.data;

    return this.save();
  }

  async updateLocations(site) {
    if (!site) {
      return;
    }

    const siteId = site.location_id;
    const options = {
      url: `${config.backend.url}/api/v2/reports?report=projects/dunescapes/locations_list_for_app.xml&parent_id=${siteId}`,
      headers: {
        Authorization: `Bearer ${await userModel.getAccessToken()}`,
      },
    };

    const { data } = await axios(options);

    this.attrs.locations = getLocationGroups(data.data || []);

    await this.save();
  }

  async updateLocationImages() {
    const images = this.attrs.locations
      .map(location => location.locations)
      .flat()
      .map(location => [location.url, location]);

    for (let i = 0; i < images.length; i++) {
      const [url, location] = images[i];

      if (!url) {
        continue; // eslint-disable-line
      }

      const imageHashName = hashCode(url);
      const cachedUrl = `cache/${imageHashName}.jpg`;

      if (!Capacitor.isNative) {
        // eslint-disable-next-line
        const [, , width, heigth] = await toDataUrl(url);
        location.imageWidth = width; // eslint-disable-line
        location.imageHeight = heigth; // eslint-disable-line

        // eslint-disable-next-line
        await new Promise(r => setTimeout(r, 1000));

        // eslint-disable-next-line
        continue;
      }

      // eslint-disable-next-line
      const [data, , width, heigth] = await toDataUrl(url);

      // eslint-disable-next-line
      await Filesystem.writeFile({
        data,
        path: cachedUrl,
        directory: FilesystemDirectory.Data,
        recursive: true,
      });

      location.cachedUrl = cachedUrl; // eslint-disable-line
      location.imageWidth = width; // eslint-disable-line
      location.imageHeight = heigth; // eslint-disable-line
    }

    return this.save();
  }
}

const defaults = {
  showedWelcome: false,
  language: null,
  useTraining: false,
  sendAnalytics: true,
  appSession: 0,
  useGridRef: true,
  useGridMap: true,

  favouriteSite: {},

  // tips
  showSurveysDeleteTip: true,
  showSurveyUploadTip: true,

  sites: [],
  locations: [],
};

const appModel = new AppModel(genericStore, 'app', defaults);

export { appModel as default, AppModel };
