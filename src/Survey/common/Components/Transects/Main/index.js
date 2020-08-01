import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { IonList } from '@ionic/react';
import InfoBackgroundMessage from 'Components/InfoBackgroundMessage';
import { Main, RadioInput, alert } from '@apps';
import { Trans as T } from 'react-i18next';

function showNoTransects() {
  return (
    <IonList lines="full">
      <InfoBackgroundMessage>
        You don't have any transects. Please try to refresh the list.
      </InfoBackgroundMessage>
    </IonList>
  );
}

function getLocationsItemsList(
  sample,
  locations,
  onSelect,
  cancelSelectedTransect
) {
  const locationsArray = Object.values(locations);
  const hasLocations = !!locationsArray.length;
  if (!hasLocations) {
    return showNoTransects();
  }
  const currentValue =
    sample.attrs.location && sample.attrs.location.location_id;

  const getTransectOption = ({ name, location_id: id }) => ({
    value: id,
    label: name,
  });
  const transectOptions = locationsArray.map(getTransectOption);

  function showChangeTransectConfirmationDialog(callback) {
    const changeTransect = true;

    alert({
      header: 'Changing location',
      message: (
        <T>
          Warning - This will discard some of the survey informaton you have
          entered so far.
        </T>
      ),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => cancelSelectedTransect(),
        },
        {
          text: 'Discard',
          cssClass: 'primary',
          handler: () => callback(changeTransect),
        },
      ],
    });
  }

  async function showAlert() {
    return new Promise(resolve => {
      showChangeTransectConfirmationDialog(async reset => {
        resolve(reset);
      });
    });
  }

  const onLocationSelect = async selectedId => {
    if (sample.attrs.location) {
      const change = await showAlert();
      if (!change) {
        return;
      }

      while (sample.samples.length) {
        const subSample = sample.samples.pop();
        await subSample.destroy(); //eslint-disable-line
      }
    }

    const selectedLocation = locations.find(
      ({ location_id: id }) => id === selectedId
    );

    onSelect(selectedLocation);
  };

  return (
    <RadioInput
      values={transectOptions}
      onChange={onLocationSelect}
      currentValue={currentValue}
      skipTranslation
    />
  );
}

function Locations({ sample, locations, onSelect, cancelSelectedTransect }) {
  return (
    <Main>
      {getLocationsItemsList(
        sample,
        locations,
        onSelect,
        cancelSelectedTransect
      )}
    </Main>
  );
}

Locations.propTypes = {
  locations: PropTypes.any.isRequired,
  sample: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  cancelSelectedTransect: PropTypes.func.isRequired,
};

export default observer(Locations);
