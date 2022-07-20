import React, { useState, useEffect, useReducer }from "react";
import {IonList, IonItem, IonLabel,IonInput, IonSelect, IonSelectOption,IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton, IonLoading} from '@ionic/react';
import { collection, addDoc , getDoc} from "firebase/firestore";
import { db } from "../../firebase";
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { lugar } from "../../modelo/lugar";



const CreateTurist: React.FC = () => {


  const [nombreT, setNombre] = useState('')
  const [categoria, setCategoria] = useState('')
  const [ciudad, setCiduad ] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [lati, setLat] = useState(0)
  const [logi, setLog] = useState(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [position, setPosition] = useState<Geoposition>()
  const lugarCollection = collection(db, "Lugares")

  if(!navigator.geolocation){
    alert('Tu navegador no tiene la opcion de ubicacion');
    throw new Error('Tu navegador no tiene la opcion de ubicacion')
  }

 
  const store = async (e:any) =>{
    e.preventDefault()
    await addDoc(lugarCollection,{
      nombreT:nombreT,
      categoria:categoria,
      ciudad:ciudad,
      descripcion:descripcion,
    

    })
    setNombre('')
    setCategoria('')
    setCiduad('')
    setDescripcion('')
    setLat(0)
    setLog(0)
    //<input type="file" name="image" id="image" />
  }
  
 const getLocation = async() => {
  setLoading(true);
  try{
    const position = await Geolocation.getCurrentPosition();
    setPosition(position);
    setLat(position.coords.latitude);
    setLog(position.coords.longitude);
    setLoading(false);
  }catch(e){
    setLoading(false);
  }
 }
 let pos;
 let pos2;
 if (position) {
  
  pos = <IonInput >{lati}</IonInput>
  pos2= <IonInput >{logi}</IonInput>                    
}else{
  pos= <IonInput type="number" value={lati} onIonChange={e=> setLat(parseFloat(e.detail.value!))}></IonInput>
  pos2= <IonInput type="number" value={logi} onIonChange={e=> setLog(parseFloat(e.detail.value!))}></IonInput>    
}

     return (
        <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Elije</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent fullscreen>

          <form onSubmit={store}>
              <IonList>
                <IonItem>
                  <IonLabel position="floating"> Nombre del Turista:</IonLabel>
                  <IonInput value={nombreT} onIonChange={e=> setNombre(e.detail.value!)}/>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked"> Destinos Disponibles </IonLabel>           
                  <IonSelect placeholder="Destino" value={categoria} onIonChange={ e => setCategoria(e.detail.value!)}>
                    
                    <IonSelectOption value="Turistico"> Turistico </IonSelectOption>
                    <IonSelectOption value="Restaurante"> Restaurante </IonSelectOption>
                    <IonSelectOption value="Tienda"> Tienda</IonSelectOption>
                    <IonSelectOption value="Parques"> Parques</IonSelectOption>
                  </IonSelect>
                </IonItem>


                <IonItem>

                  <IonLabel position="floating"> Descripcion </IonLabel>
                  <IonInput value={descripcion} onIonChange={(e)=> setDescripcion(e.detail.value!)}></IonInput>   

                </IonItem>

                

              </IonList>

              <IonButton type="submit" routerLink="/Turista/Principal-Page"> Aceptar</IonButton>
          </form>

          
                 
        </IonContent>
      </IonPage>
    );
};

export default CreateTurist;