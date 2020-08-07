import React from 'react';
import PropTypes from 'prop-types';
import { IonFooter, IonList } from '@ionic/react';
import { MenuNote, InfoButton } from '@apps';
import { Trans as T } from 'react-i18next';
import './styles.scss';

function Footer({ sample }) {
  const isDisabled = sample.isDisabled();
  if (isDisabled) {
    return null;
  }

  const survey = sample.getSurvey();

  return (
    <IonFooter id="info-footer" mode="md">
      <IonList lines="none" className="info-footer-list">
        <MenuNote skipTranslation>
          <T>You can find this survey information in our volunteer manual.</T>
          <InfoButton label="open survey manual" header={survey.label} modal>
            <survey.Manual />
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
