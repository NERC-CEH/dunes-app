import React from 'react';
import {
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonIcon,
} from '@ionic/react';
import { PhotoSwipe } from 'react-photoswipe';
import { searchCircleOutline } from 'ionicons/icons';
import PropTypes from 'prop-types';
import { Main } from '@apps';
import 'react-photoswipe/lib/photoswipe.css';
import 'react-photoswipe/dist/default-skin.svg';
import './styles.scss';

class Component extends React.Component {
  state = {
    showGallery: false,
  };

  getGallery = () => {
    const { habitat } = this.props;
    const { showGallery } = this.state;
    const items = [
      {
        src: `/images/image.jpg`,
        w: habitat.image_width || 800,
        h: habitat.image_height || 800,
        title: `© ${habitat.image_copyright}`,
      },
    ];

    return (
      <PhotoSwipe
        isOpen={!!showGallery}
        items={items}
        options={{
          index: showGallery - 1,
          shareEl: false,
          fullscreenEl: false,
        }}
        onClose={() => this.setState({ showGallery: false })}
      />
    );
  };

  render() {
    const { habitat } = this.props;
    const features = habitat.features.map(feature => <li>{feature}</li>);

    /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
    return (
      <>
        {this.getGallery()}

        <Main id="habitat-profile" class="ion-padding">
          <div>
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
          <img
            src="/images/image.jpg"
            alt="habitat"
            onClick={() => this.setState({ showGallery: 1 })}
          />

          <IonCardHeader>
            <IonCardTitle>{t(habitat.title)}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <h3 className="habitat-label">{`${t('Features')}:`}</h3>
            <ul>{features}</ul>
          </IonCardContent>
        </Main>
      </>
    );
  }
}
Component.propTypes = {
  habitat: PropTypes.object.isRequired,
};
export default Component;
