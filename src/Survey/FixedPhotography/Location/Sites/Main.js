import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Main, RadioInput } from '@apps';

const sites = [
  { label: 'Morecambe Bay', value: 'Morecambe Bay' },
  { label: 'Ravenglass Estuary Dunes', value: 'Ravenglass Estuary Dunes' },
];

function Sites({ appModel, onSiteSelect }) {
  const { favouriteSite } = appModel.attrs;

  return (
    <Main>
      <RadioInput
        values={sites}
        onChange={selectedId => {
          onSiteSelect(selectedId);
        }}
        currentValue={favouriteSite}
      />
    </Main>
  );
}

Sites.propTypes = {
  appModel: PropTypes.object.isRequired,
  onSiteSelect: PropTypes.func.isRequired,
};

export default observer(Sites);
