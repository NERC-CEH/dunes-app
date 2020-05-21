import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Main, RadioInput } from '@apps';

const sites = [
  { label: 'Cumbria', value: 'Cumbria' },
  { label: 'Dorset', value: 'Dorset' },
];

function getTransectItemsList(favouriteSite, onSiteSelect) {
  const currentValue = favouriteSite;

  return (
    <RadioInput
      values={sites}
      onChange={selectedId => {
        onSiteSelect(selectedId);
      }}
      currentValue={currentValue}
    />
  );
}

function Sites({ appModel, onSiteSelect }) {
  const { favouriteSite } = appModel.attrs;

  return <Main>{getTransectItemsList(favouriteSite, onSiteSelect)}</Main>;
}

Sites.propTypes = {
  appModel: PropTypes.object.isRequired,
  onSiteSelect: PropTypes.func.isRequired,
};

export default observer(Sites);
