import React, { useState, useEffect }from "react";
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,
  IonInput,
  useIonViewWillEnter,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonList,
  IonButton,
  IonItem,
  IonIcon,
  IonToast
} from '@ionic/react'; 
import { locateSharp, locationOutline, pencilOutline,pencilSharp} from 'ionicons/icons'
import {collection, getDocs} from'firebase/firestore'
import { db } from "../../database/config";
import { lugar } from "../../modelo/lugar";


import { Link } from "react-router-dom";



const Restaurante: React.FC = () => {

  const [lugares, setLugares] = useState< lugar[] > ([])


  const lugarCollection = collection(db, "Lugares")

  const getLugares = async () => {
    let lista: lugar[] = []    
    const data = await getDocs(lugarCollection)
    data.forEach((doc) => {
      let obj = {
        id:doc.id,
        nombre:doc.data().nombre,
        categoria:doc.data().categoria,
        ciudad:doc.data().ciudad,
        descripcion:doc.data().descripcion,
        lat:doc.data().lat,
        log:doc.data().log      
      };
      lista.push(obj);
    });
    setLugares(lista)
  }




 useIonViewWillEnter(()=>{
  getLugares()
 })

 
     return (
        <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Restaurantes</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent fullscreen>
                <IonList> {lugares.filter( lugar => lugar.categoria == "Restaurante").map( lugar  => (
                        <IonCard key={lugar.id} >
                          <img src="" alt={lugar.nombre} />
                            <IonCardHeader>
                                <IonCardTitle>Nombre: {
                                    lugar.nombre
                                }</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                               Ciudad: {lugar.ciudad}
                            </IonCardContent>

                            <IonButton  routerLink="/ubication">
                              <IonIcon slot="start" ios={locationOutline} md={locateSharp} />
                            </IonButton>   
                        </IonCard>
                    )) }
                 </IonList>
                 
        </IonContent>
      </IonPage>
    );
};

export default Restaurante;