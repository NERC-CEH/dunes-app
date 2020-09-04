import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { IonList } from '@ionic/react';
import InfoBackgroundMessage from 'Components/InfoBackgroundMessage';
import { Main, RadioInput, alert } from '@apps';
import { Trans as T } from 'react-i18next';

function showChangeLocationConfirmationDialog() {
  return new Promise(resolve => {
    alert({
      header: 'Changing location',
      message: (
        <T>
          Warning - This will discard some of the survey information you have
          entered so far.
        </T>
      ),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => resolve(false),
        },
        {
          text: 'Discard',
          cssClass: 'primary',
          handler: () => resolve(true),
        },
      ],
    });
  });
}

@observer
class Locations extends React.Component {
  static propTypes = {
    locations: PropTypes.any.isRequired,
    sample: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    cancelSelectedTransect: PropTypes.func.isRequired,
  };

  onLocationSelect = async selectedId => {
    const { sample, locations, onSelect, cancelSelectedTransect } = this.props;

    if (sample.attrs.location) {
      const change = await showChangeLocationConfirmationDialog();

      if (!change) {
        cancelSelectedTransect();
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

  getLocationsItemsList() {
    const { sample, locations } = this.props;

    const isSamplePlantQuadrat = sample.metadata.survey === 'plant-quadrat';

    const locationsArray = Object.values(locations);
    const hasLocations = !!locationsArray.length;

    if (!hasLocations && !isSamplePlantQuadrat) {
      return (
        <IonList lines="full">
          <InfoBackgroundMessage>
            No survey transects currently set up for this site. Please try to
            refresh the list.
          </InfoBackgroundMessage>
        </IonList>
      );
    }

    if (!hasLocations && isSamplePlantQuadrat) {
      return (
        <IonList lines="full">
          <InfoBackgroundMessage>
            No survey quadrat groups currently set up for this site. Please try
            to refresh the list.
          </InfoBackgroundMessage>
        </IonList>
      );
    }

    const currentValue =
      sample.attrs.location && sample.attrs.location.location_id;

    const getTransectOption = ({ name, location_id: id }) => ({
      value: id,
      label: name,
    });
    const transectOptions = locationsArray.map(getTransectOption);

    return (
      <RadioInput
        values={transectOptions}
        onChange={this.onLocationSelect}
        currentValue={currentValue}
        skipTranslation
      />
    );
  }

  render() {
    return <Main>{this.getLocationsItemsList()}</Main>;
  }
}

export default Locations;
