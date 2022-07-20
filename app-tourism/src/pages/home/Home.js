import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { pin, wifi, wine, warning, walk, skull, exit } from "ionicons/icons";
import Slider from "../../components/slider/Slider";
import { Typography } from "@mui/material";
import "./Home.css";
import { useAuth } from "../../context/AuthContext";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export const Home = () => {
  const { user, logout } = useAuth();

  console.log("Home", user);

  const handleLogOut = async () => {
    console.log("home, logout", logout);
    await logout();
  };
  const cardsCategories = [
    {
      img: "/assets/imgs/res/coffety.jpg",
      alt: "Ecuador Restaurant",
      name: "RESTAURANTES",
      href: "/page/Restaurantes",
    },
    {
      img: "/assets/imgs/mitad_del_mundo.jpg",
      alt: "Ecuador Parks",
      name: "PARQUES",
      href: "page/Parques",
    },
    {
      img: "/assets/imgs/res/hibachi.jpg",
      alt: "Hibachi - Teppanyaki & Sushi Bar",
      name: "Turismo",
      href: "/page/Turismo",
    },
    {
      img: "/assets/imgs/res/queso-te-sirva-de-experiencia.jpg",
      alt: "Ecuador Tienda",
      name: "TIENDAS",
      href: "page/Tienda",
    },
  ];
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>
              <IonIcon icon={skull}></IonIcon>
            </IonCardSubtitle>
            <IonCardTitle>Carlos Cueva</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            Espíritu viajero, que ama recorrer el mundo y siente un deseo
            incontrolable por vivir nuevas experiencias en lugares desconocidos.
          </IonCardContent>
        </IonCard> */}

        <IonCard>
          <IonItem>
            <IonIcon icon={skull} slot="start" />

            <IonLabel>Welcome {user.email} </IonLabel>
            <IonButton fill="outline" slot="end">
              <Button
                onClick={handleLogOut}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Cerrar sesión
              </Button>
            </IonButton>
          </IonItem>

          <IonCardContent>
            Espíritu viajero, que ama recorrer el mundo y siente un deseo
            incontrolable por vivir nuevas experiencias en lugares desconocidos
          </IonCardContent>
        </IonCard>
        <IonCard>
          <Slider />
        </IonCard>
        <IonGrid className="container-grid">
          <IonRow>
            {cardsCategories.slice(0, 2).map((i, item) => (
              <IonCol key={item}>
                <Link to={i.href}>
                  <IonCard>
                    <IonItem>
                      <div
                        onClick={() => console.log("hey over there")}
                        style={{ display: "unset" }}
                      >
                        <img src={i.img} alt={i.alt} />
                        <Typography
                          variant="h6"
                          align="center"
                          component="div"
                          noWrap
                          className="title-card"
                        >
                          {i.name}
                        </Typography>
                      </div>
                    </IonItem>
                  </IonCard>
                </Link>
              </IonCol>
            ))}
          </IonRow>
          <IonRow>
            {cardsCategories.slice(2, 4).map((i, item) => (
              <IonCol key={item}>
                <Link to={i.href}>
                  <IonCard>
                    <IonItem>
                      <div
                        onClick={() => console.log("hey over there")}
                        style={{ display: "unset" }}
                      >
                        <img src={i.img} alt={i.alt} />
                        <Typography
                          variant="h6"
                          align="center"
                          component="div"
                          noWrap
                          className="title-card"
                        >
                          {i.name}
                        </Typography>
                      </div>
                    </IonItem>
                  </IonCard>
                </Link>
              </IonCol>
            ))}
          </IonRow>
          <IonRow>
            {cardsCategories.slice(4, 6).map((i, item) => (
              <IonCol key={item}>
                <Link to={i.href}>
                  <IonCard>
                    <IonItem>
                      <div
                        onClick={() => console.log("hey over there")}
                        style={{ display: "unset" }}
                      >
                        <img src={i.img} alt={i.alt} />
                        <Typography
                          variant="h6"
                          align="center"
                          component="div"
                          noWrap
                          className="title-card"
                        >
                          {i.name}
                        </Typography>
                      </div>
                    </IonItem>
                  </IonCard>
                </Link>
              </IonCol>
            ))}
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonItem className="ion-activated" onClick={handleLogOut}>
                  <IonIcon icon={walk} slot="start" />
                  <IonLabel>Salir</IonLabel>
                </IonItem>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default Home;

/*import React from 'react'
import { useAuth } from '../../context/AuthContext';
import Button from "@mui/material/Button";


function Home() {
  const { user, logout } = useAuth();

  console.log("Home", user)

  const handleLogOut = async () => {
    console.log("home, logout", logout)
    await logout();
  }
  return (
    <div>
      {
        user.rol && <h3>Home {user.rol}</h3>
      }
      <h3>Welcome {user.email}</h3>
      <Button onClick={handleLogOut} type="submit" variant="contained" color="primary" fullWidth>
        Cerrar sesión
      </Button>
    </div>
  );
}

export default Home*/
