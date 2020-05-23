import React from 'react';
import {
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonIcon,
  IonSlides,
  IonSlide,
  withIonLifeCycle,
} from '@ionic/react';
import { searchCircleOutline } from 'ionicons/icons';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Main, Gallery } from '@apps';
import './styles.scss';

class Component extends React.Component {
  state = {
    showGallery: false,
  };

  getGallery = () => {
    const { habitat } = this.props;
    const { showGallery } = this.state;

    const items = habitat.images.map(image => {
      return {
        src: `/images/${image.image}.jpg`,
        w: image.image_width || 800,
        h: image.image_height || 800,
        title: `© ${image.image_copyright}`,
      };
    });

    return (
      <Gallery
        isOpen={!!showGallery}
        items={items}
        options={{
          index: showGallery - 1,
          shareEl: false,
          fullscreenEl: false,
          history: false,
        }}
        onClose={() => this.setState({ showGallery: false })}
      />
    );
  };

  slides = images => {
    const slideOpts = {
      initialSlide: 0,
      speed: 400,
    };
    const slideImage = images.map(item => {
      const { image, id } = item; // temporally added id, no unique variable
      /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
      return (
        <IonSlide key={id}>
          <img
            src={`/images/${image}.jpg`}
            alt="habitat"
            onClick={() => this.setState({ showGallery: 1 })}
          />
        </IonSlide>
      );
    });
    /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */

    return (
      <IonSlides
        pager
        options={slideOpts}
        onIonSlidesDidLoad={e => {
          // TODO: remove once bug is fixed
          // https://github.com/ionic-team/ionic/issues/19641
          // https://github.com/ionic-team/ionic/issues/19638
          e.target.update();
        }}
      >
        {slideImage}
      </IonSlides>
    );
  };

  render() {
    const { t } = this.props;
    const { habitat } = this.props;
    const { images } = habitat;
    const features = habitat.features.map(feature => (
      <li key={feature}>{feature}</li>
    ));

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <>
        {this.getGallery()}

        <Main id="habitat-profile" class="ion-padding">
          <div onClick={() => this.setState({ showGallery: 1 })}>
            <IonIcon
              class="habitat-profile-icon-shadow"
              size="large"
              icon={searchCircleOutline}
            />

            <IonIcon
              class="habitat-profile-icon"
              size="large"
              icon={searchCircleOutline}
            />
          </div>

          {this.slides(images)}

          <IonCardHeader>
            <IonCardTitle>{t(habitat.title)}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <h3 className="habitat-label">{t('Feature')}</h3>
            <ul>{features}</ul>
          </IonCardContent>
        </Main>
      </>
    );
  }
  /* eslint-enable jsx-a11y/no-static-element-interactions */
}

Component.propTypes = {
  habitat: PropTypes.object.isRequired,
  t: PropTypes.func,
};

export default withTranslation()(withIonLifeCycle(Component));
