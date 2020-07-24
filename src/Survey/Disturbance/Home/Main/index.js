import { observer } from 'mobx-react';
import React from 'react';
import { Main, MenuAttrItem, MenuAttrItemFromModel, MenuNote } from '@apps';
import PropTypes from 'prop-types';
import { IonList } from '@ionic/react';
import { locationOutline } from 'ionicons/icons';
import GridRefValue from 'Survey/common/Components/GridRefValue';
import PhotoPicker from 'Components/PhotoPicker';

@observer
class Component extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    appModel: PropTypes.object.isRequired,
  };

  render() {
    const { sample, match, appModel } = this.props;
    const isDisabled = sample.isDisabled();
    const { favouriteSite } = appModel.attrs;

    const prettyGridRef = <GridRefValue sample={sample} />;

    return (
      <Main>
        <IonList lines="full">
          {isDisabled && (
            <MenuNote>
              This record has been uploaded and cannot be updated.
            </MenuNote>
          )}

          <MenuAttrItem
            routerLink={`${match.url}/sites`}
            disabled={isDisabled}
            value={favouriteSite}
            label="Site"
            icon={locationOutline}
            wrapText
            skipValueTranslation
          />

          <MenuAttrItem
            routerLink={`${match.url}/location`}
            value={prettyGridRef}
            icon={locationOutline}
            label="Location"
            skipValueTranslation
          />

          <MenuAttrItemFromModel attr="date" model={sample} />
          <MenuAttrItemFromModel attr="surveyors" model={sample} />
          <MenuAttrItemFromModel attr="disturbance" model={sample} />
          <MenuAttrItemFromModel attr="comment" model={sample} />

          <PhotoPicker model={sample} />
        </IonList>
      </Main>
    );
  }
}

export default Component;
