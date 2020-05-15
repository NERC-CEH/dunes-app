import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import {
  IonSlides,
  IonSlide,
  IonButton,
  IonHeader,
  IonToolbar,
  IonButtons,
} from '@ionic/react';
import { Page, Main } from '@apps';
import Log from 'helpers/log';
import { Trans as T } from 'react-i18next';
import './styles.scss';

const SplashScreen = ({ appModel }) => {
  function exit() {
    Log('Info:Welcome:Controller: exit.');
    // eslint-disable-next-line no-param-reassign
    appModel.attrs.showedWelcome = true;
    appModel.save();
  }

  return (
    <Page id="welcome-page">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton color="dark" onClick={exit}>
              <T>Skip</T>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <Main>
        <IonSlides
          id="welcome-slides"
          pager="true"
          onIonSlidesDidLoad={e => {
            // TODO: remove once bug is fixed
            // https://github.com/ionic-team/ionic/issues/19641
            // https://github.com/ionic-team/ionic/issues/19638
            e.target.update();
          }}
        >
          <IonSlide className="first">
            <div className="message">
              <h2>
                <T>Dunes are exciting!</T>
              </h2>
              <p>
                <T>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer ante dolor, semper a nisi nec, faucibus ullamcorper
                  tellus. Quisque suscipit urna et fermentum elementum.
                </T>
              </p>
            </div>
          </IonSlide>
          <IonSlide className="second">
            <div className="message">
              <h2>
                <T>Dunes are threatened.</T>
              </h2>
              <p>
                <T>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer ante dolor, semper a nisi nec, faucibus ullamcorper
                  tellus. Quisque suscipit urna et fermentum elementum.
                </T>
              </p>
            </div>
          </IonSlide>
        </IonSlides>
      </Main>
    </Page>
  );
};
SplashScreen.propTypes = {
  appModel: PropTypes.object.isRequired,
};

const Component = observer(({ appModel, children }) => {
  const { showedWelcome } = appModel.attrs;

  if (!showedWelcome) {
    return <SplashScreen appModel={appModel} />;
  }

  return children;
});
Component.propTypes = {
  appModel: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Component;
