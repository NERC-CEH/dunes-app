import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Trans as T } from 'react-i18next';
import { IonIcon, IonList, IonItem, IonLabel } from '@ionic/react';
import {
  arrowUndoOutline,
  shareSocialOutline,
  flagOutline,
} from 'ionicons/icons';
import languages from 'common/config/languages';
import { alert, Main, Toggle, MenuAttrItem, MenuNote } from '@apps';
import config from 'config';
import './styles.scss';

function resetDialog(resetApp) {
  alert({
    header: 'Reset',
    message: (
      <>
        <T>
          Are you sure you want to reset the application to its initial state?
        </T>
        <p>
          <b>
            <T>This will wipe all the locally stored app data!</T>
          </b>
        </p>
      </>
    ),
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'primary',
      },
      {
        text: 'Reset',
        cssClass: 'secondary',
        handler: resetApp,
      },
    ],
  });
}

@observer
class Component extends React.Component {
  static propTypes = {
    resetApp: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    sendAnalytics: PropTypes.bool.isRequired,
    language: PropTypes.string,
    t: PropTypes.func.isRequired,
  };

  render() {
    const { resetApp, onToggle, sendAnalytics, language, t } = this.props;

    return (
      <Main>
        <IonList lines="full">
          <MenuAttrItem
            routerLink="/settings/language"
            value={languages[language]}
            label="Language"
            icon={flagOutline}
          />
          <IonItem>
            <IonIcon icon={shareSocialOutline} size="small" slot="start" />
            <IonLabel>
              <T>Share App Analytics</T>
            </IonLabel>
            <Toggle
              onToggle={checked => onToggle('sendAnalytics', checked)}
              checked={sendAnalytics}
            />
          </IonItem>
          <MenuNote>
            Share app crash data so we can make the app more reliable.
          </MenuNote>

          <IonItem id="app-reset-btn" onClick={() => resetDialog(resetApp, t)}>
            <IonIcon icon={arrowUndoOutline} size="small" slot="start" />
            <T>Reset</T>
          </IonItem>
        </IonList>

        <p className="app-version">{`v${config.version} (${config.build})`}</p>
      </Main>
    );
  }
}

export default Component;
