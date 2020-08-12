import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Trans as T } from 'react-i18next';
import { IonIcon, IonList, IonItem, IonLabel } from '@ionic/react';
import {
  arrowUndoOutline,
  shareSocialOutline,
  flagOutline,
  trashBinOutline,
} from 'ionicons/icons';
import languages from 'common/config/languages';
import { alert, Main, Toggle, MenuAttrItem, MenuNote } from '@apps';

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

function humanFileSize(size) {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  // eslint-disable-next-line
  return `${(size / Math.pow(1024, i)).toFixed(2) * 1} ${
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  }`;
}

@observer
class Component extends React.Component {
  static propTypes = {
    resetApp: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    clearCache: PropTypes.func.isRequired,
    sendAnalytics: PropTypes.bool.isRequired,
    cache: PropTypes.number.isRequired,
    language: PropTypes.string,
  };

  render() {
    const {
      resetApp,
      onToggle,
      sendAnalytics,
      language,
      cache,
      clearCache,
    } = this.props;

    const cacheLabel = humanFileSize(cache);

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

          {!!cache && (
            <>
              <IonItem
                id="app-reset-btn"
                class="menu-attr-item"
                onClick={clearCache}
              >
                <IonIcon icon={trashBinOutline} size="small" slot="start" />

                <IonLabel>
                  <T>Clear Cache</T>
                </IonLabel>

                <IonLabel slot="end">{cacheLabel}</IonLabel>
              </IonItem>
              <MenuNote>
                This clears the locally cached location images.
              </MenuNote>
            </>
          )}

          <IonItem id="app-reset-btn" onClick={() => resetDialog(resetApp, t)}>
            <IonIcon icon={arrowUndoOutline} size="small" slot="start" />
            <T>Reset</T>
          </IonItem>
        </IonList>
      </Main>
    );
  }
}

export default Component;
