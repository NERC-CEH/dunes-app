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

  id: 591,
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
        ...commentAttr,
        info: 'Please add any extra information about this dipwell.',
      },

      height: {
        id: 1486,
        label: 'Water Depth',
        type: 'slider',
        info:
          'Please specify the water level in centimeters from the top of dipwell down to the water. If the water is above the dipwell (i.e. flooded) please use negative values.',
        displayValueParse: value => `${value} cm`,
        max: 1000,
        min: -100,
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
          sample_method_id: 2425,
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
        sample_method_id: 2424,
        surveyors,
      },
    });

    return sample;
  },
};

export default survey;
