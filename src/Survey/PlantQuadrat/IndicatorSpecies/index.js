import React from 'react';
import { observer } from 'mobx-react';
import { Page, Header } from '@apps';
import species from 'common/data/species';
import Main from './Main';

const habitatMapping = {
  Standline: 'strandline_embryo_mobile_dune',
  'Embryo Dune': 'strandline_embryo_mobile_dune',
  'Mobile Dune': 'strandline_embryo_mobile_dune',
  'Fixed Dune': 'fixed_semi_fixed_dune',
  'Semi-fixed Dune': 'fixed_semi_fixed_dune',
  'Dune Slack': 'dune_slack',
  Heath: 'dune_heath',
};

const indicatorMapping = {
  health: ['positive_health', 'negative_health'],
  nitrogen: ['nitro_phobe', 'nitro_phile'],
};

const Controller = observer(props => {
  const { match, subSample } = props;
  const { habitat } = subSample.attrs.location;
  const mappedHabitat = habitatMapping[habitat];

  const { indicatorType } = match.params;
  const title = indicatorType === 'health' ? 'Health' : 'Nitrogen';

  const filteredSpecies = species.filter(sp => {
    const isInHabitat = !!sp[mappedHabitat];
    const [positive, negative] = indicatorMapping[indicatorType];
    return isInHabitat && (sp[positive] || sp[negative]);
  });

  console.log(filteredSpecies);

  return (
    <Page id="survey-plant-quadrat-indicator-edit">
      <Header title={title} />
      <Main {...props} filteredSpecies={filteredSpecies} />
    </Page>
  );
});

export default Controller;
