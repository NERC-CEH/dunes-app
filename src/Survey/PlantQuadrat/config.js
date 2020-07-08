import { date } from '@apps';
import {
  calendarOutline,
  chatboxOutline,
  peopleOutline,
  gridOutline,
} from 'ionicons/icons';
import userModel from 'userModel';
import quadratTransectIcon from 'common/images/quadratTransect.svg';

const survey = {
  name: 'plant-quadrat',
  label: 'Plant Quadrat Recording',
  icon: quadratTransectIcon,

  id: -1, // warehouse id
  render: [],

  attrs: {
    date: {
      label: 'Date',
      icon: calendarOutline,
      values: d => date.print(d),
      isValid: val => val && val.toString() !== 'Invalid Date',
      type: 'date',
      max: () => new Date(),
    },

    comment: {
      label: 'Comment',
      icon: chatboxOutline,
      type: 'textarea',
      info: 'Please add any extra information about your survey.',
    },

    surveyors: {
      label: 'Surveyors',
      icon: peopleOutline,
      id: -1,
      info:
        'If anyone has helped with the surveying please enter their names here.',
      placeholder: 'Name',
      type: 'inputList',
      values(val) {
        return val.join(', ');
      },
    },
  },

  smp: {
    attrs: {
      sand: {
        id: -1,
        label: 'Sand',
        type: 'slider',
        info: 'Please specify the % of the bare sand cover.',
        max: 100,
        min: 0,
        step: 0.5,
        icon: gridOutline,
      },
      moss: {
        id: -1,
        label: 'Moss & Lichen',
        type: 'slider',
        info: 'Please specify the % of the moss and lichen cover.',
        max: 100,
        min: 0,
        step: 0.5,
        icon: gridOutline,
      },
      grass: {
        id: -1,
        label: 'Grasses',
        type: 'slider',
        info: 'Please specify the % of the grasses, sedges and rushes cover.',
        max: 100,
        min: 0,
        step: 0.5,
        icon: gridOutline,
      },
      herbs: {
        id: -1,
        label: 'Herbs',
        type: 'slider',
        info: 'Please specify the % of the herbs cover.',
        max: 100,
        min: 0,
        step: 0.5,
        icon: gridOutline,
      },
      shrubs: {
        id: -1,
        label: 'Shrubs',
        type: 'slider',
        info: 'Please specify the % of the heathland shrubs cover.',
        max: 100,
        min: 0,
        step: 0.5,
        icon: gridOutline,
      },
      scrub: {
        id: -1,
        label: 'Scrub',
        type: 'slider',
        info: 'Please specify the % of the scrub and woodland cover.',
        max: 100,
        min: 0,
        step: 0.5,
        icon: gridOutline,
      },
      height: {
        id: -1,
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
        },
        attrs: {
          location,
          height: [null, null, null, null, null],
        },
      });

      return sample;
    },
  },

  verify() {},

  create(Sample) {
    const surveyors = [];

    const { fullName } = userModel.attrs;
    if (fullName) {
      surveyors.push(fullName);
    }

    const sample = new Sample({
      metadata: {
        survey: survey.name,
      },
      attrs: {
        surveyors,
      },
    });

    return sample;
  },
};

export default survey;
