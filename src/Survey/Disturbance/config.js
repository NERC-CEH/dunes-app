import * as Yup from 'yup';
import userModel from 'userModel';
import disturbance from 'common/images/disturbance.svg';
import disturbanceBlack from './Home/Main/disturbanceIcon.svg';
import {
  dateAttr,
  commentAttr,
  surveyorsAttr,
  verifyLocationSchema,
} from '../common/config';

const survey = {
  name: 'disturbance',
  label: 'Record Disturbance',
  icon: disturbance,

  id: -1,
  render: [],

  attrs: {
    date: dateAttr,
    comment: commentAttr,
    surveyors: surveyorsAttr,

    location: {
      id: 'entered_sref',
      values(location) {
        return `${parseFloat(location.latitude).toFixed(7)}, ${parseFloat(
          location.longitude
        ).toFixed(7)}`;
      },
    },

    disturbance: {
      id: -1,
      type: 'radio',
      label: 'Disturbance',
      icon: disturbanceBlack,
      info: 'Please select the disturbance type for this record.',
      values: [
        { isPlaceholder: true, label: 'Bare sand/poached area' },
        { value: 'Less than 1 metre across', id: -1 },
        { value: 'More than 1 metre across', id: -1 },

        { isPlaceholder: true, label: 'Animal dung' },
        { value: 'Rabbit', id: -1 },
        { value: 'Cattle', id: -1 },
        { value: 'Pony', id: -1 },
        { value: 'Sheep', id: -1 },
        { value: 'Unknown', id: -1 },

        { isPlaceholder: true, label: 'Rabbit activity' },
        { value: 'Scrape', id: -1 },
        { value: 'Burrow', id: -1 },

        { isPlaceholder: true, label: 'Other' },
        { value: 'Vehicle tracks', id: -1 },
        { value: 'Litter/flytipping', id: -1 },
        { value: 'Other (please add a comment)', id: -1 },
      ],
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

    sample.startGPS();

    return sample;
  },
};

export default survey;
