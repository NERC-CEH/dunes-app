import { observer } from 'mobx-react';
import React from 'react';
import { IonList, IonItemDivider } from '@ionic/react';
import { Trans as T } from 'react-i18next';
import {
  locationOutline,
  gridOutline,
  squareOutline,
  mapOutline,
} from 'ionicons/icons';
import { prettyPrintGridRef, Main, MenuAttrItem } from '@apps';
import InfoBackgroundMessage from 'Components/InfoBackgroundMessage';
import PropTypes from 'prop-types';
import 'common/images/transect.svg';
import './styles.scss';

@observer
class Component extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
    appModel: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    isDisabled: PropTypes.bool,
  };

  getPointsList = () => {
    const { sample, match } = this.props;
    if (!sample.samples.length) {
      return (
        <InfoBackgroundMessage>
          To see quadrats please select your site and transect first.
        </InfoBackgroundMessage>
      );
    }

    const getPointItem = subSample => {
      const { cid } = subSample;

      const { gridref } = subSample.attrs.location;
      const prettyGridRef = gridref ? prettyPrintGridRef(gridref) : '';

      const locationLabel = subSample.getPrettyName();

      return (
        <MenuAttrItem
          key={cid}
          routerLink={`${match.url}/${cid}`}
          value={prettyGridRef}
          icon={squareOutline}
          label={locationLabel}
          className="survey-point-item"
          skipTranslation
        />
      );
    };

    const pointsList = sample.samples.map(getPointItem);

    return (
      <>
        <IonItemDivider>
          <T>Quadrats</T>
        </IonItemDivider>
        {pointsList}
      </>
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
            value={favouriteSite.name}
            label="Site"
            icon={locationOutline}
            wrapText
            skipValueTranslation
          />

          <MenuAttrItem
            routerLink={`${match.url}/list`}
            disabled={isDisabled || !favouriteSite.name}
            value={location.name}
            label="Quadrat group"
            icon={gridOutline}
            wrapText
            skipValueTranslation
          />

          <MenuAttrItem
            routerLink={`${match.url}/map`}
            disabled={isDisabled || !favouriteSite.name || !hasLocation}
            label="Map"
            icon={mapOutline}
            wrapText
          />

          {this.getPointsList()}
        </IonList>
      </Main>
    );
  }
}

export default Component;
