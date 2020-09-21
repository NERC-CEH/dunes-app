import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Page, Main } from '@apps';
import {
  IonIcon,
  IonList,
  IonItem,
  IonItemGroup,
  IonLabel,
} from '@ionic/react';
import { globeOutline } from 'ionicons/icons';
import languages from 'common/config/languages';
import './language-page-background.jpg';
import './styles.scss';

const LanguageSelect = observer(({ appModel }) => {
  function onSelect(language) {
    appModel.attrs.language = language; // eslint-disable-line no-param-reassign
    appModel.save();
  }

  const languagesOptions = Object.entries(languages).map(
    ([value, language]) => (
      <IonItem
        key={value}
        onClick={() => onSelect(value)}
        className="pretty-button-language"
        detail
      >
        <IonLabel>{language}</IonLabel>
      </IonItem>
    )
  );

  return (
    <Page id="language-select-required">
      <div className="header">
        <IonIcon icon={globeOutline} />
      </div>

      <Main>
        <IonList className="language-select-list">
          <IonItemGroup>{languagesOptions}</IonItemGroup>
        </IonList>
      </Main>
    </Page>
  );
});
LanguageSelect.propTypes = {
  appModel: PropTypes.object.isRequired,
};

export default LanguageSelect;
