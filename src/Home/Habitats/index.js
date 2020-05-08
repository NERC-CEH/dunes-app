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
} from '@ionic/react';
import { Page, Main } from '@apps';
import { Trans as T } from 'react-i18next';
import habitats from './data.json';
import './styles.scss';
import './images';

export default class Habitats extends Component {
  static propTypes = {
    // prop: PropTypes,
  };

  getGridCell = ({ title, image }) => {
    return (
      <IonCol
        key={title}
        className="habitat-list-item"
        // onClick={onClick}
        size="12"
        sizeMd="6"
      >
        <div
          style={{
            backgroundImage: `url('/images/${image}.jpg')`,
          }}
          className="label"
        >
          <span>
            <T>{title}</T>
          </span>
        </div>
      </IonCol>
    );
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

        <Main class="ion-padding">{this.getListGrid()}</Main>
      </Page>
    );
  }
}
