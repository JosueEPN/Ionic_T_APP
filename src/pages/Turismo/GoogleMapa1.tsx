import React, { useRef, useState } from 'react'
import { IonButtons, IonCol, IonContent, IonHeader, IonMenuButton, IonPage,  IonRow,  IonTitle, IonToolbar, useIonViewWillEnter} from '@ionic/react';
import './Map.css';
import { db } from '../../database/config';
import {GoogleMap} from '@capacitor/google-maps';
import { useParams } from 'react-router-dom';
import { collection, doc, getDocs } from 'firebase/firestore';

import { coorden } from '../../modelo/coorden';


const GoogleMapa1: React.FC = () => {

  const [coord,  setCoords ] = useState< coorden[] > ([])
  const key = "AIzaSyD4Sl0FHs2MsTybkr5KGjJuqFc7kNDr_Uc"
  let  newMap:any ;
 

   let  {id}:{id:string} = useParams();

   const lugarCollection = collection(db, "Lugares")

   const getLugar = async () => {
    let lista: coorden[] = []   
    const data = await getDocs(lugarCollection)
    data.forEach((doc) => {
      if(id == doc.id){     
        let obj = {

          nombre:doc.data().nombre,       
          lati:doc.data().lati,
          logi:doc.data().logi,
     
        };
        lista.push(obj);  
        console.log(doc.data())  
        console.log(obj)  
        console.log(lista)   
        
      }
      
    });
    setCoords(lista)    
    console.log(coord)
      


   
  }


   const mapRef = useRef(null);

   const [mapConfig, setMapConfing] =useState({
    zoom: 12,
    center:{
      lat:0,
      lng:0
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
        lat: 33.6,
        lng: -117.9,
      },
      title: 'Hello world',
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