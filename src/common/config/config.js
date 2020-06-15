/** ****************************************************************************
 * Main app configuration file.
 **************************************************************************** */

const backendUrl =
  process.env.APP_BACKEND_URL || 'https://dev-brc-dunescapes.pantheonsite.io'; // TODO

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
    mapboxOsmId: 'cehapps.0fenl1fe',
    mapboxSatelliteId: 'cehapps.0femh3mh',
  },

  promotionalWebsiteUrl: 'https://www.dynamicdunescapes.co.uk',

  backend: {
    url: backendUrl,
    clientId: process.env.APP_BACKEND_CLIENT_ID,

    indicia: {
      websiteId: 118,
    },
  },
};

export default config;
