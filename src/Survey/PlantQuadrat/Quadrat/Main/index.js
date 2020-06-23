import { observer } from 'mobx-react';
import React from 'react';
import locationHelp from 'common/helpers/location';
import { IonList, IonItemDivider } from '@ionic/react';
import { locateOutline, gridOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { Main, MenuAttrItem } from '@apps';
import PhotoPicker from 'Components/PhotoPicker';
import PropTypes from 'prop-types';
import './styles.scss';
import habitatIcon from 'common/images/habitats.svg';
import heightIcon from 'common/images/height.svg';
import flowerIcon from 'common/images/flower.svg';

@observer
class Component extends React.Component {
  static propTypes = {
    subSample: PropTypes.object.isRequired,
    baseURL: PropTypes.string.isRequired,
    // isDisabled: PropTypes.bool,
  };

  render() {
    const { subSample, baseURL } = this.props;

    const [
      latitude,
      longitude,
    ] = subSample.attrs.location.centroid_sref.replace(/[N,W]/g, '').split(' ');

    const gridRef = locationHelp.locationToGrid({
      accurracy: 1,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });

    const prettyGridRef = locationHelp.prettyPrintGridRef(gridRef);
    const { habitat } = subSample.attrs.location;

    const aggregateCoverValues = (agg, cover) => {
      const value = parseFloat(subSample.attrs[cover]);
      if (Number.isNaN(value)) {
        return agg;
      }
      return agg + value;
    };
    const coverValues = ['sand', 'moss', 'grass', 'herbs', 'shrubs', 'scrub'];
    const coverTotal = coverValues.reduce(aggregateCoverValues, 0);

    let heightAverage = 0;
    if (subSample.attrs.height.length) {
      const totalHeight = subSample.attrs.height.reduce(
        (total, height) => total + height,
        0
      );
      heightAverage = totalHeight / subSample.attrs.height.length;
    }

    return (
      <Main>
        <IonList lines="full">
          <MenuAttrItem
            value={prettyGridRef}
            icon={locateOutline}
            label="Grid Ref"
            disabled
            className="menu-attr-item-long-value"
          />
          <MenuAttrItem
            value={habitat}
            icon={habitatIcon}
            label="Habitat"
            disabled
            className="menu-attr-item-long-value"
          />

          <IonItemDivider>
            <T>Vegetation</T>
          </IonItemDivider>

          <MenuAttrItem
            routerLink={`${baseURL}/cover`}
            value={`${coverTotal}%`}
            label="Cover"
            icon={gridOutline}
            wrapText
          />

          <MenuAttrItem
            routerLink={`${baseURL}/height`}
            value={`${heightAverage}cm`}
            label="Heigth"
            icon={heightIcon}
            wrapText
          />

          <IonItemDivider>
            <T>Indicator Species</T>
          </IonItemDivider>

          <MenuAttrItem
            routerLink={`${baseURL}/species/health`}
            label="Health"
            icon={flowerIcon}
            wrapText
          />

          <MenuAttrItem
            routerLink={`${baseURL}/species/nitrogen`}
            label="Nitrogen"
            icon={flowerIcon}
            wrapText
          />

          <IonItemDivider>
            <T>Quadrat Photo</T>
          </IonItemDivider>

          <PhotoPicker model={subSample} />
        </IonList>
      </Main>
    );
  }
}

export default Component;
