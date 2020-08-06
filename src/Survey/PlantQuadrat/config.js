import * as Yup from 'yup';
import { gridOutline } from 'ionicons/icons';
import userModel from 'userModel';
import appModel from 'appModel';
import quadratTransectIcon from 'common/images/quadratTransect.svg';
import species from 'common/data/species';
import {
  locationAttrs,
  dateAttr,
  commentAttr,
  surveyorsAttr,
  verifyLocationSchema,
} from '../common/config';
import Manual from './Manual';

function addRelativeSpeciesAsOccurrenes(sample, habitat, Occurrence, sp) {
  const indicatorMapping = {
    health: ['positive_health', 'negative_health'],
    nitrogen: ['nitro_phobe', 'nitro_phile'],
  };

  const habitatMapping = {
    Standline: 'strandline_embryo_mobile_dune',
    'Embryo Dune': 'strandline_embryo_mobile_dune',
    'Mobile Dune': 'strandline_embryo_mobile_dune',
    'Fixed Dune': 'fixed_semi_fixed_dune',
    'Semi-fixed Dune': 'fixed_semi_fixed_dune',
    'Dune Slack': 'dune_slack',
    Heath: 'dune_heath',
  };

  const mappedHabitat = habitatMapping[habitat];
  const isInHabitat = !!sp[mappedHabitat];
  const [positiveHealth, negativeHealth] = indicatorMapping.health;
  const [positiveNitrogen, negativeNitrogen] = indicatorMapping.nitrogen;

  const isHealth = sp[positiveHealth] || sp[negativeHealth];
  const isNitrogen = sp[positiveNitrogen] || sp[negativeNitrogen];
  const isIndicator = isHealth || isNitrogen;

  if (isInHabitat && isIndicator) {
    const occ = new Occurrence({
      metadata: {
        nitrogen: !!isNitrogen,
        health: !!isHealth,
      },
      attrs: {
        taxon: JSON.parse(JSON.stringify(sp)), // clone in case duplicated elsewhere
      },
    });

    sample.occurrences.push(occ);
  }
}

const survey = {
  name: 'plant-quadrat',
  label: 'Plant Quadrat Recording',
  locationType: 'Quadrat',
  icon: quadratTransectIcon,
  Manual,

  id: 592,
  render: [],

  attrs: {
    ...locationAttrs,
    date: dateAttr,
    comment: commentAttr,
    surveyors: surveyorsAttr,
  },

  smp: {
    attrs: {
      ...locationAttrs,
      date: dateAttr,

      sand: {
        id: 1487,
        label: 'Bare ground & Sand',
        type: 'slider',
        info: 'Please specify the % of the bare ground and sand cover.',
        displayValueParse: value => `${value} %`,
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
        displayValueParse: value => `${value} %`,
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
        displayValueParse: value => `${value} %`,
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
        displayValueParse: value => `${value} %`,
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
        displayValueParse: value => `${value} %`,
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
        displayValueParse: value => `${value} %`,
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

    occ: {
      attrs: {
        taxon: {
          id: 'taxa_taxon_list_id',
          values(taxon) {
            return taxon.id;
          },
        },
        health: {
          id: 841,
          label: 'Health',
          type: 'slider',
          info: 'Please specify the % of the cover.',
          displayValueParse: value => `${value} %`,
          max: 100,
          min: 0,
          step: 0.5,
          icon: gridOutline,
          skipValueTranslation: true,
        },
        nitrogen: {
          id: 840,
          label: 'Health',
          type: 'slider',
          info: 'Please specify the % of the cover.',
          displayValueParse: value => `${value} %`,
          max: 100,
          min: 0,
          step: 0.5,
          icon: gridOutline,
          skipValueTranslation: true,
        },
      },
    },

    create(Sample, location, Occurrence) {
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

      const { habitat } = location;
      if (habitat) {
        species.forEach(sp =>
          addRelativeSpeciesAsOccurrenes(sample, habitat, Occurrence, sp)
        );
      }

      return sample;
    },

    verify(_, sample) {
      try {
        Yup.mixed()
          .test(
            'vegetation',
            'Please check why the total cover is less than 100%. Remember to record bare ground/sand.',
            () => {
              let cover = 0;
              ['sand', 'moss', 'grass', 'herbs', 'shrubs', 'scrub'].forEach(
                key => {
                  if (!sample.attrs[key]) return;
                  cover += sample.attrs[key];
                }
              );

              return cover >= 100;
            }
          )
          .validateSync();
      } catch (attrError) {
        return attrError;
      }

      return null;
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
        site: appModel.attrs.favouriteSite,
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
