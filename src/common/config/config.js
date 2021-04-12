/** ****************************************************************************
 * Main app configuration file.
 **************************************************************************** */
import { Capacitor, Plugins, FilesystemDirectory } from '@capacitor/core';

const backendUrl =
  process.env.APP_BACKEND_URL || 'https://dunescapes.brc.ac.uk';

const indiciaUrl =
  process.env.APP_BACKEND_INDICIA_URL || 'https://warehouse1.indicia.org.uk';

const config = {
  // variables replaced on build
  version: process.env.APP_VERSION,
  build: process.env.APP_BUILD,
  name: process.env.APP_NAME,

  environment: __ENV__,

  gpsAccuracyLimit: 100,

  // use prod logging if testing otherwise full log
  log: !__TEST__,

  // error analytics
  sentry: !__TEST__ && process.env.APP_SENTRY_KEY,

  // mapping
  map: {
    mapboxApiKey: process.env.APP_MAPBOX_MAP_KEY,
    mapboxSatelliteId: 'cehapps/cipqvo0c0000jcknge1z28ejp',
  },

  promotionalWebsiteUrl: 'https://www.dynamicdunescapes.co.uk',

  backend: {
    url: backendUrl,
    clientId: process.env.APP_BACKEND_CLIENT_ID,

    mediaUrl: `${indiciaUrl}/upload/`,

    indicia: {
      url: indiciaUrl,
    },
  },
};

(async function getMediaDirectory() {
  if (Capacitor.isNative) {
    const { uri } = await Plugins.Filesystem.getUri({
      path: '',
      directory: FilesystemDirectory.Data,
    });

    config.dataPath = uri;
  }
})();

export default config;
