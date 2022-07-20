//   // core version + navigation, pagination modules:
//   import Swiper, { Navigation, Pagination } from 'swiper';
//   // import Swiper and modules styles
//   import 'swiper/css';
//   import 'swiper/css/navigation';
//   import 'swiper/css/pagination';

//   // init Swiper:
//   const swiper = new Swiper('.swiper', {
//     // configure Swiper to use modules
//     modules: [Navigation, Pagination],
//     ...
//   });
import React from "react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
} from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./Slidercss.css";
import { Container, Typography } from "@mui/material";
// import { Virtuoso } from "react-virtuoso";
// import {
//   IonAvatar,
//   IonContent,
//   IonItem,
//   IonLabel,
//   IonList,
//   IonPage,
// } from "@ionic/react";

// install Swiper modules
SwiperCore.use([EffectCoverflow, Pagination]);

function Slider() {
  const cardsSites = [
    { img: "/assets/imgs/basilica.jpg", alt: "teleferico", name: "Basílica" },
    {
      img: "/assets/imgs/capilla_del_hombre.jpg",
      alt: "La Capilla del Hombre",
      name: "La Capilla del Hombre",
    },
    {
      img: "/assets/imgs/ceremonias-museo-templo.jpg",
      alt: "Museo Templo del Sol Pintor Ortega Maila",
      name: "Museo Templo del Sol Pintor Ortega Maila",
    },
    {
      img: "/assets/imgs/iglesia_compania_de_jesus.jpg",
      alt: "Iglesia de la Compañia de Jesús",
      name: "Iglesia de la Compañia de Jesús",
    },
    {
      img: "/assets/imgs/mitad_del_mundo.jpg",
      alt: "La mitad del Mundo",
      name: "La mitad del Mundo",
    },
    {
      img: "/assets/imgs/museum_guayasamin.jpg",
      alt: "El Panecillo",
      name: "El Panecillo",
    },
    {
      img: "/assets/imgs/teleferico.jpg",
      alt: "El Teleferico",
      name: "El Teleferico",
    },
  ];
  const cardsAccomodation = [
    { img: "/assets/imgs/acco/basi.jpg", alt: "Hotel La Basílica", name: "Hotel La Basílica" },
    { img: "/assets/imgs/acco/ecuatreasures.jpg", alt: "Hotel Casa Ecuatreasures Centro Historico", name: "Hotel Casa Ecuatreasures Centro Historico" },
    { img: "/assets/imgs/acco/eden.jpg", alt: "Casa El Eden", name: "Casa El Eden" },
    { img: "/assets/imgs/acco/gangotena.jpg", alt: "Casa Gangotena", name: "Casa Gangotena" },
    { img: "/assets/imgs/acco/garden.jpg", alt: "Wyndham Garden Quito", name: "Wyndham Garden Quito" },
    { img: "/assets/imgs/acco/joaquin.jpg", alt: "Casa Joaquin Boutique Hotel", name: "Casa Joaquin Boutique Hotel" },
    { img: "/assets/imgs/acco/laronda.jpg", alt: "La Casona de La Ronda", name: "La Casona de La Ronda" },
  ];
  const cardsRestaurant = [
    { img: "/assets/imgs/res/50best.jpg", alt: "Somos Ecuador Restaurant", name: "Somos Ecuador Restaurant" },
    { img: "/assets/imgs/res/queso-te-sirva-de-experiencia.jpg", alt: "Queso Te Sirva De Experiencia", name: "Queso Te Sirva De Experiencia" },
    { img: "/assets/imgs/res/coffety.jpg", alt: "Coffety Factory", name: "Coffety Factory" },
    { img: "/assets/imgs/res/florentino.jpg", alt: "Bocatto Da Fiorentino", name: "Bocatto Da Fiorentino" },
    { img: "/assets/imgs/res/hibachi.jpg", alt: "Hibachi - Teppanyaki & Sushi Bar", name: "Hibachi - Teppanyaki & Sushi Bar" },
    { img: "/assets/imgs/res/india.jpg", alt: "Royal India Restaurant", name: "Royal India Restaurant" },
    { img: "/assets/imgs/res/napolli.jpg", alt: "Trattoria Pizzeria Napoli", name: "Trattoria Pizzeria Napoli" },
  ];
  return (
    <>
    <div className="container-list">

      <div className="container-list-title">
        <strong>Lugares sorprendentes por descubrir</strong>
        <p>
          Maravillosos lugares para ver, degustar, recorrer y llevar
          experiencias inolvidables.
        </p>
      </div>
        
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          className="mySwiper"
        >
          {cardsSites.map((i, item) => (
            <SwiperSlide key={item}>
              <div
                onClick={() => console.log("hey over there")}
                style={{ display: "unset" }}
              >
                <img src={i.img} alt={i.alt} />
                <Typography
                  variant="h5"
                  align="center"
                  component="div"
                  noWrap
                  className="title-card"
                >
                  {i.name}
                </Typography>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      {/* <div className="container-list">
        <strong>Alojamientos</strong>
        <p>Lugares de encanto, modernas ubicaciones y ensueño.</p>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          className="mySwiper"
        >
          {cardsAccomodation.map((i, item) => (
            <SwiperSlide key={item}>
              <div
                onClick={() => console.log("hey over there")}
                style={{ display: "unset" }}
              >
                <img src={i.img} alt={i.alt} />
                <Typography
                  variant="h5"
                  align="center"
                  component="div"
                  noWrap
                  className="title-card"
                >
                  {i.name}
                </Typography>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}
      <div className="container-list">
      <div className="container-list-title">

        <strong>Restaurantes</strong>
        <p>
          Expectaculares maneras de disfrutar una cena, fiesta y celebraciones
          que marcan un hito.
        </p>
        </div>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          className="mySwiper"
        >
          {cardsRestaurant.map((i, item) => (
            <SwiperSlide key={item}>
              <div
                onClick={() => console.log("hey over there")}
                style={{ display: "unset" }}
              >
                <img src={i.img} alt={i.alt} />
                <Typography
                  variant="h5"
                  align="center"
                  component="div"
                  className="title-card"
                  noWrap
                >
                  {i.name}
                </Typography>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>

    </>
  );
}

export default Slider;
