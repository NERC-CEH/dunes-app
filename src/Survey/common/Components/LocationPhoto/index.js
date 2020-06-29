import React, { Component } from 'react';
import { searchCircleOutline } from 'ionicons/icons';
import PropTypes from 'prop-types';
import { IonIcon } from '@ionic/react';
import { Gallery } from '@apps';
import './styles.scss';

export default class index extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  state = {
    showGallery: false,
  };

  getGallery = () => {
    const { location } = this.props;
    const { showGallery } = this.state;

    const items = [
      {
        src: location.url,
        w: location.image_width || 320,
        h: location.image_height || 600,
        // title: `© ${image.image_copyright}`,
      },
    ];

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

  render() {
    const { location } = this.props;

    return (
      <>
        {this.getGallery()}

        <div
          className="location-photo"
          onClick={() => this.setState({ showGallery: 1 })}
        >
          {this.getGallery()}
          <img src={location.url} />

          <IonIcon
            class="photo-zoomin-icon-shadow"
            size="large"
            icon={searchCircleOutline}
          />

          <IonIcon
            class="photo-zoomin-icon"
            size="large"
            icon={searchCircleOutline}
          />
        </div>
      </>
    );
  }
}
