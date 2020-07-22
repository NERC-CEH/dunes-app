import { observer } from 'mobx-react';
import React from 'react';
import { IonList, IonItemDivider, IonLabel } from '@ionic/react';
import InfoBackgroundMessage from 'Components/InfoBackgroundMessage';
import { withTranslation, Trans as T } from 'react-i18next';
import { locationOutline, locateOutline, mapOutline } from 'ionicons/icons';
import { prettyPrintGridRef, locationToGrid, Main, MenuAttrItem } from '@apps';
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
    t: PropTypes.func.isRequired,
  };

  getPointsList = () => {
    const { sample, match, t } = this.props;
    if (!sample.samples.length) {
      return (
        <InfoBackgroundMessage>
          To see dipwells please select your site and transect first.
        </InfoBackgroundMessage>
      );
    }

    const getPointItem = (subSample, index) => {
      const { cid } = subSample;
      const { height } = subSample.attrs;

      const pointNo = `${index + 1}`;

      const [
        latitude,
        longitude,
      ] = subSample.attrs.location.centroid_sref
        .replace(/[N,W,E]/g, '')
        .split(' ');
      const gridRef = locationToGrid({
        accurracy: 1,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      });

      const waterDepth = typeof height === 'number' ? `${height} cm` : null;

      const prettyGridRef = prettyPrintGridRef(gridRef);

      const values = (
        <>
          <IonLabel position="stacked" mode="ios">
            <IonLabel>{prettyGridRef}</IonLabel>
            {waterDepth && (
              <IonLabel className="water-depth-value">{waterDepth}</IonLabel>
            )}
          </IonLabel>
        </>
      );

      const locationLabel = `${t('Dipwell')} #${pointNo}`;

      return (
        <MenuAttrItem
          key={cid}
          routerLink={`${match.url}/${cid}`}
          value={values}
          icon={locateOutline}
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
            skipValueTranslation
          />

          <MenuAttrItem
            routerLink={`${match.url}/list`}
            disabled={isDisabled || !favouriteSite}
            value={location.name}
            label="Transect"
            icon="/images/transect.svg"
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

          {this.getPointsList()}
        </IonList>
      </Main>
    );
  }
}

export default withTranslation()(Component);
