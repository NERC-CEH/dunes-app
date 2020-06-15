import { observer } from 'mobx-react';
import React from 'react';
import { IonList } from '@ionic/react';
import { locationOutline } from 'ionicons/icons';
import { Main, MenuAttrItem, MenuAttrItemFromModel } from '@apps';
import PropTypes from 'prop-types';

@observer
class Component extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  render() {
    const { sample, match } = this.props;

    const transect = (sample.attrs.location || {}).name;

    return (
      <Main>
        <IonList lines="full">
          <MenuAttrItemFromModel attr="surveyors" model={sample} />
          <MenuAttrItemFromModel attr="date" model={sample} />
          <MenuAttrItemFromModel attr="comment" model={sample} />

          <MenuAttrItem
            routerLink={`${match.url}/transects`}
            value={transect}
            label="Location"
            icon={locationOutline}
            wrapText
          />
        </IonList>
      </Main>
    );
  }
}

export default Component;
