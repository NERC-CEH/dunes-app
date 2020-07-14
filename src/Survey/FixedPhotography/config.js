import * as Yup from 'yup';
import userModel from 'userModel';
import cameraIcon from 'common/images/camera-outline.svg';
import {
  locationAttr,
  dateAttr,
  commentAttr,
  surveyorsAttr,
  verifyLocationSchema,
} from '../common/config';

const survey = {
  name: 'fixed-photography',
  label: 'Fixed-point Photography',
  icon: cameraIcon,

  id: 576, // -1
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
