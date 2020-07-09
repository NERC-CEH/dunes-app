import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, useLocation } from 'react-router';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from '@ionic/react';
import {
  homeOutline,
  heartCircleOutline,
  personOutline,
  logOut,
  settingsOutline,
} from 'ionicons/icons';
import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';

import './styles.scss';

const routes = {
  appPages: [
    { title: 'Home', path: '/home/info', icon: homeOutline },
    {
      title: 'Credits',
      path: '/info/credits',
      icon: heartCircleOutline,
    },
    {
      title: 'Settings',
      path: '/settings/menu',
      icon: settingsOutline,
    },
  ],
  loggedOutPages: [
    { title: 'Register/Login', path: '/user/register', icon: personOutline },
  ],
};

function renderMenuRoutes(list, location) {
  return list
    .filter(route => !!route.path)
    .map(p => (
      <IonMenuToggle key={p.title} auto-hide="false">
        <IonItem
          detail={false}
          routerLink={p.path}
          routerDirection="none"
          className={
            location.pathname.startsWith(p.path) ? 'selected' : undefined
          }
        >
          <IonIcon slot="start" icon={p.icon} />
          <IonLabel>{p.title}</IonLabel>
        </IonItem>
      </IonMenuToggle>
    ));
}

const getLogoutButton = userModel => {
  const userName = userModel.attrs.fullName || userModel.attrs.email;

  return (
    <IonItem
      detail={false}
      routerDirection="none"
      onClick={() => {
        userModel.logOut();
      }}
    >
      <IonIcon slot="start" icon={logOut} />
      <IonLabel>
        <T>Logout: {userName}</T>
      </IonLabel>
    </IonItem>
  );
};

const Menu = observer(({ userModel }) => {
  const location = useLocation();
  const getRoutes = routesList => renderMenuRoutes(routesList, location);

  const isLoggedIn = !!userModel.attrs.id;

  return (
    <IonMenu type="overlay" contentId="main">
      <IonContent forceOverscroll={false}>
        <IonList lines="none">
          <IonListHeader>Navigate</IonListHeader>
          {getRoutes(routes.appPages)}
        </IonList>

        <IonList lines="none">
          <IonListHeader>
            <T>Account</T>
          </IonListHeader>
          {isLoggedIn
            ? getLogoutButton(userModel)
            : getRoutes(routes.loggedOutPages)}
        </IonList>
      </IonContent>
    </IonMenu>
  );
});

Menu.propTypes = {
  userModel: PropTypes.object.isRequired,
};

export default withRouter(Menu);
