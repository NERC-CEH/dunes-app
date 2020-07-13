import React from 'react';
import PropTypes from 'prop-types';
import { IonList } from '@ionic/react';
import { Main, MenuAttrItemFromModel } from '@apps';
import PhotoPicker from 'Components/PhotoPicker';

class Component extends React.Component {
  static propTypes = {
    subSample: PropTypes.object.isRequired,
    isDisabled: PropTypes.bool,
  };

  getAttributesList = () => {
    const { subSample } = this.props;
    if (subSample.metadata.type === 'start') {
      return null;
    }

    return (
      <>
        <MenuAttrItemFromModel attr="type" model={subSample} />
        <MenuAttrItemFromModel attr="angle" model={subSample} />
        <MenuAttrItemFromModel attr="distance" model={subSample} />
      </>
    );
  };

  render() {
    const { subSample, isDisabled } = this.props;

    return (
      <Main>
        <IonList lines="full">
          <MenuAttrItemFromModel attr="comment" model={subSample} />

          {this.getAttributesList()}

          <PhotoPicker model={subSample} isDisabled={isDisabled} />
        </IonList>
      </Main>
    );
  }
}

export default Component;
