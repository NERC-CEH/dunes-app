import { observer } from 'mobx-react';
import React from 'react';
import locationHelp from 'common/helpers/location';
import { IonList } from '@ionic/react';
import { locateOutline } from 'ionicons/icons';
import { withTranslation, Trans as T } from 'react-i18next';
import { Main, MenuAttrItem, MenuNote, InfoButton, Section } from '@apps';
import LocationPhoto from 'Survey/common/Components/LocationPhoto';
import PhotoPicker from 'Components/PhotoPicker';
import PropTypes from 'prop-types';
import './styles.scss';

const { P } = Section;

@observer
class Component extends React.Component {
  static propTypes = {
    subSample: PropTypes.object.isRequired,
    isDisabled: PropTypes.bool,
    t: PropTypes.func.isRequired,
  };

  render() {
    const { subSample, isDisabled, t } = this.props;

    const [
      latitude,
      longitude,
    ] = subSample.attrs.location.centroid_sref.replace(/[N,W]/g, '').split(' ');
    const gridRef = locationHelp.locationToGrid({
      accurracy: 1,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });

    const prettyGridRef = locationHelp.prettyPrintGridRef(gridRef);

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

          <MenuNote skipTranslation>
            <T>Please add a photo below.</T>
            <InfoButton label={t('read more')} header="Adding photographs">
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

export default withTranslation()(Component);
