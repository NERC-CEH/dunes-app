import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Log from 'helpers/log';
import ImageHelp from 'helpers/image';
import { observer } from 'mobx-react';
import { PhotoSwipe } from 'react-photoswipe';
import { IonIcon, IonButton, IonItem } from '@ionic/react';
import { close, camera } from 'ionicons/icons';
import { Trans as T, withTranslation } from 'react-i18next';
import { actionSheet, alert, toast } from '@apps';
import ImageModel from 'common/models/media';
import 'react-photoswipe/lib/photoswipe.css';
import 'react-photoswipe/dist/default-skin.svg';
import './styles.scss';

const { error } = toast;

function photoDelete(photo, t) {
  alert({
    header: t('Delete'),
    message: `${t(`Are you sure you want to remove this photo?`)}
       </br></br> 
       ${t('Note: it will remain in the gallery.')}
       `,
    buttons: [
      {
        text: t('Cancel'),
        role: 'cancel',
        cssClass: 'primary',
      },
      {
        text: t('Delete'),
        cssClass: 'danger',
        handler: () => photo.destroy(),
      },
    ],
  });
}

/**
 * Adds a new image to occurrence.
 */
async function addPhoto(model, photo) {
  const image = await ImageHelp.getImageModel(ImageModel, photo);
  model.media.push(image);
  return model.save();
}

@observer
class Footer extends Component {
  static propTypes = {
    model: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
  };

  state = {
    showGallery: false,
  };

  photoUpload = e => {
    const photo = e.target.files[0];

    // TODO: show loader
    addPhoto(this.props.model, photo).catch(err => {
      Log(err, 'e');
      // TODO: show err
    });
  };

  photoSelect = () => {
    const { t, model } = this.props;

    actionSheet({
      header: t('Choose a method to upload a photo'),
      buttons: [
        {
          text: t('Gallery'),
          handler: () => {
            ImageHelp.getImage({
              sourceType: window.Camera.PictureSourceType.PHOTOLIBRARY,
              saveToPhotoAlbum: false,
            })
              .then(entry => {
                entry &&
                  addPhoto(model, entry.nativeURL, occErr => {
                    if (occErr) {
                      error(occErr.message);
                    }
                  });
              })
              .catch(occErr => {
                error(occErr.message);
              });
          },
        },
        {
          text: t('Camera'),
          handler: () => {
            ImageHelp.getImage()
              .then(entry => {
                entry &&
                  addPhoto(model, entry.nativeURL, occErr => {
                    if (occErr) {
                      error(occErr.message);
                    }
                  });
              })
              .catch(occErr => {
                error(occErr.message);
              });
          },
        },
        {
          text: t('Cancel'),
          role: 'cancel',
        },
      ],
    });
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

  getImageArray = () => {
    const { t, model } = this.props;

    const { media } = model;
    if (!media.length) {
      return (
        <span className="empty">
          <T>No photo has been added.</T>
          <div>
            <T>
              Press <IonIcon icon={camera} /> to add.
            </T>
          </div>
        </span>
      );
    }

    /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
    return media.map(img => {
      const { thumbnail } = img.attrs;
      const id = img.cid;
      return (
        <div key={id} className="img">
          <IonButton
            fill="clear"
            class="delete"
            onClick={() => photoDelete(img, t)}
          >
            <IonIcon icon={close} />
          </IonButton>
          <img
            src={thumbnail}
            alt=""
            // onClick={() => this.setState({ showGallery: index + 1 })} //TODO: fix
          />
        </div>
      );
    });
    /* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
  };

  getNewImageButton = () => {
    if (!window.cordova) {
      return (
        <div className="non-cordova-img-picker">
          <IonIcon
            class="non-cordova-img-picker-logo"
            icon={camera}
            size="large"
          />
          <input type="file" accept="image/*" onChange={this.photoUpload} />
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

export default withTranslation()(Footer);
