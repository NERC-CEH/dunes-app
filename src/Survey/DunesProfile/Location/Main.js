import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { IonList, IonButton, IonLabel, IonIcon } from '@ionic/react';
import { Trans as T } from 'react-i18next';
import { Main, MenuAttrItem } from '@apps';
import { locationOutline, addCircleOutline, mapOutline } from 'ionicons/icons';
import transectIcon from 'common/images/transect.svg';

@observer
class Component extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
    appModel: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    isDisabled: PropTypes.bool,
  };

  render() {
    const { sample, isDisabled, match, appModel } = this.props;
    const { location = {} } = sample.attrs;
    const { favouriteSite } = appModel.attrs;
    const hasLocation = !!location.name;

    return (
      <Main>
        <IonList lines="full">
          <MenuAttrItem
            routerLink={`${match.url}/sites`}
            disabled={isDisabled}
            value={favouriteSite}
            label="Site"
            icon={locationOutline}
            wrapText
          />

          <MenuAttrItem
            routerLink={`${match.url}/list`}
            disabled={isDisabled || !favouriteSite}
            value={location.name}
            label="Transect"
            icon={transectIcon}
            wrapText
          />

          <MenuAttrItem
            routerLink={`${match.url}/map`}
            disabled={isDisabled || !favouriteSite || !hasLocation}
            label="Map"
            icon={mapOutline}
            wrapText
          />
        </IonList>

        <IonButton id="add">
          <IonIcon icon={addCircleOutline} slot="start"  />
          <IonLabel>
            <T>Add Point</T>
          </IonLabel>
        </IonButton>
      </Main>
    );
  }
}

export default Component;
