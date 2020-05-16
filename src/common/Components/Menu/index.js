import React from 'react';
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
  informationCircleOutline,
  heartCircleOutline,
  personOutline,
  logOut,
  personAddOutline,
  settingsOutline,
} from 'ionicons/icons';

import './styles.scss';

const routes = {
  appPages: [
    { title: 'Home', path: '/home/info', icon: homeOutline },
    {
      title: 'About',
      path: '/info/about',
      icon: informationCircleOutline,
    },
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
  loggedInPages: [{ title: 'Logout', path: '/user/logout', icon: logOut }],
  loggedOutPages: [
    { title: 'Login', path: '/user/login', icon: personOutline },
    { title: 'Register', path: '/user/register', icon: personAddOutline },
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

const Menu = () => {
  const location = useLocation();
  const getRoutes = routesList => renderMenuRoutes(routesList, location);

  const showAccountLinks = window.document.location.href.includes('localhost');

  return (
    <IonMenu type="overlay" contentId="main">
      <IonContent forceOverscroll={false}>
        <IonList lines="none">
          <IonListHeader>Navigate</IonListHeader>
          {getRoutes(routes.appPages)}
        </IonList>

        {showAccountLinks && (
          <IonList lines="none">
            <IonListHeader>Account</IonListHeader>
            {getRoutes(routes.loggedOutPages)}
          </IonList>
        )}
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
