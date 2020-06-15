import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
import { IonList, IonItem } from '@ionic/react';
import { Main, RadioInput } from '@apps';
import './styles.scss';

function showNoTransects() {
  return (
    <IonList lines="full">
      <IonItem className="empty">
        <span>
          <T>You don't have any transects. Please try to refresh the list.</T>
        </span>
      </IonItem>
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
