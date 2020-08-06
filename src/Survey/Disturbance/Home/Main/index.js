import { observer } from 'mobx-react';
import React from 'react';
import { Main, MenuAttrItem, MenuAttrItemFromModel, MenuNote } from '@apps';
import PropTypes from 'prop-types';
import { IonList } from '@ionic/react';
import { locationOutline } from 'ionicons/icons';
import i18n from 'i18next';
import GridRefValue from 'Survey/common/Components/GridRefValue';
import PhotoPicker from 'Components/PhotoPicker';
import disturbanceIcon from './disturbanceIcon.svg';

@observer
class Component extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  render() {
    const { sample, match } = this.props;
    const isDisabled = sample.isDisabled();
    const site = sample.metadata.site || {};
    const { disturbance } = sample.attrs;

    let disturbanceValue;

    if (disturbance) {
      disturbanceValue =
        disturbance.length > 1 ? disturbance.length : i18n.t(disturbance);
    }

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
            value={site.name}
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

          <MenuAttrItem
            routerLink={`${match.url}/disturbance`}
            value={disturbanceValue}
            icon={disturbanceIcon}
            label="Disturbance"
            skipValueTranslation
            wrapText
          />

          <MenuAttrItemFromModel attr="comment" model={sample} />

          <PhotoPicker model={sample} />
        </IonList>
      </Main>
    );
  }
}

export default Component;
