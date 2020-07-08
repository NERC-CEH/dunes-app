import { observer } from 'mobx-react';
import React from 'react';
import { IonList, IonItemDivider } from '@ionic/react';
import InfoBackgroundMessage from 'Components/InfoBackgroundMessage';
import { Trans as T } from 'react-i18next';
import { locationOutline, locateOutline, mapOutline } from 'ionicons/icons';
import locationHelp from 'common/helpers/location';
import { Main, MenuAttrItem } from '@apps';
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
          To see dipwells please select your site and transect first.
        </InfoBackgroundMessage>
      );
    }

    const getPointItem = (subSample, index) => {
      const { cid } = subSample;
      const pointNo = `${index + 1}`;

      const [
        latitude,
        longitude,
      ] = subSample.attrs.location.centroid_sref
        .replace(/[N,W,E]/g, '')
        .split(' ');
      const gridRef = locationHelp.locationToGrid({
        accurracy: 1,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      });

      const prettyGridRef = locationHelp.prettyPrintGridRef(gridRef);

      return (
        <MenuAttrItem
          key={cid}
          routerLink={`${match.url}/${cid}`}
          value={prettyGridRef}
          icon={locateOutline}
          label={`Dipwell #${pointNo}`}
          className="survey-point-item"
        />
      );
    };

    const pointsList = sample.samples.map(getPointItem);

    return (
      <>
        <IonItemDivider>
          <T>Dipwells</T>
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
            icon="/images/transect.svg"
            wrapText
          />

          <MenuAttrItem
            routerLink={`${match.url}/map`}
            disabled={isDisabled || !favouriteSite || !hasLocation}
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
