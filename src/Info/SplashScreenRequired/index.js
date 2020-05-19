import React, { useRef, useState } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import {
  IonSlides,
  IonSlide,
  IonButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonIcon,
} from '@ionic/react';
import { arrowForward } from 'ionicons/icons';
import { Page, Main } from '@apps';
import Log from 'helpers/log';
import { Trans as T } from 'react-i18next';
import './styles.scss';

const SplashScreen = ({ appModel }) => {
  const [showSkip, setShowSkip] = useState(true);

  function exit() {
    Log('Info:Welcome:Controller: exit.');
    // eslint-disable-next-line no-param-reassign
    appModel.attrs.showedWelcome = true;
    appModel.save();
  }
  const slideRef = useRef(null);

  const handleSlideChangeStart = async () => {
    const isEnd = await slideRef.current.isEnd();
    setShowSkip(!isEnd);
  };

  return (
    <Page id="welcome-page">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="end">
            {showSkip && (
              <IonButton color="dark" onClick={exit}>
                <T>Skip</T>
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <Main>
        <IonSlides
          pager="true"
          ref={slideRef}
          onIonSlideWillChange={handleSlideChangeStart}
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
                <T>Dunes are full of biodiversity.</T>
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
          <IonSlide className="third">
            <div className="message">
              <h2>
                <T>They are threatened.</T>
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
          <IonSlide className="fourth">
            <div className="message">
              <h2>
                <T>Dunes need your help to collect data.</T>
              </h2>
              <p>
                <T>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer ante dolor, semper a nisi nec, faucibus ullamcorper
                  tellus. Quisque suscipit urna et fermentum elementum.
                </T>
              </p>

              <IonButton fill="clear" onClick={exit}>
                Continue
                <IonIcon slot="end" icon={arrowForward} />
              </IonButton>
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
