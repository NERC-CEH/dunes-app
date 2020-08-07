import { observer } from 'mobx-react';
import React from 'react';
import PropTypes from 'prop-types';
import { IonList } from '@ionic/react';
import { Main, MenuAttrItemFromModel } from '@apps';

@observer
class Component extends React.Component {
  static propTypes = {
    subSample: PropTypes.object.isRequired,
  };

  render() {
    const { subSample } = this.props;

    return (
      <Main>
        <IonList lines="full">
          <MenuAttrItemFromModel attr="sand" model={subSample} />
          <MenuAttrItemFromModel attr="moss" model={subSample} />
          <MenuAttrItemFromModel attr="grass" model={subSample} />
          <MenuAttrItemFromModel attr="herbs" model={subSample} />
          <MenuAttrItemFromModel attr="shrubs" model={subSample} />
          <MenuAttrItemFromModel attr="scrub" model={subSample} />
        </IonList>
      </Main>
    );
  }
}

export default Component;
