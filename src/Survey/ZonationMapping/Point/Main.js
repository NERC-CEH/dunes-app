import React from 'react';
import PropTypes from 'prop-types';
import { IonList, IonItemDivider } from '@ionic/react';
import { Main, MenuAttrItemFromModel, MenuAttrItem } from '@apps';
import GridRefValue from 'Survey/common/Components/GridRefValue';
import PhotoPicker from 'Components/PhotoPicker';
import { Trans as T } from 'react-i18next';
import { locateOutline } from 'ionicons/icons';

class Component extends React.Component {
  static propTypes = {
    subSample: PropTypes.object.isRequired,
    isDisabled: PropTypes.bool,
  };

  getAttributesList = () => {
    const { subSample } = this.props;
    if (subSample.metadata.type !== 'transition') {
      return null;
    }

    return (
      <>
        <MenuAttrItemFromModel attr="previousHabitat" model={subSample} />
        <MenuAttrItemFromModel attr="currentHabitat" model={subSample} />
        <MenuAttrItemFromModel attr="distance" model={subSample} />
      </>
    );
  };

  render() {
    const { subSample, isDisabled } = this.props;
    const prettyGridRef = <GridRefValue sample={subSample} />;

    return (
      <Main>
        <IonList lines="full">
          <MenuAttrItem
            value={prettyGridRef}
            icon={locateOutline}
            label="Grid Ref"
            disabled
            skipValueTranslation
          />

          {this.getAttributesList()}

          <MenuAttrItemFromModel attr="comment" model={subSample} />

          <IonItemDivider>
            <T>Point Photo</T>
          </IonItemDivider>

          <PhotoPicker model={subSample} isDisabled={isDisabled} />
        </IonList>
      </Main>
    );
  }
}

export default Component;
