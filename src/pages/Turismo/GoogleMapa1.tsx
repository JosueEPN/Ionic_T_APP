import React, { useRef, useState } from 'react'
import { IonButtons, IonCol, IonContent, IonHeader, IonMenuButton, IonPage,  IonRow,  IonTitle, IonToolbar, useIonViewWillEnter} from '@ionic/react';
import './Map.css';
import { db } from '../../database/config';
import {GoogleMap} from '@capacitor/google-maps';
import { useParams } from 'react-router-dom';
import { collection, doc, getDocs } from 'firebase/firestore';

import { coorden } from '../../modelo/coorden';


const GoogleMapa1: React.FC = () => {


  const key = "AIzaSyC4bD6wnyK7XB04RYKmCigjV290N5WByJw"
  let  newMap:any ;
 

   let  {lati}:{lati:any} = useParams();
   let  {logi}:{logi:any} = useParams();

   var latitud = parseFloat(lati)
   var longitud = parseFloat(logi)



   const lugarCollection = collection(db, "Lugares")

   const getLugar = () => {



 

  }


   const mapRef = useRef(null);

   const [mapConfig, setMapConfing] =useState({
    zoom: 12,
    center:{
      lat:latitud,
      lng:longitud
    },
    androidLiteMode: false,
   })

   const creteMap = async() => {

    if(!mapRef.current) return;

    newMap = await GoogleMap.create({
        id:"google-map",
        element:mapRef.current,
        apiKey:key,
        config:mapConfig
        
    });

   

    
  }

  const drawPoint = async () =>{

    await newMap.addMarkers({
      coordinate: {
        lat: lati,
        lng: logi,
      },
      title: 'Esta es su ubicacion',
    });
  }

  


  useIonViewWillEnter(
    ()=>{
      creteMap()
      getLugar()
      
    })
  

  return (
    <IonPage>
          <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle> Mapa</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <IonContent fullscreen>
           <IonRow>
            <IonCol>
              <capacitor-google-map ref={mapRef} id="map"></capacitor-google-map>
            </IonCol>
           </IonRow>
        </IonContent>
    
    </IonPage>
  );
};

export default GoogleMapa1;