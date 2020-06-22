import { observer } from 'mobx-react';
import React from 'react';
import PropTypes from 'prop-types';
import { IonList } from '@ionic/react';
import { Main, MenuAttrItem } from '@apps';
import heightIcon from 'common/images/height.svg';

@observer
class Component extends React.Component {
  static propTypes = {
    subSample: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  render() {
    const { subSample, match } = this.props;

    const pointValues = subSample.attrs.height || [1, 3, 4, 2, 2, 3];

    const pointsMenuAttrItems = [0, 1, 2, 3, 4].map(pointID => (
      <MenuAttrItem
        key={pointID}
        routerLink={`${match.url}/height/${pointID}`}
        value={pointValues[pointID]}
        label={`#${pointID + 1} Point`}
        icon={heightIcon}
        wrapText
      />
    ));

    return (
      <Main>
        <IonList lines="full">{pointsMenuAttrItems}</IonList>
      </Main>
    );
  }
}

export default Component;
