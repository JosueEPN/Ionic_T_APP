import React, { useState, useEffect, useRef } from "react";
import {
  IonButtons,
  IonModal, IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
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
  IonToast,
} from "@ionic/react"; 
import { pencilOutline,pencilSharp,trashOutline,trashSharp,locationOutline,locateSharp } from 'ionicons/icons'
import {collection, getDocs,getDoc,deleteDoc, doc} from'firebase/firestore'
import { db } from "../../firebase";
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
  const modal1 = useRef<HTMLIonModalElement>(null);

  function confirm1() {
    modal1.current?.dismiss("Salir");
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
           <IonButton expand="block" routerLink="/Encargador/create-site">
             Añade un lugar
           </IonButton>
           <IonList>
             {" "}
             {lugares.map((lugares) => (
               <IonCard key={lugares.id}>
                 <img src={lugares.url} alt={lugares.nombre} />
                 <IonCardHeader>
                   <IonCardTitle>Nombre: {lugares.nombre}</IonCardTitle>
                 </IonCardHeader>
                 <IonCardContent>Ciudad: {lugares.ciudad}</IonCardContent>

                 <Link to={`/map/${lugares.lati}/${lugares.logi}`}>
                   <IonButton>
                     <IonIcon
                       slot="start"
                       ios={locationOutline}
                       md={locateSharp}
                     />
                   </IonButton>
                 </Link>
                 <IonButton id="open-modal1" expand="block">
                   Ver
                 </IonButton>
                 <IonModal ref={modal1} trigger="open-modal1">
                   <IonHeader>
                     <IonToolbar>
                       <IonTitle>{lugares.nombre}</IonTitle>
                       <IonButtons slot="start">
                         <IonButton onClick={() => modal1.current?.dismiss()}>
                           {" "}
                           Salir{" "}
                         </IonButton>
                       </IonButtons>
                     </IonToolbar>
                   </IonHeader>
                   <IonContent className="ion-padding">
                     <IonItem>
                       <img src={lugares.url} alt={lugares.nombre} />
                     </IonItem>
                     <IonItem>
                       <IonTitle> Descripcion </IonTitle>
                       {lugares.descripcion}
                     </IonItem>
                     <IonItem>
                       <IonTitle> Categoria </IonTitle>
                       {lugares.categoria}
                     </IonItem>
                     <IonItem>
                       <IonTitle> Ciudad </IonTitle>
                       {lugares.ciudad}
                     </IonItem>
                   </IonContent>
                 </IonModal>
               </IonCard>
             ))}
           </IonList>
         </IonContent>
       </IonPage>
     );
};

export default IndexEnca;