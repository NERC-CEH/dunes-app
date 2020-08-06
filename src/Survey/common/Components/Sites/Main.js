import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import InfoBackgroundMessage from 'Components/InfoBackgroundMessage';
import { Main, RadioInput } from '@apps';
import { IonList } from '@ionic/react';

function Sites({ sample, appModel, onSiteSelect }) {
  const { sites } = appModel.attrs;
  const { site } = sample.metadata;

  const hasData = !!sites.length;
  if (!hasData) {
    return (
      <Main>
        <IonList lines="full">
          <InfoBackgroundMessage>
            You don't have any sites. Please try to refresh the list.
          </InfoBackgroundMessage>
        </IonList>
      </Main>
    );
  }

  const options = sites.map(s => {
    return {
      label: s.name,
      value: s.location_id,
    };
  });

  return (
    <Main>
      <RadioInput
        values={options}
        onChange={selectedId => {
          const selectedSite = sites.find(
            ({ location_id: id }) => selectedId === id
          );
          onSiteSelect(selectedSite);
        }}
        currentValue={site.location_id}
        skipTranslation
      />
    </Main>
  );
}

Sites.propTypes = {
  sample: PropTypes.object.isRequired,
  appModel: PropTypes.object.isRequired,
  onSiteSelect: PropTypes.func.isRequired,
};

export default observer(Sites);
