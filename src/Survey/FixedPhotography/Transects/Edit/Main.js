import { observer } from 'mobx-react';
import React from 'react';
import { IonList } from '@ionic/react';
import { locationOutline } from 'ionicons/icons';
import { Main, MenuAttrItem } from '@apps';
import PropTypes from 'prop-types';

@observer
class Component extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
    baseURL: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
  };

  render() {
    const { sample, isDisabled, baseURL } = this.props;
    const { location = {} } = sample.attrs;

    return (
      <Main>
        <IonList lines="full">
          <MenuAttrItem
            routerLink={`${baseURL}/list`}
            disabled={!isDisabled}
            value={location.name}
            label="Transect"
            icon={locationOutline}
          />
        </IonList>
      </Main>
    );
  }
}

export default Component;
