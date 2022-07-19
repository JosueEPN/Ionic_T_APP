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
import { pencilOutline,pencilSharp,trashOutline,trashSharp,locationOutline,locateSharp } from 'ionicons/icons'
import {collection, getDocs,getDoc,deleteDoc, doc} from'firebase/firestore'
import { db } from "../../database/config";
import { lugar } from "../../modelo/lugar";


import { Link } from "react-router-dom";



const IndexTurist: React.FC = () => {

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
    console.log(lista);
    setLugares(lista)
  }



  const eliminar = async(id:string) =>{
    try {
      const lugarDoc = doc(db,"Lugares" ,id)  
      await deleteDoc(lugarDoc)
        getLugares();  
    } catch (error) {}       
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
            <IonTitle>Destinos Disponibles</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent fullscreen>
        
        <IonList> {lugares.filter( lugar => lugar.categoria == "Turistico").map( lugar  => (
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
                    {lugares.filter( lugar => lugar.categoria == "Restaurante").map( lugar  => (
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
                    {lugares.filter( lugar => lugar.categoria == "Tienda").map( lugar  => (
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
                    {lugares.filter( lugar => lugar.categoria == "Parques").map( lugar  => (
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

export default IndexTurist;