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
import { getStorage, ref, getDownloadURL  } from "firebase/storage";



import { Link } from "react-router-dom";



const IndexEnca: React.FC = () => {

  const [lugares, setLugares] = useState< lugar[] > ([])


  const lugarCollection = collection(db, "Lugares")
  const storage = getStorage();


  
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
        lati:doc.data().lati,
        logi:doc.data().logi,
        url:doc.data().url    
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
            <IonTitle>Registro de Lugar</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent fullscreen>
        <IonButton expand="block" routerLink="/Encargador/create-site">Añade un lugar</IonButton>
                <IonList> {
                    lugares.map(lugares  => (
                        <IonCard key={lugares.id} >
                          <img src={lugares.url} alt={lugares.nombre} />
                            <IonCardHeader>
                                <IonCardTitle>Nombre: {
                                    lugares.nombre
                                }</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                               Ciudad: {lugares.ciudad}
                            </IonCardContent>

                            <Link to={`/Encargado/edit/${lugares.id}`}>
                              <IonButton>
                                <IonIcon slot="start" ios={pencilOutline} md={pencilSharp} />
                              </IonButton>                              
                            </Link> 
                            <IonButton onClick={()=> eliminar(''+ lugares.id)} >
                              <IonIcon slot="start" ios={trashOutline} md={trashSharp} />
                            </IonButton>                              
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

export default IndexEnca;