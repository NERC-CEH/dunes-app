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
import { Trans as T } from 'react-i18next';
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
        <IonSlide
          key={id}
          class="habitat-profile-photo"
          style={{
            background: `url(/images/${image}.jpg)`,
          }}
          onClick={() => this.setState({ showGallery: 1 })}
        />
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
    const { habitat } = this.props;
    const { images } = habitat;
    const features = habitat.features.map(feature => (
      <li key={feature}>
        <T>{feature}</T>
      </li>
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
            <IonCardTitle>
              <T>{habitat.title}</T>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <h3 className="habitat-label">
              <T>Feature</T>
            </h3>
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
};

export default withIonLifeCycle(Component);
