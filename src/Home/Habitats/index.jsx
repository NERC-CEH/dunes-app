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
import habitats from 'common/data/habitats.json';
import HabitatProfile from './components/HabitatProfile';
import './styles.scss';
import './images';

class Habitats extends Component {
  state = { showModal: false, habitat: null };

  static propTypes = {
    // prop: PropTypes,
  };

  showHabitatsModal = id => {
    this.setState({
      showModal: true,
      habitat: habitats.find(habitat => habitat.id === id),
    });
  };

  getGridCell = ({ title, images, id }) => {
    const onClick = () => this.showHabitatsModal(id);
    const { image } = images[0];

    return (
      <IonCol
        key={title}
        className="habitat-list-item"
        onClick={onClick}
        size="12"
        sizeMd="6"
      >
        <div
          style={{
            backgroundImage: `url('/images/${image}.jpg')`,
          }}
          className="label"
        >
          <div>
            <T>{title}</T>
            <IonIcon
              class="habitat-label-icon"
              size="small"
              icon={informationCircleOutline}
            />
          </div>
        </div>
      </IonCol>
    );
  };

  hideHabitatsModal = () => {
    this.setState({ showModal: false });
  };

  getListGrid = () => {
    const habitatColumns = habitats.map(this.getGridCell);
    return (
      <IonGrid className="habitat-list">
        <IonRow>{habitatColumns}</IonRow>
      </IonGrid>
    );
  };

  render() {
    return (
      <Page id="home-habitats">
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>
              <T>Habitats</T>
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <Main class="ion-padding">
          <div className="info-message">
            <p>
              <T>
                Sand dune systems are made up of different habitats, which
                different animal and plant species are adapted to live in. Click
                on each habitat type to learn for more.
              </T>
            </p>
          </div>

          {this.getListGrid()}
          <IonModal isOpen={this.state.showModal}>
            <ModalHeader title="Habitat" onClose={this.hideHabitatsModal} />
            {this.state.showModal && (
              <HabitatProfile habitat={this.state.habitat} />
            )}
          </IonModal>
        </Main>
      </Page>
    );
  }
}

export default Habitats;
