import * as Yup from 'yup';
import userModel from 'userModel';
import appModel from 'appModel';
import cameraIcon from 'common/images/camera-outline.svg';
import {
  locationAttrs,
  dateAttr,
  commentAttr,
  surveyorsAttr,
  verifyFixedLocationSurvey,
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
      if (!sample.metadata.completed) return null; // ignore the non-completed samples, won't be uploaded

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

    modifySubmission(submission, sample) {
      if (!sample.metadata.completed) return null;

      return submission;
    },
  },

  verify(_, sample) {
    try {
      verifyFixedLocationSurvey.validateSync(sample, { abortEarly: true });
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
        site: appModel.attrs.favouriteSite,
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
