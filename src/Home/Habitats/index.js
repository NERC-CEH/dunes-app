import React, { Component } from 'react';
// import PropTypes from 'prop-types';
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
import HabitatProfile from './HabitatProfile';
import habitats from './data.json';
import './styles.scss';
import './images';

export default class Habitats extends Component {
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

  getGridCell = ({ title, image, id }) => {
    const onClick = () => this.showHabitatsModal(id);

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
            <IonTitle>Habitats</IonTitle>
          </IonToolbar>
        </IonHeader>

        <Main class="ion-padding">
          {this.getListGrid()}
          <IonModal isOpen={this.state.showModal}>
            <ModalHeader
              title={t('Habitat')}
              onClose={this.hideHabitatsModal}
            />
            {this.state.showModal && (
              <HabitatProfile habitat={this.state.habitat} />
            )}
          </IonModal>
        </Main>
      </Page>
    );
  }
}
