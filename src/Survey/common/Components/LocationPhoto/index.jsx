/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { searchCircleOutline } from 'ionicons/icons';
import PropTypes from 'prop-types';
import { IonIcon } from '@ionic/react';
import config from 'config';
import { Gallery } from '@apps';
import { Capacitor } from '@capacitor/core';
import { Trans as T } from 'react-i18next';
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
        src: this.getUrl(),
        w: location.imageWidth || 320,
        h: location.imageHeight || 600,
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

  getUrl = () => {
    const { location } = this.props;

    if (!Capacitor.isNative || !location.cachedUrl) {
      return location.url;
    }

    return Capacitor.convertFileSrc(`${config.dataPath}/${location.cachedUrl}`);
  };

  getURL() {
    const { data: name } = this.attrs;

    if (!Capacitor.isNative || window.testing) {
      return name;
    }

    return Capacitor.convertFileSrc(`${config.dataPath}/${name}`);
  }

  render() {
    const imageSrc = this.getUrl();

    const image = imageSrc ? (
      <img src={imageSrc} />
    ) : (
      <div className="no-image">
        <T>No image available for this location.</T>
      </div>
    );

    return (
      <>
        {this.getGallery()}

        <div
          className="location-photo"
          onClick={() => imageSrc && this.setState({ showGallery: 1 })}
        >
          {this.getGallery()}

          {image}

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
