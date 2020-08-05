import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonItem,
  IonItemGroup,
  IonLabel,
} from '@ionic/react';
import { Page, Main } from '@apps';
import { Trans as T } from 'react-i18next';
import { openOutline } from 'ionicons/icons';
import config from 'config';
import './styles.scss';
import './appLogo.png';
import './homePageBackground.jpg';

function index() {
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
          <IonItem className="pretty-button" detail routerLink="/info/about">
            <IonLabel>
              <T>About</T>
            </IonLabel>
          </IonItem>
          <IonItem className="pretty-button" detail routerLink="/info/manual">
            <IonLabel>
              <T>Citizen Science Manual</T>
            </IonLabel>
          </IonItem>
          <IonItem
            className="pretty-button"
            detail
            href={config.promotionalWebsiteUrl}
            detailIcon={openOutline}
          >
            <IonLabel>
              <T>Project Website</T>
            </IonLabel>
          </IonItem>
        </IonItemGroup>
      </Main>
    </Page>
  );
}

index.propTypes = {};

export default index;
