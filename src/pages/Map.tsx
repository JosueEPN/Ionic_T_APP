import React, { useRef, useState } from 'react'
import { IonButtons, IonCol, IonContent, IonHeader, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, useIonViewWillEnter} from '@ionic/react';
import './Map.css';
import { GoogleMap } from '@capacitor/google-maps';
const Map: React.FC = () => {
    const key = "AIzaSyC4bD6wnyK7XB04RYKmCigjV290N5WByJw";
    let newMap;
    const mapRef = useRef(null);
    const [mapConfig, setMapConfig] = useState({
         	

        zoom: 12
    });

    const creteMap = async() => {

        if(!mapRef.current) return;
        newMap = await GoogleMap.create({
            id:"google-map",
            element:mapRef.current,
            apiKey:key,
           config:mapConfig
        });
    }

    useIonViewWillEnter(()=> creteMap());

  return (
    <IonPage>
        <IonTitle> Map </IonTitle>
        <IonRow>
            <IonCol>
                <capacitor-google-map ref={mapRef} id="map"></capacitor-google-map>
            </IonCol>
        </IonRow>
    
    </IonPage>
  )
}

export default Map;