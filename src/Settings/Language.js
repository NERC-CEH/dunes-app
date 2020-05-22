import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { Page, Main, Header } from '@apps';
import {
  IonList,
  IonItem,
  IonRadioGroup,
  IonRadio,
  IonLabel,
} from '@ionic/react';
import languages from 'common/config/languages';

function SelectLanguage({ appModel, history }) {
  const currentValue = appModel.attrs.language;

  function onSelect(e) {
    appModel.attrs.language = e.target.value; // eslint-disable-line no-param-reassign
    appModel.save();
    history.goBack();
  }

  const alphabetically = ([, l1], [, l2]) => l1.localeCompare(l2);
  const languagesOptions = Object.entries(languages)
    .sort(alphabetically)
    .map(([value, language]) => (
      <IonItem key={value}>
        <IonLabel>{language}</IonLabel>
        <IonRadio value={value} />
      </IonItem>
    ));

  return (
    <Page id="language-select">
      <Header title="Language" />
      <Main>
        <IonList>
          <IonRadioGroup onIonChange={onSelect} value={currentValue}>
            {languagesOptions}
          </IonRadioGroup>
        </IonList>
      </Main>
    </Page>
  );
}

SelectLanguage.propTypes = {
  appModel: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default observer(withRouter(SelectLanguage));
