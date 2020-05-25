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
import userModel from 'userModel';
import {
  homeOutline,
  informationCircleOutline,
  heartCircleOutline,
  personOutline,
  logOut,
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
    { title: 'User', path: '/user/register', icon: personOutline },
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

  const { isLoggedIn } = userModel.attrs;

  return (
    <IonMenu type="overlay" contentId="main">
      <IonContent forceOverscroll={false}>
        <IonList lines="none">
          <IonListHeader>Navigate</IonListHeader>
          {getRoutes(routes.appPages)}
        </IonList>

        {isLoggedIn ? (
          <IonList lines="none">{getRoutes(routes.loggedInPages)}</IonList>
        ) : (
          <IonList lines="none">{getRoutes(routes.loggedOutPages)}</IonList>
        )}
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
