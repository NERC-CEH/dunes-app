import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { IonList } from '@ionic/react';
import InfoBackgroundMessage from 'Components/InfoBackgroundMessage';
import { Main, RadioInput } from '@apps';

function showNoTransects() {
  return (
    <IonList lines="full">
      <InfoBackgroundMessage>
        You don't have any transects. Please try to refresh the list.
      </InfoBackgroundMessage>
    </IonList>
  );
}

function getTransectItemsList(sample, transects, onTransectSelect) {
  const hasTransects = !!transects.length;
  if (!hasTransects) {
    return showNoTransects();
  }
  const currentValue = sample.attrs.location && sample.attrs.location.id;
  const getTransectOption = ({ name, id }) => ({
    value: id,
    label: name,
  });

  const transectOptions = transects.map(getTransectOption);

  return (
    <RadioInput
      values={transectOptions}
      onChange={selectedId => {
        const selectedTransect = transects.find(({ id }) => id === selectedId);
        onTransectSelect(selectedTransect);
      }}
      currentValue={currentValue}
      skipTranslation
    />
  );
}

function Transects({ sample, transects, onTransectSelect }) {
  return (
    <Main>{getTransectItemsList(sample, transects, onTransectSelect)}</Main>
  );
}

Transects.propTypes = {
  transects: PropTypes.array.isRequired,
  sample: PropTypes.object.isRequired,
  onTransectSelect: PropTypes.func.isRequired,
};

export default observer(Transects);
