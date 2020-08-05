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

    const { photoAuthor, photoHeight, photoWidth } = species;

    const dummyPhotoCounterArray = [...new Array(photoHeight.length)];
    const items = dummyPhotoCounterArray.map((_, index) => {
      const title = photoAuthor[index] ? `© ${photoAuthor[index]}` : '';

      return {
        src: `/images/${species.id}_${index + 1}_image.jpg`,
        w: photoWidth || 800,
        h: photoHeight[index] || 800,
        title,
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

  getPhotoSlides = species => {
    const slideOpts = {
      initialSlide: 0,
      speed: 400,
    };
    const { id, scientificName, photoHeight } = species;

    const getSlideImages = () => {
      const dummyPhotoCounterArray = [...new Array(photoHeight.length)];

      return dummyPhotoCounterArray.map((_, index) => {
        const uniqueKey = `${scientificName} + ${index + 1}`;

        return (
          <IonSlide
            key={uniqueKey}
            class="species-profile-photo"
            style={{
              background: `url(/images/${id}_${index + 1}_image.jpg)`,
            }}
            onClick={() => this.setState({ showGallery: 1 })}
          />
        );
      });
    };

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
        {getSlideImages()}
      </IonSlides>
    );
  };

  render() {
    const { species } = this.props;

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

          {this.getPhotoSlides(species)}

          <IonCardHeader>
            {species.commonName && (
              <IonCardTitle>{species.commonName}</IonCardTitle>
            )}
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
