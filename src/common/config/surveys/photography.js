import { date } from '@apps';
import * as Yup from 'yup';
import { calendarOutline, chatboxOutline, peopleOutline } from 'ionicons/icons';
import cameraIcon from 'common/images/camera-outline.svg';
import userModel from 'userModel';

const locationAttr = {
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

const dateAttr = {
  label: 'Date',
  icon: calendarOutline,
  values: d => date.print(d),
  isValid: val => val && val.toString() !== 'Invalid Date',
  type: 'date',
  max: () => new Date(),
};

const survey = {
  name: 'fixed-photography',
  label: 'Fixed-point Photography',
  icon: cameraIcon,

  id: 123, // warehouse id
  render: [],

  attrs: {
    location: locationAttr,

    date: dateAttr,

    comment: {
      label: 'Comment',
      icon: chatboxOutline,
      type: 'textarea',
      info: 'Please add any extra information about your survey.',
    },

    surveyors: {
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
    },
  },

  smp: {
    attrs: {
      location: locationAttr,

      date: dateAttr,
    },

    create(Sample, location) {
      const sample = new Sample({
        metadata: {
          survey: survey.name,
          survey_id: survey.id,
        },
        attrs: {
          location,
        },
      });

      return sample;
    },
  },

  verify(attrs) {
    const transectLocationSchema = Yup.object().shape({
      id: Yup.string().required(),
      centroid_sref: Yup.string().required(),
      sref_system: Yup.string().required(),
    });

    const transectSchema = Yup.object().shape({
      location: Yup.mixed().test(
        'area',
        'Please select your location.',
        val => {
          if (!val) {
            return false;
          }
          transectLocationSchema.validateSync(val);
          return true;
        }
      ),
    });

    try {
      transectSchema.validateSync(attrs, { abortEarly: false });
    } catch (attrError) {
      return attrError;
    }

    return null;
  },

  create(Sample) {
    const surveyors = [];

    const { fullName } = userModel.attrs;
    if (fullName) {
      surveyors.push(fullName);
    }

    const sample = new Sample({
      metadata: {
        survey: survey.name,
        survey_id: survey.id,
      },
      attrs: {
        surveyors,
      },
    });

    return sample;
  },
};

export default survey;
