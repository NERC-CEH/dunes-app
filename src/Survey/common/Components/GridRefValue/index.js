import React from 'react';
import PropTypes from 'prop-types';
import { IonSpinner } from '@ionic/react';
import { observer } from 'mobx-react';
import locationHelp from 'common/helpers/location';
import './styles.scss';

function getValue(sample) {
  if (sample.isGPSRunning()) {
    return <IonSpinner />;
  }

  if (!sample.attrs.location || !sample.attrs.location.latitude) {
    return null;
  }

  const { latitude, longitude } = sample.attrs.location;

  const gridRef = locationHelp.locationToGrid({
    accurracy: 1,
    latitude,
    longitude,
  });

  if (!gridRef) {
    return `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
  }

  return locationHelp.prettyPrintGridRef(gridRef);
}

function GridRefValue({ sample }) {
  const value = getValue(sample);

  return <div className="gridref-label">{value}</div>;
}

GridRefValue.propTypes = {
  sample: PropTypes.object.isRequired,
};

export default observer(GridRefValue);
