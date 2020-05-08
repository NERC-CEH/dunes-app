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
      <IonRow>
        <IonCol
          key={title}
          className="habitat-list-item"
          // onClick={onClick}
          size="6"
          size-lg
          class="ion-no-padding ion-no-margin"
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
      </IonRow>
    );
  };

  getListGrid = () => {
    const habitatColumns = habitats.map(this.getGridCell);
    return <IonGrid className="habitat-list">{habitatColumns}</IonGrid>;
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
