import { observer } from 'mobx-react';
import React from 'react';
import {
  IonList,
  IonItemDivider,
  IonItem,
  IonLabel,
  IonIcon,
} from '@ionic/react';
import { Trans as T } from 'react-i18next';
import { locationOutline, locateOutline } from 'ionicons/icons';
import { Main, MenuAttrItem } from '@apps';
import PropTypes from 'prop-types';

@observer
class Component extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
    baseURL: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
  };

  render() {
    const { sample, isDisabled, baseURL } = this.props;
    const { location = {} } = sample.attrs;

    const getPointItem = (subSample, index) => {
      const { cid } = subSample;
      const pointNo = `${index + 1}`;

      return (
        <IonItem key={cid}>
          <IonIcon slot="start" icon={locateOutline} />
          <IonLabel>
            <T>Point</T> #{pointNo}
          </IonLabel>
        </IonItem>
      );
    };
    const pointsList = sample.samples.map(getPointItem);

    return (
      <Main>
        <IonList lines="full">
          <MenuAttrItem
            routerLink={`${baseURL}/list`}
            disabled={isDisabled}
            value={location.name}
            label="Transect"
            icon={locationOutline}
          />
          <IonItemDivider>
            <T>Fixed points</T>
          </IonItemDivider>
          {pointsList}
        </IonList>
      </Main>
    );
  }
}

export default Component;
