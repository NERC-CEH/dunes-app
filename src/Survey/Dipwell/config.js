import { chatboxOutline } from 'ionicons/icons';
import userModel from 'userModel';
import * as Yup from 'yup';
import heightIcon from 'common/images/height.svg';
import dipwellIcon from 'common/images/water-table-depth.svg';
import {
  locationAttr,
  dateAttr,
  commentAttr,
  surveyorsAttr,
  verifyLocationSchema,
} from '../common/config';

const survey = {
  name: 'dipwell',
  label: 'Water Table Depth',
  icon: dipwellIcon,

  id: -1, // warehouse id
  render: [],

  attrs: {
    location: locationAttr,
    date: dateAttr,
    comment: commentAttr,
    surveyors: surveyorsAttr,
  },

  smp: {
    attrs: {
      location: locationAttr,
      date: dateAttr,

      comment: {
        label: 'Comment',
        icon: chatboxOutline,
        type: 'textarea',
        info: 'Please add any extra information about this dipwell.',
      },

      height: {
        id: -1,
        label: 'Water Depth',
        type: 'slider',
        info:
          'Please specify the water level in centimeters from the top of dipwell down to the water.',
        max: 200,
        min: 0,
        icon: heightIcon,
        skipValueTranslation: true,
      },
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
    try {
      const transectSchema = Yup.object().shape({
        location: verifyLocationSchema,
      });

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
