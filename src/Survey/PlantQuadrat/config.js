import * as Yup from 'yup';
import { gridOutline } from 'ionicons/icons';
import userModel from 'userModel';
import quadratTransectIcon from 'common/images/quadratTransect.svg';
import {
  locationAttr,
  dateAttr,
  commentAttr,
  surveyorsAttr,
  verifyLocationSchema,
} from '../common/config';

const survey = {
  name: 'plant-quadrat',
  label: 'Plant Quadrat Recording',
  icon: quadratTransectIcon,

  id: 592,
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

      sand: {
        id: 1487,
        label: 'Sand',
        type: 'slider',
        info: 'Please specify the % of the bare sand cover.',
        displayValueParse: value => `${value}%`,
        max: 100,
        min: 0,
        step: 0.5,
        icon: gridOutline,
        skipValueTranslation: true,
      },
      moss: {
        id: 1488,
        label: 'Moss & Lichen',
        type: 'slider',
        info: 'Please specify the % of the moss and lichen cover.',
        displayValueParse: value => `${value}%`,
        max: 100,
        min: 0,
        step: 0.5,
        icon: gridOutline,
        skipValueTranslation: true,
      },
      grass: {
        id: 1489,
        label: 'Grasses',
        type: 'slider',
        info: 'Please specify the % of the grasses, sedges and rushes cover.',
        displayValueParse: value => `${value}%`,
        max: 100,
        min: 0,
        step: 0.5,
        icon: gridOutline,
        skipValueTranslation: true,
      },
      herbs: {
        id: 1490,
        label: 'Herbs',
        type: 'slider',
        info: 'Please specify the % of the herbs cover.',
        displayValueParse: value => `${value}%`,
        max: 100,
        min: 0,
        step: 0.5,
        icon: gridOutline,
        skipValueTranslation: true,
      },
      shrubs: {
        id: 1491,
        label: 'Shrubs',
        type: 'slider',
        info: 'Please specify the % of the heathland shrubs cover.',
        displayValueParse: value => `${value}%`,
        max: 100,
        min: 0,
        step: 0.5,
        icon: gridOutline,
        skipValueTranslation: true,
      },
      scrub: {
        id: 1492,
        label: 'Scrub',
        type: 'slider',
        info: 'Please specify the % of the scrub and woodland cover.',
        displayValueParse: value => `${value}%`,
        max: 100,
        min: 0,
        step: 0.5,
        icon: gridOutline,
        skipValueTranslation: true,
      },
      height: {
        id: 1493,
        label: 'Vegetation',
        type: 'slider',
        info: 'Please specify the vegetation height in cm.',
        get: ({ subSample, match }) =>
          subSample.attrs.height[match.params.heightID],
        set: (value, { subSample, match }) => {
          const { heightID } = match.params;
          subSample.attrs.height[heightID] = value; // eslint-disable-line
        },
        max: 200,
        min: 0,
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
          height: [null, null, null, null, null],
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
