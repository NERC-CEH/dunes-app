import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Main, RadioInput } from '@apps';

function Sites({ appModel, onSiteSelect }) {
  const { favouriteSite, sites } = appModel.attrs;

  const options = sites.map(site => {
    return {
      label: site.name,
      value: site.location_id,
    };
  });

  return (
    <Main>
      <RadioInput
        values={options}
        onChange={selectedId => {
          const site = sites.find(({ location_id: id }) => selectedId === id);
          onSiteSelect(site);
        }}
        currentValue={favouriteSite.location_id}
        skipTranslation
      />
    </Main>
  );
}

Sites.propTypes = {
  appModel: PropTypes.object.isRequired,
  onSiteSelect: PropTypes.func.isRequired,
};

export default observer(Sites);
