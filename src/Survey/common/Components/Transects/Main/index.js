import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { IonList, IonLabel } from '@ionic/react';
import InfoBackgroundMessage from 'Components/InfoBackgroundMessage';
import { Main, RadioInput, alert } from '@apps';

function showNoTransects() {
  return (
    <IonList lines="full">
      <InfoBackgroundMessage>
        You don't have any transects. Please try to refresh the list.
      </InfoBackgroundMessage>
    </IonList>
  );
}

function getTransectItemsList(
  sample,
  transects,
  onTransectSelect,
  cancelSelectedTransect
) {
  const hasTransects = !!transects.length;
  if (!hasTransects) {
    return showNoTransects();
  }
  const currentValue = sample.attrs.location && sample.attrs.location.id;
  const getTransectOption = ({ name, id }) => ({
    value: id,
    label: name,
  });

  function showChangeTransectConfirmationDialog(callback) {
    const changeTransect = true;

    alert({
      header: 'Warning',
      message: <IonLabel>This will discard any enter data!</IonLabel>,
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

  const transectOptions = transects.map(getTransectOption);

  return (
    <RadioInput
      values={transectOptions}
      onChange={async selectedId => {
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

        const selectedTransect = transects.find(({ id }) => id === selectedId);
        onTransectSelect(selectedTransect);
      }}
      currentValue={currentValue}
      skipTranslation
    />
  );
}

function Transects({
  sample,
  transects,
  onTransectSelect,
  cancelSelectedTransect,
}) {
  return (
    <Main>
      {getTransectItemsList(
        sample,
        transects,
        onTransectSelect,
        cancelSelectedTransect
      )}
    </Main>
  );
}

Transects.propTypes = {
  transects: PropTypes.array.isRequired,
  sample: PropTypes.object.isRequired,
  onTransectSelect: PropTypes.func.isRequired,
  cancelSelectedTransect: PropTypes.func.isRequired,
};

export default observer(Transects);
