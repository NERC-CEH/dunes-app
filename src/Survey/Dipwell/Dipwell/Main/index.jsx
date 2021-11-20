import { observer } from 'mobx-react';
import React from 'react';
import {
  prettyPrintGridRef,
  Main,
  MenuAttrItem,
  MenuAttrItemFromModel,
} from '@apps';
import { IonList } from '@ionic/react';
import { locateOutline } from 'ionicons/icons';
import LocationPhoto from 'Survey/common/Components/LocationPhoto';
import LocationComment from 'Survey/common/Components/LocationComment';
import PhotoPicker from 'Components/PhotoPicker';
import PropTypes from 'prop-types';
import './styles.scss';

@observer
class Component extends React.Component {
  static propTypes = {
    subSample: PropTypes.object.isRequired,
    // baseURL: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
  };

  render() {
    const { subSample, isDisabled } = this.props;

    const { gridref } = subSample.attrs.location;
    const prettyGridRef = gridref ? prettyPrintGridRef(gridref) : '';

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
          <LocationComment location={subSample.attrs.location} />

          <MenuAttrItemFromModel attr="comment" model={subSample} />
          <MenuAttrItemFromModel attr="height" model={subSample} />

          <PhotoPicker model={subSample} isDisabled={isDisabled} />
        </IonList>
      </Main>
    );
  }
}

export default Component;
