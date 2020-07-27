import { observer } from 'mobx-react';
import React from 'react';
import {
  locationToGrid,
  prettyPrintGridRef,
  Main,
  MenuAttrItem,
  MenuNoteItem,
} from '@apps';
import { IonList, IonItemDivider } from '@ionic/react';
import { locateOutline, gridOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import PhotoPicker from 'Components/PhotoPicker';
import LocationPhoto from 'Survey/common/Components/LocationPhoto';
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
    isDisabled: PropTypes.bool,
  };

  getCoverItem = () => {
    const { subSample, baseURL } = this.props;

    const aggregateCoverValues = (agg, cover) => {
      const value = parseFloat(subSample.attrs[cover]);
      if (Number.isNaN(value)) {
        return agg;
      }

      return agg + value;
    };
    const coverValues = ['sand', 'moss', 'grass', 'herbs', 'shrubs', 'scrub'];
    const coverTotal = coverValues.reduce(aggregateCoverValues, 0);
    const coverLabel =
      typeof coverTotal === 'number' ? `${coverTotal} %` : null;
    const showCoverWarning = !!coverTotal && coverTotal < 100;

    return (
      <>
        <MenuAttrItem
          routerLink={`${baseURL}/cover`}
          value={coverLabel}
          label="Cover"
          icon={gridOutline}
          wrapText
          skipValueTranslation
        />

        {showCoverWarning && (
          <MenuNoteItem color="danger">
            Please check why the total cover is less than 100%. Remember to
            record bare ground/sand.
          </MenuNoteItem>
        )}
      </>
    );
  };

  render() {
    const { subSample, baseURL, isDisabled } = this.props;

    const [
      latitude,
      longitude,
    ] = subSample.attrs.location.centroid_sref.replace(/[N,W]/g, '').split(' ');

    const gridRef = locationToGrid({
      accurracy: 1,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });

    const prettyGridRef = prettyPrintGridRef(gridRef);
    const { habitat } = subSample.attrs.location;

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
        <LocationPhoto location={subSample.attrs.location} />

        <IonList lines="full">
          <MenuAttrItem
            value={prettyGridRef}
            icon={locateOutline}
            label="Grid Ref"
            disabled
            className="menu-attr-item-long-value"
            skipValueTranslation
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

          {this.getCoverItem()}

          <MenuAttrItem
            routerLink={`${baseURL}/height`}
            value={`${heightAverage} cm`}
            label="Height"
            icon={heightIcon}
            wrapText
            skipValueTranslation
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

          <PhotoPicker model={subSample} isDisabled={isDisabled} />
        </IonList>
      </Main>
    );
  }
}

export default Component;
