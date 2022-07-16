import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { restaurantOutline,restaurantSharp, basketOutline, basketSharp, leafOutline,leafSharp, locationOutline, locationSharp, peopleCircleOutline, peopleCircleSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Sitios Turisticos',
    url: '/page/Turismo',
    iosIcon: locationOutline,
    mdIcon: locationSharp
  },
  {
    title: 'Restaurantes',
    url: '/page/Restaurantes',
    iosIcon: restaurantOutline,
    mdIcon: restaurantSharp
  },
  {
    title: 'Tienda',
    url: '/page/Tienda',
    iosIcon: basketOutline,
    mdIcon: basketSharp
  },
  {
    title: 'Parques',
    url: '/page/Parques',
    iosIcon: leafOutline,
    mdIcon: leafSharp
  },
  {
    title: 'Encargado',
    url: '/Encargado/Principal-Page',
    iosIcon: peopleCircleOutline,
    mdIcon: peopleCircleSharp
  },
];
const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Inbox</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;