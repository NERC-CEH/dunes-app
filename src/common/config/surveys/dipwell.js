import { date } from '@apps';
import { calendarOutline, chatboxOutline, peopleOutline } from 'ionicons/icons';
import heightIcon from 'common/images/height.svg';
import dipwellIcon from 'common/images/water-table-depth.svg';

const survey = {
  name: 'dipwell',
  label: 'Water Table Depth',
  icon: dipwellIcon,

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
      comment: {
        label: 'Comment',
        icon: chatboxOutline,
        type: 'textarea',
        info: 'Please add any extra information about this dipwell.',
      },
      height: {
        id: -1,
        label: 'Water Depth',
        type: 'slider',
        info:
          'Please specify the water level in centimeters from the top of dipwell down to the water.',
        max: 200,
        min: 0,
        icon: heightIcon,
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
