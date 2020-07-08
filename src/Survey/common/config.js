import { date } from '@apps';
import * as Yup from 'yup';
import { calendarOutline, peopleOutline, chatboxOutline } from 'ionicons/icons';

export const locationAttr = {
  id: 'entered_sref',
  values(location) {
    // TODO: use parsing at locations report level
    const parseCentroidSref = sref =>
      sref
        .replace(/[NE]/g, '')
        .split(' ')
        .map(parseFloat);
    const [latitude, longitude] = parseCentroidSref(location.centroid_sref);
    // eslint-disable-next-line
    location = { ...location, latitude, longitude };

    return `${parseFloat(location.latitude).toFixed(7)}, ${parseFloat(
      location.longitude
    ).toFixed(7)}`;
  },
};

export const dateAttr = {
  label: 'Date',
  icon: calendarOutline,
  values: d => date.print(d),
  isValid: val => val && val.toString() !== 'Invalid Date',
  type: 'date',
  max: () => new Date(),
};

export const commentAttr = {
  label: 'Comment',
  icon: chatboxOutline,
  type: 'textarea',
  info: 'Please add any extra information about your survey.',
};

export const surveyorsAttr = {
  label: 'Surveyors',
  icon: peopleOutline,
  id: -1,
  info:
    'If anyone has helped with the surveying please enter their names here.',
  placeholder: 'Name',
  type: 'inputList',
  values(val) {
    return val.join(', ');
  },
};

const transectLocationSchema = Yup.object().shape({
  id: Yup.string().required(),
  centroid_sref: Yup.string().required(),
  sref_system: Yup.string().required(),
});

export const verifyLocationSchema = Yup.mixed().test(
  'area',
  'Please select your location.',
  val => {
    if (!val) {
      return false;
    }
    transectLocationSchema.validateSync(val);
    return true;
  }
);
