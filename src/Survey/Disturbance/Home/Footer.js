import React from 'react';
import PropTypes from 'prop-types';
import { IonFooter } from '@ionic/react';
import { Section, MenuNote, InfoButton } from '@apps';
import { Trans as T } from 'react-i18next';

const { P } = Section;

function Footer({ sample }) {
  const isDisabled = sample.isDisabled();
  if (isDisabled) {
    return null;
  }

  const survey = sample.getSurvey();

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
    <IonFooter id="info-footer">
      <MenuNote skipTranslation>
        <T>You can find this survey information in our volunteer manual.</T>
        <InfoButton label="open survey manual" header={survey.label}>
          {manual}
        </InfoButton>
      </MenuNote>
    </IonFooter>
  );
}

Footer.propTypes = {
  sample: PropTypes.object.isRequired,
};

export default Footer;
