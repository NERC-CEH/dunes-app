import { observer } from 'mobx-react';
import React from 'react';
import {
  Main,
  MenuAttrItem,
  MenuAttrItemFromModel,
  MenuNote,
  InfoButton,
  Section,
} from '@apps';
import PropTypes from 'prop-types';
import { IonList } from '@ionic/react';
import { locationOutline } from 'ionicons/icons';
import GridRefValue from 'Survey/common/Components/GridRefValue';
import PhotoPicker from 'Components/PhotoPicker';
import { Trans as T } from 'react-i18next';

const { P } = Section;

@observer
class Component extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    appModel: PropTypes.object.isRequired,
  };

  render() {
    const { sample, match, appModel } = this.props;
    const survey = sample.getSurvey();
    const isDisabled = sample.isDisabled();
    const { favouriteSite } = appModel.attrs;

    const prettyGridRef = <GridRefValue sample={sample} />;

    let manual = (
      <Section>
        <P>
          <i>TODO:</i> this is work in progress.
        </P>
      </Section>
    );
    if (survey.Manual) {
      manual = <survey.Manual />;
    }

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
          <MenuAttrItemFromModel attr="type" model={sample} />
          <MenuAttrItemFromModel attr="comment" model={sample} />

          <PhotoPicker model={sample} />

          {!isDisabled && (
            <MenuNote skipTranslation>
              <T>
                You can find this survey information in our volunteer manual.
              </T>
              <InfoButton label="open survey manual" header={survey.label}>
                {manual}
              </InfoButton>
            </MenuNote>
          )}
        </IonList>
      </Main>
    );
  }
}

export default Component;
