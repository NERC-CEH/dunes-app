import * as Yup from 'yup';
import userModel from 'userModel';
import cameraIcon from 'common/images/camera-outline.svg';
import {
  locationAttrs,
  dateAttr,
  commentAttr,
  surveyorsAttr,
  verifyLocationSchema,
} from '../common/config';
import Manual from './Manual';

const survey = {
  name: 'fixed-photography',
  label: 'Fixed-point Photography',
  locationType: 'Fixed point photo',
  icon: cameraIcon,
  Manual,

  id: 593,
  render: [],

  attrs: {
    ...locationAttrs,
    date: dateAttr,
    comment: commentAttr,
    surveyors: surveyorsAttr,
  },

  smp: {
    attrs: {
      ...locationAttrs,
      date: dateAttr,
    },

    verify(_, sample) {
      try {
        Yup.mixed()
          .test(
            'photos',
            'Please add at least one photo.',
            () => sample.media.length
          )
          .validateSync();
      } catch (attrError) {
        return attrError;
      }

      return null;
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
