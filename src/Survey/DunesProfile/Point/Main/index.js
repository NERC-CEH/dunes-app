import React from 'react';
import PropTypes from 'prop-types';
import { IonList } from '@ionic/react';
import { Main, MenuAttrItemFromModel } from '@apps';
import PhotoPicker from 'Components/PhotoPicker';

class Component extends React.Component {
  static propTypes = {
    // subSample,
    // isDisabled,
  };

  render() {
    const { subSample, isDisabled } = this.props;

    return (
      <Main>
        <IonList lines="full">
          <MenuAttrItemFromModel attr="comment" model={subSample} />

          <PhotoPicker model={subSample} isDisabled={isDisabled} />
        </IonList>
      </Main>
    );
  }
}

export default Component;
