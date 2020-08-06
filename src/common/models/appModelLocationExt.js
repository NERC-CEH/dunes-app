import { gridrefStringToLatLng, locationToGrid } from '@apps';
import Wkt from 'wicket';
import L from 'leaflet';
import i18n from 'i18next';
import config from 'config';

function setLatLong(location) {
  if (location.centroid_sref_system === '4326') {
    const [latitude, longitude] = location.centroid_sref
      .split(' ')
      .map(parseFloat);

    const gridref = locationToGrid({
      accurracy: 1,
      latitude,
      longitude,
    });

    location.latitude = latitude; // eslint-disable-line
    location.longitude = longitude; // eslint-disable-line
    location.gridref = gridref; // eslint-disable-line
    return;
  }

  if (location.centroid_sref_system === 'OSGB') {
    const { lat, lng } = gridrefStringToLatLng(location.centroid_sref);

    location.latitude = lat; // eslint-disable-line
    location.longitude = lng; // eslint-disable-line
    location.gridref = location.centroid_sref; // eslint-disable-line
  }
}

function transformToLatLong(coordinates) {
  return coordinates.map(([x, y]) => {
    const { lat, lng } = L.Projection.SphericalMercator.unproject({ x, y });
    return [lat, lng];
  });
}

function transformGeometry(geom) {
  if (!geom) {
    return null;
  }

  const wkt = new Wkt.Wkt();
  const geoJSON = wkt.read(geom).toJson();

  if (geoJSON.type === 'Polygon') {
    geoJSON.coordinates[0] = transformToLatLong(geoJSON.coordinates[0]);
  } else if (geoJSON.type === 'Point') {
    // we transform single point into polygon to support start/end point only
    geoJSON.type = 'Polygon';
    geoJSON.coordinates = transformToLatLong([geoJSON.coordinates]);
  } else {
    geoJSON.coordinates = transformToLatLong(geoJSON.coordinates);
  }

  return geoJSON;
}

export function getLocationGroups(rawLocations) {
  const locationGroups = [];

  const processMedia = media => {
    if (!media) {
      return [];
    }

    try {
      return JSON.parse(media).map(url => `${config.backend.mediaUrl}${url}`);
    } catch (e) {
      // do nothing
    }

    return [];
  };

  const processRawTransectLocation = rawLocation => {
    const location = {
      ...rawLocation,
      geom: transformGeometry(rawLocation.geom),
      locations: [],
      media: processMedia(rawLocation.media),
    };

    const pushLocationToGroup = ([lat, lng], index) => {
      const transectPoint = {
        centroid_sref: `${lat} ${lng}`,
        centroid_sref_system: '4326',
        type: 'Transect',
        url: location.media[index],
      };
      setLatLong(transectPoint);

      location.locations.push(transectPoint);
    };

    location.geom.coordinates.forEach(pushLocationToGroup);
    locationGroups.push(location);
  };

  const processRawPointLocation = rawLocation => {
    if (!rawLocation.group) {
      rawLocation.group = i18n.t('No group name'); // eslint-disable-line
    }
    rawLocation.media = processMedia(rawLocation.media); // eslint-disable-line
    rawLocation.url = rawLocation.media[rawLocation.media.length - 1]; // eslint-disable-line

    const matchTypeAndName = ({ name, type }) =>
      name === rawLocation.group && type === rawLocation.type;
    let locationGroup = locationGroups.find(matchTypeAndName);

    if (!locationGroup) {
      locationGroup = {
        location_id: rawLocation.group,
        name: rawLocation.group,
        type: rawLocation.type,
        centroid_sref: rawLocation.centroid_sref,
        centroid_sref_system: rawLocation.centroid_sref_system,
        locations: [],
      };

      setLatLong(locationGroup);

      locationGroups.push(locationGroup);
    }

    locationGroup.locations.push(rawLocation);
  };

  const processRawLocation = rawLocation => {
    setLatLong(rawLocation);

    if (rawLocation.type === 'Transect') {
      processRawTransectLocation(rawLocation);
      return;
    }

    processRawPointLocation(rawLocation);
  };

  rawLocations.forEach(processRawLocation);
  return locationGroups;
}

export const hashCode = s =>
  s.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0); // eslint-disable-line

export function toDataUrl(url) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      const reader = new FileReader();
      reader.onloadend = function() {
        const image = new window.Image(); // native one

        image.onload = () => {
          const type = url.split('.').pop();
          resolve([reader.result, type, image.width, image.height]);
        };

        image.src = url;
      };
      reader.readAsDataURL(xhr.response);
    };

    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  });
}
