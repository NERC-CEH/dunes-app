import * as Yup from 'yup';
import userModel from 'userModel';
import appModel from 'appModel';
import zonationIcon from 'common/images/destination.svg';
import distanceIcon from 'common/images/double-arrow.svg';
import habitatIcon from 'common/images/habitats.svg';
import habitats from 'common/data/habitats.json';
import {
  locationAttrs,
  dateAttr,
  commentAttr,
  surveyorsAttr,
  verifyLocationSchema,
} from '../common/config';
import Manual from './Manual';

const habitatValues = habitats.map(habitat => ({
  value: habitat.title,
  id: habitat.warehouse_id,
}));

const survey = {
  name: 'zonation-mapping',
  label: 'Zonation Mapping',
  locationType: 'Zonation',
  icon: zonationIcon,
  Manual,

  id: 595,
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

      previousHabitat: {
        id: 1498,
        label: 'Previous Habitat',
        icon: habitatIcon,
        type: 'radio',
        info: 'Please specify the previous habitat type.',
        values: habitatValues,
      },

      currentHabitat: {
        id: 1499,
        label: 'New Habitat',
        icon: habitatIcon,
        type: 'radio',
        info: 'Please specify the new habitat type.',
        values: habitatValues,
      },

      distance: {
        id: 1497,
        icon: distanceIcon,
        label: 'Distance',
        type: 'slider',
        info:
          'Please specify the distance from previous transition point in meters.',
        displayValueParse: value => `${value.toFixed(1)} m`,
        max: 300,
        min: 0,
        step: 0.1,
        skipValueTranslation: true,
      },

      comment: commentAttr,
    },

    verify(attrs, sample) {
      try {
        Yup.object()
          .shape({
            location: Yup.object().required('Please add location.'),
          })
          .validateSync(attrs);

        if (sample.metadata.type === 'transition') {
          const transectSchema = Yup.object().shape({
            previousHabitat: Yup.string().required(
              'Please add previous habitat.'
            ),
            currentHabitat: Yup.string().required('Please add new habitat.'),
          });

          transectSchema.validateSync(attrs, { abortEarly: false });
        }
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
        site: appModel.attrs.favouriteSite,
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
