import React from 'react';
import appModel from 'appModel';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonIcon,
} from '@ionic/react';
import { Page, Main } from '@apps';
import { Trans as T } from 'react-i18next';
import { add } from 'ionicons/icons';
import './styles.scss';
import './appLogo.png';
import './homePageBackground.jpg';

function index() {
  const { name } = appModel.attrs.favouriteSite;

  const sitesCustomClass = !name
    ? 'pretty-button-empty '
    : 'pretty-button-selected';

  const siteTitle = !name ? (
    <T>None selected</T>
  ) : (
    appModel.attrs.favouriteSite.name
  );

  return (
    <Page id="home-info">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <Main>
        <div className="slide-header">
          <div className="app-home-background">
            <img src="/images/homePageBackground.jpg" alt="" />
          </div>

          <div className="custom-shape-divider-bottom-1593438501">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="shape-fill"
              />
            </svg>
          </div>
        </div>

        <img className="app-logo" src="/images/appLogo.png" alt="" />

        <IonItemGroup>
          <IonItem className="pretty-button" detail routerLink="/info/manual">
            <IonLabel>
              <T>Activities you can do</T>
            </IonLabel>
          </IonItem>

          <IonItem
            className={sitesCustomClass}
            detail
            routerLink="/settings/sites"
          >
            <IonLabel>
              <T>Survey site</T>: {siteTitle}
            </IonLabel>
          </IonItem>

          <IonItem lines="none" className="info-text">
            <IonLabel class="ion-text-wrap">
              <T>
                Press the
                <IonIcon icon={add} /> button to start your survey
              </T>
            </IonLabel>
          </IonItem>
        </IonItemGroup>
      </Main>
    </Page>
  );
}

index.propTypes = {};

export default index;
