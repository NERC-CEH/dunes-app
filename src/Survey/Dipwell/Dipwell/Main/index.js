import { observer } from 'mobx-react';
import React from 'react';
import locationHelp from 'common/helpers/location';
import { IonList } from '@ionic/react';
import { locateOutline } from 'ionicons/icons';
import { Main, MenuAttrItem, MenuAttrItemFromModel } from '@apps';
import PhotoPicker from 'Components/PhotoPicker';
import PropTypes from 'prop-types';
import './styles.scss';

@observer
class Component extends React.Component {
  static propTypes = {
    subSample: PropTypes.object.isRequired,
    // baseURL: PropTypes.string.isRequired,
    // isDisabled: PropTypes.bool,
  };

  render() {
    const { subSample } = this.props;

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

          <MenuAttrItemFromModel attr="comment" model={subSample} />
          <MenuAttrItemFromModel attr="height" model={subSample} />

          <PhotoPicker model={subSample} />
        </IonList>
      </Main>
    );
  }
}

export default Component;
