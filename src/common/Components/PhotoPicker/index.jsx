import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Log from 'helpers/log';
import ImageHelp from 'helpers/image';
import { observer } from 'mobx-react';
import { IonIcon, IonButton, IonItem } from '@ionic/react';
import { close, camera } from 'ionicons/icons';
import { Trans as T, withTranslation } from 'react-i18next';
import alert from '@bit/flumens.apps.helpers.alert';
import toast from '@bit/flumens.apps.helpers.toast';
import Gallery from '@bit/flumens.apps.gallery';
import ImageModel from 'common/models/media';
import { Capacitor } from '@capacitor/core';
import './styles.scss';

const { error } = toast;

function photoDelete(photo) {
  alert({
    header: 'Delete',
    message: (
      <>
        <T>Are you sure you want to remove this photo?</T>
        <br />
        <br />
        <T>Note: it will remain in the gallery.</T>
      </>
    ),
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'primary',
      },
      {
        text: 'Delete',
        cssClass: 'danger',
        handler: () => photo.destroy(),
      },
    ],
  });
}

async function addPhotoToModel(model, image) {
  const media = await ImageHelp.getImageModel(ImageModel, image);
  model.media.push(media);
  return model.save();
}

@observer
class PhotoPicker extends Component {
  static propTypes = {
    model: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool,
  };

  state = {
    showGallery: false,
  };

  photoUpload = e => {
    const photo = e.target.files[0];

    // TODO: show loader
    addPhotoToModel(this.props.model, photo).catch(err => {
      Log(err, 'e');
      // TODO: show err
    });
  };

  photoSelect = async () => {
    const { isDisabled } = this.props;

    if (isDisabled) {
      return;
    }

    const { model } = this.props;

    const image = await ImageHelp.getImage();

    if (!image) {
      error(t("Sorry, we couldn't get the image."));
      return;
    }

    try {
      addPhotoToModel(model, image);
    } catch (e) {
      error(e.message);
    }
  };

  getGallery = () => {
    const { media } = this.props.model;
    const { showGallery } = this.state;

    const items = [];

    media.forEach(image => {
      items.push({
        src: image.getURL(),
        w: image.attrs.width || 800,
        h: image.attrs.height || 800,
      });
    });

    return (
      <Gallery
        isOpen={!!showGallery}
        items={items}
        options={{
          index: showGallery - 1,
          shareEl: false,
          history: false,
          fullscreenEl: false,
        }}
        onClose={() => this.setState({ showGallery: false })}
      />
    );
  };

  getImageArray = () => {
    const { t, model, isDisabled } = this.props;

    const { media } = model;
    if (!media.length) {
      return (
        <span className="empty">
          <T>Please add a photo for your visit.</T>
          <div>
            <T>
              Press <IonIcon icon={camera} /> to add.
            </T>
          </div>
        </span>
      );
    }

    /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
    return media.map((img, index) => {
      const { thumbnail } = img.attrs;
      const id = img.cid;
      return (
        <div key={id} className="img">
          {!isDisabled && (
            <IonButton
              fill="clear"
              class="delete"
              onClick={() => photoDelete(img, t)}
            >
              <IonIcon icon={close} />
            </IonButton>
          )}
          <img
            src={thumbnail}
            alt=""
            onClick={() => this.setState({ showGallery: index + 1 })} // TODO: fix
          />
        </div>
      );
    });
    /* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
  };

  getNewImageButton = () => {
    const { isDisabled } = this.props;

    if (!Capacitor.isNative) {
      return (
        <div className="non-cordova-img-picker">
          <IonIcon
            class="non-cordova-img-picker-logo"
            icon={camera}
            size="large"
          />
          {!isDisabled && (
            <input type="file" accept="image/*" onChange={this.photoUpload} />
          )}
        </div>
      );
    }

    return (
      <IonButton fill="clear" onClick={this.photoSelect}>
        <IonIcon icon={camera} />
      </IonButton>
    );
  };

  render() {
    return (
      <IonItem id="edit-footer">
        {this.getGallery()}

        <div id="img-picker-array">
          <div className="img-picker">{this.getNewImageButton()}</div>
          <div id="img-array">{this.getImageArray()}</div>
        </div>
      </IonItem>
    );
  }
}

export default withTranslation()(PhotoPicker);
