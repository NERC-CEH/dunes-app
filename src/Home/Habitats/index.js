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
import PropTypes from 'prop-types';
import { Page, Main, ModalHeader } from '@apps';
import { Trans as T, withTranslation } from 'react-i18next';
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
    const { t } = this.props;

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
Habitats.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Habitats);
