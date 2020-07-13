import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import {
  IonList,
  IonButton,
  IonLabel,
  IonIcon,
  IonItemDivider,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
} from '@ionic/react';
import { Trans as T } from 'react-i18next';
import { Main, MenuAttrItem, actionSheet, InfoBackgroundMessage } from '@apps';
import {
  locationOutline,
  addCircleOutline,
  mapOutline,
  flagOutline,
  locateOutline,
} from 'ionicons/icons';
import transectIcon from 'common/images/transect.svg';

@observer
class Component extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
    appModel: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    addLocationPoint: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool,
  };

  deletePoint = () => {
    console.log('deleting');
  };

  getPointsList = () => {
    const { sample, match } = this.props;

    if (!sample.samples.length) {
      return (
        <InfoBackgroundMessage>
          You have not added any points yet.
        </InfoBackgroundMessage>
      );
    }

    const getPointItem = subSample => {
      const { cid } = subSample;

      const prettyGridRef = '';

      return (
        <IonItemSliding key={cid}>
          <MenuAttrItem
            key={cid}
            routerLink={`${match.url}/${cid}`}
            value={prettyGridRef}
            icon={locateOutline}
            label="Point"
            className="survey-point-item"
          />

          <IonItemOptions side="end">
            <IonItemOption
              color="danger"
              onClick={() => this.deletePoint(subSample)}
            >
              <T>Delete</T>
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
      );
    };

    const pointsList = sample.samples.map(getPointItem);

    return (
      <IonList lines="full">
        <IonItemDivider>
          <T>Recorded Points</T>
        </IonItemDivider>

        {pointsList}
      </IonList>
    );
  };

  showPointTypeOption = () => {
    const { addLocationPoint } = this.props;

    actionSheet({
      header: t('Choose point type'),
      buttons: [
        {
          text: t('Start'),
          icon: flagOutline,
          handler: () => addLocationPoint('start'),
        },
        {
          text: t('Survey Point'),
          icon: addCircleOutline,
          handler: () => addLocationPoint('point'),
        },
        {
          text: t('End'),
          icon: flagOutline,
          handler: () => addLocationPoint('end'),
        },
        {
          text: t('Cancel'),
          role: 'cancel',
        },
      ],
    });
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

        <IonButton id="add" onClick={this.showPointTypeOption}>
          <IonIcon icon={addCircleOutline} slot="start" />
          <IonLabel>
            <T>Add Point</T>
          </IonLabel>
        </IonButton>

        {this.getPointsList()}
      </Main>
    );
  }
}

export default Component;
