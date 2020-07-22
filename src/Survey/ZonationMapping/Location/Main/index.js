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
import { withTranslation, Trans as T } from 'react-i18next';
import { Main, MenuAttrItem, actionSheet } from '@apps';
import {
  locationOutline,
  addCircleOutline,
  mapOutline,
  flagOutline,
} from 'ionicons/icons';
import GridRefValue from 'Survey/common/Components/GridRefValue';
import InfoBackgroundMessage from 'Components/InfoBackgroundMessage';
import transectIcon from 'common/images/transect.svg';
import habitatIcon from 'common/images/habitats.svg';
import './styles.scss';

@observer
class Component extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
    appModel: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    addLocationPoint: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool,
    t: PropTypes.func.isRequired,
  };

  deletePoint = subSample => {
    subSample.destroy();
  };

  getAddButton = () => {
    const { addLocationPoint, sample, t } = this.props;
    const recordedTypes = sample.samples.map(s => s.metadata.type);

    const buttons = [];

    if (!recordedTypes.includes('start')) {
      buttons.unshift({
        text: t('Start'),
        icon: flagOutline,
        handler: () => addLocationPoint('start'),
      });
    }

    if (recordedTypes.includes('start')) {
      buttons.push({
        text: t('Transition'),
        icon: addCircleOutline,
        handler: () => addLocationPoint('transition'),
      });
    }

    if (recordedTypes.includes('start') && !recordedTypes.includes('end')) {
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

  getPointsList = () => {
    const { sample } = this.props;

    if (!sample.samples.length) {
      return (
        <InfoBackgroundMessage>
          You have not added any points yet.
        </InfoBackgroundMessage>
      );
    }

    const pointsList = sample.samples.map(this.getPoint);

    return (
      <>
        <IonItemDivider>
          <T>Recorded Points</T>
        </IonItemDivider>

        {pointsList}
      </>
    );
  };

  getPoint = subSample => {
    const { match } = this.props;

    const { cid } = subSample;
    const { type } = subSample.metadata;

    const prettyGridRef = <GridRefValue sample={subSample} />;

    const icon = type === 'transition' ? habitatIcon : flagOutline;
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
          skipValueTranslation
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
            skipValueTranslation
          />

          <MenuAttrItem
            routerLink={`${match.url}/list`}
            disabled={isDisabled || !favouriteSite}
            value={location.name}
            label="Transect"
            icon={transectIcon}
            wrapText
            skipValueTranslation
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

export default withTranslation()(Component);
