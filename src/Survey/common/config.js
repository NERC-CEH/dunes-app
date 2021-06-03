import { date } from '@apps';
import * as Yup from 'yup';
import { calendarOutline, peopleOutline, chatboxOutline } from 'ionicons/icons';

export const locationAttrs = {
  location: {
    id: 'location_id',
    values(location, submission) {
      const { latitude, longitude, gridref, locations, type } = location;

      const sref = `${parseFloat(latitude).toFixed(7)}, ${parseFloat(
        longitude
      ).toFixed(7)}`;

      // eslint-disable-next-line
      submission.values = {
        ...submission.values,
        ...{
          entered_sref_system: 4326,
          entered_sref: sref,
          [`smpAttr:${locationAttrs.location_gridref.id}`]: gridref,
        },
      };

      const isOfTransectType = ['Zonation', 'Profile'].includes(type);
      if (!isOfTransectType && locations) {
        // top survey level doesn't have real location_id but generated one - it's an aggregate of other locations
        return null;
      }

      return location.location_id;
    },
  },

  location_gridref: { id: 335 },
};

export const dateAttr = {
  label: 'Date',
  id: 'date',
  icon: calendarOutline,
  values: d => date.print(d),
  isValid: val => val && val.toString() !== 'Invalid Date',
  type: 'date',
  max: () => new Date(),
  skipValueTranslation: true,
};

export const commentAttr = {
  label: 'Comment',
  id: 'comment',
  icon: chatboxOutline,
  type: 'textarea',
  info: 'Please add any extra information about your survey.',
  skipValueTranslation: true,
};

export const surveyorsAttr = {
  label: 'Surveyors',
  icon: peopleOutline,
  id: 'recorder_names',
  info:
    'If anyone has helped with the surveying please enter their names here.',
  placeholder: 'Name',
  type: 'inputList',
  values(val) {
    return val.join(', ');
  },
  skipValueTranslation: true,
};

const fixedLocationSchema = Yup.object().shape({
  location_id: Yup.string().required(),
  latitude: Yup.number().required(),
  longitude: Yup.number().required(),
});

export const verifyLocationSchema = Yup.mixed().test(
  'location',
  'Please select your location.',
  val => {
    if (!val) {
      return false;
    }
    fixedLocationSchema.validateSync(val);
    return true;
  }
);
