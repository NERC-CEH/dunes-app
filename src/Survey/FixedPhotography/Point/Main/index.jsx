import { observer } from 'mobx-react';
import React from 'react';
import {
  prettyPrintGridRef,
  Main,
  MenuAttrItem,
  MenuNote,
  InfoButton,
  Section,
} from '@apps';
import { IonList } from '@ionic/react';
import { locateOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import LocationPhoto from 'Survey/common/Components/LocationPhoto';
import LocationComment from 'Survey/common/Components/LocationComment';
import PhotoPicker from 'Components/PhotoPicker';
import PropTypes from 'prop-types';
import './styles.scss';

const { P } = Section;

@observer
class Component extends React.Component {
  static propTypes = {
    subSample: PropTypes.object.isRequired,
    isDisabled: PropTypes.bool,
  };

  render() {
    const { subSample, isDisabled } = this.props;

    const { gridref } = subSample.attrs.location;
    const prettyGridRef = gridref ? prettyPrintGridRef(gridref) : '';

    return (
      <Main>
        <LocationPhoto location={subSample.attrs.location} />

        <IonList lines="full">
          <MenuAttrItem
            value={prettyGridRef}
            icon={locateOutline}
            label="Grid Ref"
            disabled
            className="menu-attr-item-long-value"
            skipValueTranslation
          />
          <LocationComment location={subSample.attrs.location} />

          <MenuNote skipTranslation>
            <T>Please add a photo below.</T>
            <InfoButton label="read more" header="Adding photographs">
              <Section>
                <P>
                  Each photograph should be taken in the direction of the
                  bearing of the transect i.e. pointing inland towards your next
                  photography point.
                </P>
                <P>Take the photograph at eye level.</P>
              </Section>
            </InfoButton>
          </MenuNote>

          <PhotoPicker model={subSample} isDisabled={isDisabled} />
        </IonList>
      </Main>
    );
  }
}

export default Component;
