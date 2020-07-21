import { observer } from 'mobx-react';
import React from 'react';
import PropTypes from 'prop-types';
import { IonList } from '@ionic/react';
import { locationOutline } from 'ionicons/icons';
import {
  Main,
  MenuAttrItem,
  MenuAttrItemFromModel,
  MenuNote,
  InfoButton,
  Section,
} from '@apps';
import { Trans as T } from 'react-i18next';

const { P } = Section;

@observer
class Component extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  render() {
    const { sample, match } = this.props;
    const survey = sample.getSurvey();
    const isDisabled = sample.isDisabled();

    const transect = (sample.attrs.location || {}).name;

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
