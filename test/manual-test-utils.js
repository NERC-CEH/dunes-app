/** ********************************************************************
 * Manual testing functions.
 ******************************************************************** */
import GPS from 'mock-geolocation';

const testing = {};

testing.GPS = {
  mock: GPS.use,

  /**
   * GPS.update({ latitude: 1, longitude: -1, accuracy: 12 })
   *
   * @param options
   * @returns {*}
   */
  update(location) {
    if (location instanceof Array) {
      this.interval = setInterval(() => {
        if (!location.length) {
          this.stop();
          return;
        }

        const [latitude, longitude] = location.shift();
        this.update({ latitude, longitude });
      }, 2000);
      return;
    }

    GPS.change(location);
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
