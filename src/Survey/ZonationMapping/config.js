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
  value: habitat,
  id: habitat.warehouse_id,
}));

const survey = {
  name: 'zonation-mapping',
  label: 'Zonation Mapping',
  icon: zonationIcon,

  id: 578, // -1,
  render: [],

  attrs: {
    location: locationAttr,
    date: dateAttr,
    comment: commentAttr,
    surveyors: surveyorsAttr,
  },

  smp: {
    attrs: {
      previousHabitat: {
        id: 1484, // -1,
        label: 'Type',
        icon: habitatIcon,
        type: 'radio',
        info: 'Please specify the previous habitat type.',
        values: habitatValues,
      },

      currentHabitat: {
        id: 1485, // -1,
        label: 'Type',
        icon: habitatIcon,
        type: 'radio',
        info: 'Please specify the new habitat type.',
        values: habitatValues,
      },

      distance: {
        id: 1483, // -1,
        icon: distanceIcon,
        label: 'Distance',
        type: 'slider',
        info: 'Please specify the distance of the slope in meters.',
        displayValueParse: value => `${value.toFixed(1)}m`,
        max: 300,
        min: 0,
        step: 0.1,
        skipValueTranslation: true,
      },
    },

    create(Sample, type) {
      const sample = new Sample({
        metadata: {
          survey: survey.name,
          survey_id: survey.id,
          type,
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
