import { date } from '@apps';
import {
  cameraOutline,
  calendarOutline,
  chatboxOutline,
  peopleOutline,
} from 'ionicons/icons';

const survey = {
  name: 'fixed-photography',
  label: 'Fixed-point Photography',
  icon: cameraOutline,

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
      disturbance: {
        id: -1,
        label: 'Disturbance',
        type: 'textarea',
        icon: chatboxOutline,
        info: 'Please add any extra information about the disturbance.',
      },
    },

    create(Sample, location) {
      const sample = new Sample({
        metadata: {
          survey: survey.name,
        },
        attrs: {
          location,
        },
      });

      return sample;
    },
  },

  verify() {},

  create(Sample) {
    const sample = new Sample({
      metadata: {
        survey: survey.name,
      },
    });

    return sample;
  },
};

export default survey;
