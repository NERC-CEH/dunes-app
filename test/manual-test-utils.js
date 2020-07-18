/** ********************************************************************
 * Manual testing functions.
 ******************************************************************** */
import GPS from 'mock-geolocation';
import bigu from 'bigu';

const testing = {};

testing.GPS = {
  mock: GPS.use,

  /**
   * GPS.update({ latitude: 1, longitude: -1, accuracy: 12 })
   *
   * @param options
   * @returns {*}
   */
  update(options) {
    let location = options;
    if (options.gridRef) {
      // Grid References
      const parsedRef = bigu.GridRefParser.factory(options.gridRef);

      // center
      parsedRef.osRef.x += parsedRef.length / 2;
      parsedRef.osRef.y += parsedRef.length / 2;

      // allow manual corrections for grid reference square center
      if (options.xCorrect) {
        parsedRef.osRef.x += options.xCorrect;
      }
      if (options.yCorrect) {
        parsedRef.osRef.y += options.yCorrect;
      }

      const latLng = parsedRef.osRef.to_latLng();
      location = {
        latitude: latLng.lat,
        longitude: latLng.lng,
        accuracy: options.accuracy || parsedRef.length / 2,
      };
    }

    console.log(location);
    return GPS.change(location);
  },

  trail(location, frequency = 2000) {
    let newLocation = location;
    this.interval = setInterval(() => {
      const { latitude, longitude } = newLocation;

      this.update({ latitude, longitude });

      newLocation = {
        latitude: latitude + 0.01,
        longitude: longitude + 0.01,
      };
    }, frequency);
  },

  stop() {
    if (this.interval || this.interval === 0) {
      clearInterval(this.interval);
    }
  },
};

window.testing = testing;
