import * as Yup from 'yup';
import userModel from 'userModel';
import zonationIcon from 'common/images/destination.svg';
import distanceIcon from 'common/images/double-arrow.svg';
import habitatIcon from 'common/images/habitats.svg';
import habitats from 'common/data/habitats.json';
import {
  locationAttr,
  dateAttr,
  commentAttr,
  surveyorsAttr,
  verifyLocationSchema,
} from '../common/config';

const habitatValues = habitats.map(habitat => ({
  value: habitat.title,
  id: habitat.warehouse_id,
}));

const survey = {
  name: 'zonation-mapping',
  label: 'Zonation Mapping',
  icon: zonationIcon,

  id: 595,
  render: [],

  attrs: {
    location: locationAttr,
    date: dateAttr,
    comment: commentAttr,
    surveyors: surveyorsAttr,
  },

  smp: {
    attrs: {
      location: {
        id: 'entered_sref',
        values(location) {
          return `${parseFloat(location.latitude).toFixed(7)}, ${parseFloat(
            location.longitude
          ).toFixed(7)}`;
        },
      },

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
        displayValueParse: value => `${value.toFixed(1)}m`,
        max: 300,
        min: 0,
        step: 0.1,
        skipValueTranslation: true,
      },

      comment: commentAttr,
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
