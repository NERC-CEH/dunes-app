import React, { Component } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonCol,
  IonGrid,
  IonRow,
  IonModal,
  IonIcon,
} from '@ionic/react';
import { Page, Main, ModalHeader } from '@apps';
import { Trans as T } from 'react-i18next';
import { informationCircleOutline } from 'ionicons/icons';
import speciesDescription from 'common/data/speciesDescriptions';
import SpeciesProfile from './components/SpeciesProfile';
import './thumbnails';
import './images';
import './styles.scss';

class Species extends Component {
  state = { showModal: false, species: null };

  showSpeciesModal = id => {
    this.setState({
      showModal: true,
      species: speciesDescription.find(specie => specie.id === id),
    });
  };

  getGridCell = ({ commonName, scientificName, id, photoHeight }) => {
    const onClick = () => this.showSpeciesModal(id);
    const hasPhotos = photoHeight && !!photoHeight.length;

    if (!hasPhotos) {
      return null;
    }

    const name = commonName || scientificName;

    return (
      <IonCol
        key={name}
        className="species-list-item"
        onClick={onClick}
        size="6"
        sizeMd="6"
      >
        <div
          style={{
            background: `url('/images/${id}_thumbnail.jpg')`,
          }}
          className="species-label"
        >
          <div>
            {name}
            <IonIcon
              className="species-label-icon"
              size="small"
              icon={informationCircleOutline}
            />
          </div>
        </div>
      </IonCol>
    );
  };

  hideSpeciesModal = () => {
    this.setState({ showModal: false });
  };

  getListGrid = () => {
    const speciesColumns = speciesDescription
      .sort((s1, s2) => s1.sortId - s2.sortId)
      .map(this.getGridCell);

    return (
      <IonGrid className="species-list">
        <IonRow>{speciesColumns}</IonRow>
      </IonGrid>
    );
  };

  render() {
    return (
      <Page id="home-species">
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>
              <T>Species</T>
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <Main>
          {this.getListGrid()}

          <IonModal isOpen={this.state.showModal}>
            <ModalHeader title="Species" onClose={this.hideSpeciesModal} />
            {this.state.showModal && (
              <SpeciesProfile species={this.state.species} />
            )}
          </IonModal>
        </Main>
      </Page>
    );
  }
}

export default Species;
