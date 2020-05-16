import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Trans as T, withTranslation } from 'react-i18next';
import { IonIcon, IonList, IonItem, IonLabel, IonNote } from '@ionic/react';
import { arrowUndoOutline, shareSocialOutline } from 'ionicons/icons';
import alert from 'common/helpers/alert';
import { Main, Toggle } from '@apps';
import config from 'config';
import './styles.scss';

function resetDialog(resetApp, t) {
  alert({
    header: t('Reset'),
    message: `${t(
      'Are you sure you want to reset the application to its initial state?'
    )}<p><b>${t('This will wipe all the locally stored app data!')}</b></p>`,
    buttons: [
      {
        text: t('Cancel'),
        role: 'cancel',
        cssClass: 'primary',
      },
      {
        text: t('Reset'),
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
    t: PropTypes.func.isRequired,
  };

  render() {
    const { resetApp, onToggle, sendAnalytics, t } = this.props;

    return (
      <Main>
        <IonList lines="full">
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
          <IonItem>
            <IonLabel class="ion-text-wrap">
              <IonNote color="primary">
                <T>
                  Share app crash data so we can make the app more reliable.
                </T>
              </IonNote>
            </IonLabel>
          </IonItem>

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

export default withTranslation()(Component);
