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

  deletePoint = subSample => {
    subSample.destroy();
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
      const { type } = subSample.metadata;

      const prettyGridRef = '';

      const icon = type === 'point' ? locateOutline : flagOutline;
      const label = type;

      return (
        <IonItemSliding key={cid}>
          <MenuAttrItem
            key={cid}
            routerLink={`${match.url}/${cid}`}
            value={prettyGridRef}
            icon={icon}
            label={label}
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
      <>
        <IonItemDivider>
          <T>Recorded Points</T>
        </IonItemDivider>

        {pointsList}
      </>
    );
  };

  getAddButton = () => {
    const { addLocationPoint, sample } = this.props;
    const recordedTypes = sample.samples.map(s => s.metadata.type);

    const buttons = [
      {
        text: t('Survey Point'),
        icon: addCircleOutline,
        handler: () => addLocationPoint('point'),
      },
    ];

    if (!recordedTypes.includes('start')) {
      buttons.unshift({
        text: t('Start'),
        icon: flagOutline,
        handler: () => addLocationPoint('start'),
      });
    }

    if (!recordedTypes.includes('end')) {
      buttons.push({
        text: t('End'),
        icon: flagOutline,
        handler: () => addLocationPoint('end'),
      });
    }

    const showPointTypeOption = () => {
      actionSheet({
        header: t('Choose point type'),
        buttons: [
          ...buttons,
          {
            text: t('Cancel'),
            role: 'cancel',
          },
        ],
      });
    };

    return (
      <IonButton id="add" onClick={showPointTypeOption}>
        <IonIcon icon={addCircleOutline} slot="start" />
        <IonLabel>
          <T>Add Point</T>
        </IonLabel>
      </IonButton>
    );
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

          {this.getAddButton()}

          {this.getPointsList()}
        </IonList>
      </Main>
    );
  }
}

export default Component;
