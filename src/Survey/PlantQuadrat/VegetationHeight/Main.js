import { observer } from 'mobx-react';
import React from 'react';
import PropTypes from 'prop-types';
import { IonList } from '@ionic/react';
import { Main, MenuAttrItem } from '@apps';
import heightIcon from 'common/images/height.svg';
import { withTranslation } from 'react-i18next';

@observer
class Component extends React.Component {
  static propTypes = {
    subSample: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
  };

  render() {
    const { subSample, match, t } = this.props;

    const pointValues = subSample.attrs.height || [1, 3, 4, 2, 2, 3];

    const pointsMenuAttrItems = [0, 1, 2, 3, 4].map(pointID => {
      const locationLabel = `#${pointID + 1} ${t('Point')}`;

      return (
        <MenuAttrItem
          key={pointID}
          routerLink={`${match.url}/height/${pointID}`}
          value={pointValues[pointID]}
          label={locationLabel}
          icon={heightIcon}
          wrapText
          skipTranslation
        />
      );
    });

    return (
      <Main>
        <IonList lines="full">{pointsMenuAttrItems}</IonList>
      </Main>
    );
  }
}

export default withTranslation()(Component);
