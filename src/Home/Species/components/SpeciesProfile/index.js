import React from 'react';
import {
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonIcon,
  IonSlides,
  IonSlide,
  withIonLifeCycle,
  IonCardSubtitle,
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
    const { species } = this.props;
    const { showGallery } = this.state;

    const items = species.images.map(image => {
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
            alt="species-profile"
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
    const { species } = this.props;
    const { images } = species;

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <>
        {this.getGallery()}

        <Main id="species-profile">
          <div onClick={() => this.setState({ showGallery: 1 })}>
            <IonIcon
              className="species-profile-icon-shadow"
              size="large"
              icon={searchCircleOutline}
            />

            <IonIcon
              className="species-profile-icon"
              size="large"
              icon={searchCircleOutline}
            />
          </div>

          {this.slides(images)}

          <IonCardHeader>
            <IonCardTitle>{species.title}</IonCardTitle>
            <IonCardSubtitle>{species.scientificName}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <h3 className="species-profile-label">
              <T>Description</T>:
            </h3>
            {species.description}
            <h3 className="species-profile-label">
              <T>Distribution</T>:
            </h3>
            {species.distribution}
          </IonCardContent>
        </Main>
      </>
    );
  }
  /* eslint-enable jsx-a11y/no-static-element-interactions */
}

Component.propTypes = {
  species: PropTypes.object.isRequired,
};

export default withIonLifeCycle(Component);
