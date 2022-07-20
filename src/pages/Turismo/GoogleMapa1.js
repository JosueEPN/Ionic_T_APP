import React from 'react'
import { IonButtons, IonCol, IonContent, IonHeader, IonMenuButton, IonPage,  IonRow,  IonTitle, IonToolbar, useIonViewWillEnter} from '@ionic/react';
import { useParams } from 'react-router-dom';
import './Page.css';
import { Marker, Popup, TileLayer, MapContainer } from "react-leaflet";

const GoogleMapa1 = () => {
 

   let  {lati} = useParams();
   let  {logi} = useParams();

   var latitud = parseFloat(lati)
   var longitud = parseFloat(logi)  
  


  useIonViewWillEnter(
    ()=>{
     
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

              
              <div className="leafletcontainer">
                <MapContainer style={{height: '100%', width: '100%'}} center={[latitud, longitud]} zoom={10}>

                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>

                <Marker position={[latitud, longitud]}>
               
                </Marker>

                </MapContainer>
              </div>


              
            </IonCol>
           </IonRow>
        </IonContent>
    
    </IonPage>
  );
};

export default GoogleMapa1;