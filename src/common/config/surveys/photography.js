import { date } from '@apps';
import { cameraOutline } from 'ionicons/icons';

const survey = {
  name: 'fixed-photography',
  label: 'Fixed-point Photography',
  icon: cameraOutline,

  id: -1, // warehouse id
  render: [],

  attrs: {
    date: {
      label: 'Date',
      values: d => date.print(d),
      isValid: val => val && val.toString() !== 'Invalid Date',
      type: 'date',
      max: () => new Date(),
    },

    comment: {
      label: 'Notes',
      type: 'textarea',
      info: 'Please add any extra information about your survey.',
    },

    surveyors: {
      label: 'Surveyors',
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

  verify() {},

  create(Sample) {
    const sample = new Sample();
    sample.metadata.survey = survey.name;

    return sample;
  },
};

export default survey;
