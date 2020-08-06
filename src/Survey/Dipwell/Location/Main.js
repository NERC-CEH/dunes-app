import { observer } from 'mobx-react';
import React from 'react';
import { IonList, IonItemDivider, IonLabel } from '@ionic/react';
import InfoBackgroundMessage from 'Components/InfoBackgroundMessage';
import { Trans as T } from 'react-i18next';
import { locationOutline, locateOutline, mapOutline } from 'ionicons/icons';
import { prettyPrintGridRef, Main, MenuAttrItem } from '@apps';
import PropTypes from 'prop-types';
import 'common/images/transect.svg';
import './styles.scss';

@observer
class Component extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
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

    const getPointItem = subSample => {
      const { cid } = subSample;
      const { height } = subSample.attrs;

      const { gridref } = subSample.attrs.location;
      const prettyGridRef = gridref ? prettyPrintGridRef(gridref) : '';

      const waterDepth = typeof height === 'number' ? `${height} cm` : null;

      const values = (
        <>
          <IonLabel position="stacked" mode="ios">
            <IonLabel>{prettyGridRef}</IonLabel>
            {waterDepth && (
              <IonLabel className="dipwell-values">{waterDepth}</IonLabel>
            )}
          </IonLabel>
        </>
      );

      const locationLabel = subSample.getPrettyName();

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
    const { sample, isDisabled, match } = this.props;
    const { location = {} } = sample.attrs;
    const site = sample.metadata.site || {};
    const hasLocation = !!location.name;

    return (
      <Main>
        <IonList lines="full">
          <MenuAttrItem
            routerLink={`${match.url}/sites`}
            disabled={isDisabled}
            value={site.name}
            label="Site"
            icon={locationOutline}
            wrapText
            skipValueTranslation
          />

          <MenuAttrItem
            routerLink={`${match.url}/list`}
            disabled={isDisabled || !site.name}
            value={location.name}
            label="Transect"
            icon="/images/transect.svg"
            wrapText
            skipValueTranslation
          />

          <MenuAttrItem
            routerLink={`${match.url}/map`}
            disabled={isDisabled || !site.name || !hasLocation}
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
