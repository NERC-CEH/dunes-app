import * as Yup from 'yup';
import userModel from 'userModel';
import angleIcon from 'common/images/angle.svg';
import dunesIcon from 'common/images/dunes.svg';
import distanceIcon from 'common/images/double-arrow.svg';
import { chevronUpOutline } from 'ionicons/icons';
import Manual from './Manual';

import {
  locationAttrs,
  dateAttr,
  commentAttr,
  surveyorsAttr,
  verifyLocationSchema,
} from '../common/config';

const survey = {
  name: 'dunes-profile',
  label: 'Dunes Profile',
  locationType: 'Transect',
  icon: dunesIcon,
  Manual,

  id: 594,
  render: [],

  attrs: {
    ...locationAttrs,
    date: dateAttr,
    comment: commentAttr,
    surveyors: surveyorsAttr,
  },

  smp: {
    attrs: {
      location: {
        id: 'entered_sref',
        values(location, submission) {
          // convert accuracy for map and gridref sources
          const { accuracy, gridref } = location;
          const keys = survey.smp.attrs;

          submission.fields[keys.location_gridref.id] = gridref; // eslint-disable-line
          submission.fields[keys.location_accuracy.id] = accuracy; // eslint-disable-line

          return `${parseFloat(location.latitude).toFixed(7)}, ${parseFloat(
            location.longitude
          ).toFixed(7)}`;
        },
      },
      location_accuracy: { id: 282 },
      location_gridref: { id: 335 },

      date: dateAttr,

      comment: commentAttr,

      type: {
        id: 1494,
        label: 'Type',
        icon: chevronUpOutline,
        type: 'radio',
        info: 'Please specify the type of the slope.',
        values: [
          {
            value: 'Downslope',
            id: 17793,
          },
          {
            value: 'Upslope',
            id: 17794,
          },
        ],
      },

      angle: {
        id: 1495,
        icon: angleIcon,
        label: 'Angle',
        type: 'slider',
        info: 'Please specify the angle of the slope.',
        displayValueParse: value => `${value} °`,
        min: model => (model.attrs.type === 'Downslope' ? -90 : 0),
        max: model => (model.attrs.type === 'Downslope' ? 0 : 90),
        skipValueTranslation: true,
      },

      distance: {
        id: 1496,
        icon: distanceIcon,
        label: 'Distance',
        type: 'slider',
        info: 'Please specify the distance of the slope in meters.',
        displayValueParse: value => `${value.toFixed(1)} m`,
        max: 300,
        min: 0,
        step: 0.1,
        skipValueTranslation: true,
      },
    },

    verify(attrs, sample) {
      try {
        Yup.object()
          .shape({
            location: Yup.object().required('Please add location.'),
          })
          .validateSync(attrs);

        if (sample.metadata.type === 'start') {
          return null;
        }

        const transectSchema = Yup.object().shape({
          type: Yup.string().required('Please add type.'),
          angle: Yup.number().required('Please add angle.'),
          distance: Yup.number().required('Please add distance.'),
        });

        transectSchema.validateSync(attrs, { abortEarly: false });
      } catch (attrError) {
        return attrError;
      }

      return null;
    },

    create(Sample, type) {
      const sample = new Sample({
        metadata: {
          survey: survey.name,
          survey_id: survey.id,
          type,
        },
        attrs: {
          sample_method_id: 2425,
        },
      });

      return sample;
    },
  },

  verify(attrs, sample) {
    try {
      const transectSchema = Yup.object().shape({
        location: verifyLocationSchema,
      });

      transectSchema.validateSync(attrs, { abortEarly: false });

      Yup.mixed()
        .test(
          'points',
          'Please add at points to the survey.',
          () => sample.samples.length
        )
        .validateSync();
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
        ignoreTransectSections: true,
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
