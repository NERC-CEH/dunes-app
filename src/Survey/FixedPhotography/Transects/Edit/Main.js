import { observer } from 'mobx-react';
import React from 'react';
import { IonList, IonItemDivider, IonItem } from '@ionic/react';
import { Trans as T } from 'react-i18next';
import { locationOutline, locateOutline } from 'ionicons/icons';
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
    baseURL: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
  };

  getPointsList = () => {
    const { sample, baseURL } = this.props;

    if (!sample.samples.length) {
      return (
        <IonItem className="empty">
          <span>
            <T>
              To see fixed points please select your site and transect first.
            </T>
          </span>
        </IonItem>
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
          routerLink={`${baseURL}/${cid}`}
          value={prettyGridRef}
          icon={locateOutline}
          label={`Point #${pointNo}`}
          className="survey-point-item"
        />
      );
    };
    const pointsList = sample.samples.map(getPointItem);

    return (
      <>
        <IonItemDivider>
          <T>Fixed points</T>
        </IonItemDivider>
        {pointsList}
      </>
    );
  };

  render() {
    const { sample, isDisabled, baseURL, appModel } = this.props;
    const { location = {} } = sample.attrs;
    const { favouriteSite } = appModel.attrs;

    return (
      <Main>
        <IonList lines="full">
          <MenuAttrItem
            routerLink={`${baseURL}/sites`}
            disabled={isDisabled}
            value={favouriteSite}
            label="Site"
            icon={locationOutline}
            wrapText
          />
          <MenuAttrItem
            routerLink={`${baseURL}/list`}
            disabled={isDisabled || !favouriteSite}
            value={location.name}
            label="Transect"
            icon="/images/transect.svg"
            wrapText
          />

          {this.getPointsList()}
        </IonList>
      </Main>
    );
  }
}

export default Component;
