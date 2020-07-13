import * as Yup from 'yup';
import userModel from 'userModel';
import angleIcon from 'common/images/angle.svg';
import dunesIcon from 'common/images/dunes.svg';
import distanceIcon from 'common/images/double-arrow.svg';
import { chevronUpOutline } from 'ionicons/icons';

import {
  locationAttr,
  dateAttr,
  commentAttr,
  surveyorsAttr,
  verifyLocationSchema,
} from '../common/config';

const survey = {
  name: 'dunes-profile',
  label: 'Dunes Profile',
  icon: dunesIcon,

  id: -1,
  render: [],

  attrs: {
    location: locationAttr,
    date: dateAttr,
    comment: commentAttr,
    surveyors: surveyorsAttr,
  },

  smp: {
    attrs: {
      comment: commentAttr,
      type: {
        id: -1,
        label: 'Type',
        icon: chevronUpOutline,
        type: 'radio',
        info: 'Please specify the type of the slope.',
        values: [
          { value: 'Downslope', id: -1 },
          { value: 'Upslope', id: -1 },
        ],
      },
      angle: {
        id: -1,
        icon: angleIcon,
        label: 'Angle',
        type: 'slider',
        info: 'Please specify the angle of the slope.',
        displayValueParse: value => `${value}°`,
        max: 70,
        min: -70,
        skipValueTranslation: true,
      },
      distance: {
        id: -1,
        icon: distanceIcon,
        label: 'Distance',
        type: 'slider',
        info: 'Please specify the distance of the slope in meters.',
        displayValueParse: value => `${value}m`,
        max: 200,
        min: 0,
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
