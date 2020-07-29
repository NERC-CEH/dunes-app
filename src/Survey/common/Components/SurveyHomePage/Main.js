import { observer } from 'mobx-react';
import React from 'react';
import PropTypes from 'prop-types';
import { IonList } from '@ionic/react';
import { locationOutline } from 'ionicons/icons';
import { Main, MenuAttrItem, MenuAttrItemFromModel, MenuNote } from '@apps';

@observer
class Component extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  render() {
    const { sample, match } = this.props;
    const isDisabled = sample.isDisabled();

    const transect = (sample.attrs.location || {}).name;

    return (
      <Main>
        <IonList lines="full">
          {isDisabled && (
            <MenuNote>
              This record has been uploaded and cannot be updated.
            </MenuNote>
          )}

          <MenuAttrItemFromModel attr="surveyors" model={sample} />
          <MenuAttrItemFromModel attr="date" model={sample} />
          <MenuAttrItemFromModel attr="comment" model={sample} />

          <MenuAttrItem
            routerLink={`${match.url}/location`}
            value={transect}
            label="Location"
            icon={locationOutline}
            wrapText
            skipValueTranslation
          />
        </IonList>
      </Main>
    );
  }
}

export default Component;
