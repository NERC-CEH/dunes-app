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
import './first.jpg';
import './second.jpg';

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
              <IonButton color="light" fill="solid" onClick={exit}>
                <T>Skip</T>
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <Main>
        <IonSlides
          pager
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
            <div className="slide-header">
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

            <div className="message">
              <h2>
                <T>Dunes are Exciting!</T>
              </h2>
              <p>
                <T>
                  Encompassing a beautiful mosaic of habitat types, coastal sand
                  dunes are home to amazing native wildlife including diverse
                  plant communities that support specialist sand dune animals.
                </T>
              </p>
            </div>
          </IonSlide>

          <IonSlide className="second">
            <div className="slide-header">
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

            <div className="message">
              <h2>
                <T>Dunes are Threatened.</T>
              </h2>
              <p>
                <T>
                  These habitats are suffering from biodiversity loss and
                  habitat change, but you can help us bring life back into the
                  dunes.
                </T>
              </p>

              <IonButton fill="clear" onClick={exit}>
                <T>Continue</T>
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
