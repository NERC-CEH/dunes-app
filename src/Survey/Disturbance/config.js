import * as Yup from 'yup';
import userModel from 'userModel';
import appModel from 'appModel';
import disturbance from 'common/images/disturbance.svg';
import disturbanceBlack from './Home/Main/disturbanceIcon.svg';
import { dateAttr, commentAttr, surveyorsAttr } from '../common/config';
import Manual from './Manual';

const survey = {
  name: 'disturbance',
  label: 'Record Disturbance',
  icon: disturbance,
  Manual,

  id: 597, // dev 596
  render: [],

  attrs: {
    date: dateAttr,
    comment: commentAttr,
    surveyors: surveyorsAttr,

    location: {
      id: 'entered_sref',
      values(location, submission, sample) {
        submission.fields.location_id = sample.metadata.site.location_id; // eslint-disable-line

        return `${parseFloat(location.latitude).toFixed(7)}, ${parseFloat(
          location.longitude
        ).toFixed(7)}`;
      },
    },

    disturbance: {
      id: 1500,
      type: 'checkbox',
      label: 'Disturbance',
      icon: disturbanceBlack,
      info: 'Please select the disturbance type for this record.',
      values: [
        { isPlaceholder: true, label: 'Bare sand/poached area' },
        { value: 'Less than 1 metre across', id: 17808 }, // dev 17804
        { value: 'More than 1 metre across', id: 17809 }, // dev 17805

        { isPlaceholder: true, label: 'Animal dung' },
        { value: 'Rabbit', id: 17810 }, // dev 17806
        { value: 'Cattle', id: 17811 }, // dev 17807
        { value: 'Pony', id: 17812 }, // dev 17808
        { value: 'Sheep', id: 17813 }, // dev 17809
        { value: 'Unknown', id: 17814 }, // dev 17810

        { isPlaceholder: true, label: 'Rabbit activity' },
        { value: 'Scrape', id: 17815 }, // dev 17811
        { value: 'Burrow', id: 17816 }, // dev 17812

        { isPlaceholder: true, label: 'Other' },
        { value: 'Vehicle tracks', id: 17817 }, // dev 17813
        { value: 'Litter/flytipping', id: 17818 }, // dev 17814
        { value: 'Fires/BBQ remnants', id: 17825 },
        { value: 'Other (please add a comment)', id: 17819 }, // dev 17815
      ],
    },
  },

  verify(attrs, sample) {
    try {
      Yup.object()
        .shape({
          location_id: Yup.number().required('Please select your site.'),
        })
        .validateSync(sample.metadata.site, { abortEarly: false });

      Yup.object()
        .shape({
          latitude: Yup.number().required('Please select your location.'),
        })
        .validateSync(attrs.location, { abortEarly: false });
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
        surveyors,
        location_type: 'latlon',
      },
    });

    sample.startGPS();

    return sample;
  },
};

export default survey;
