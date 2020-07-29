import React from 'react';
import PropTypes from 'prop-types';
import { IonFooter, IonList } from '@ionic/react';
import { Section, MenuNote, InfoButton } from '@apps';
import { Trans as T } from 'react-i18next';
import './styles.scss';

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
    <IonFooter id="info-footer" mode="md">
      <IonList lines="none" className="info-footer-list">
        <MenuNote skipTranslation>
          <T>You can find this survey information in our volunteer manual.</T>
          <InfoButton label="open survey manual" header={survey.label}>
            {manual}
          </InfoButton>
        </MenuNote>
      </IonList>
    </IonFooter>
  );
}

Footer.propTypes = {
  sample: PropTypes.object.isRequired,
};

export default Footer;
