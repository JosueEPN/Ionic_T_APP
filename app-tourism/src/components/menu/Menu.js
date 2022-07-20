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
} from "@ionic/react";

import { useLocation, Link } from "react-router-dom";
import {
  restaurantOutline,
  restaurantSharp,
  basketOutline,
  basketSharp,
  leafOutline,
  leafSharp,
  locationOutline,
  locationSharp,
  peopleCircleOutline,
  peopleCircleSharp,
} from "ionicons/icons";

import { useAuth } from "../../context/AuthContext";

import "./Menu.css";

const appPages = [
  {
    title: "Sitios Turisticos",
    url: "/page/Turismo",
    iosIcon: locationOutline,
    mdIcon: locationSharp,
  },
  {
    title: "Restaurantes",
    url: "/page/Restaurantes",
    iosIcon: restaurantOutline,
    mdIcon: restaurantSharp,
  },
  {
    title: "Tienda",
    url: "/page/Tienda",
    iosIcon: basketOutline,
    mdIcon: basketSharp,
  },
  {
    title: "Parques",
    url: "/page/Parques",
    iosIcon: leafOutline,
    mdIcon: leafSharp,
  },
  {
    title: "Encargado",
    url: "/Encargado/Principal-Page",
    iosIcon: peopleCircleOutline,
    mdIcon: peopleCircleSharp,
  },
];

const labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];

const Menu = () => {
  const location = useLocation();
  console.log("Menu", location);
  const { user } = useAuth();
  console.log("menu", user);

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <Link to="/home">
            {!user ? (
              <IonListHeader>Home</IonListHeader>
            ) : (
              <>
                <IonListHeader>Home</IonListHeader>
                <IonNote>{user.email}</IonNote>
              </>
            )}
          </Link>

          {appPages.map((appPage, index) => {
            //let user = {rol:"pan"}//AL PRIMER RENDER NO EXISTE EL USER -> es cuestión del protected routes
            if (user.rol === "turista" && appPage.title != "Encargado") {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem
                    className={
                      location.pathname === appPage.url ? "selected" : ""
                    }
                    routerLink={appPage.url}
                    routerDirection="none"
                    lines="none"
                    detail={false}
                  >
                    <IonIcon
                      slot="start"
                      ios={appPage.iosIcon}
                      md={appPage.mdIcon}
                    />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            } else if (user.rol === "propietario" || user.rol === "admin") {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem
                    className={
                      location.pathname === appPage.url ? "selected" : ""
                    }
                    routerLink={appPage.url}
                    routerDirection="none"
                    lines="none"
                    detail={false}
                  >
                    <IonIcon
                      slot="start"
                      ios={appPage.iosIcon}
                      md={appPage.mdIcon}
                    />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            }
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
