import React from 'react'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage,  IonTitle, IonToolbar, useIonViewWillEnter} from '@ionic/react';
import './Map.css';
import { useParams } from 'react-router';

const GoogleMapa1: React.FC = () => {

    const params = useParams()
    useIonViewWillEnter(()=>{
      console.log(params)
    }
    )

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
            Holaaa
        </IonContent>
    
    </IonPage>
  );
};

export default GoogleMapa1;