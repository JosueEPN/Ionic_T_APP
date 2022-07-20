import React, { useState, useEffect, useRef }from "react";
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,
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
  IonModal
} from '@ionic/react'; 
import { locateSharp, locationOutline} from 'ionicons/icons'
import {collection, getDocs} from'firebase/firestore'
import { db } from "../../firebase";
import { lugar } from "../../modelo/lugar";
import { Link } from "react-router-dom";


const Parques: React.FC = () => {

  const [lugares, setLugares] = useState< lugar[] > ([])
  const url = 0;


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
        lati:doc.data().lati,
        logi:doc.data().logi,
        url:doc.data().url        
      };
      lista.push(obj);
    });
    setLugares(lista)
  }
    const modal1 = useRef<HTMLIonModalElement>(null);
    
 

    function confirm1() {
      modal1.current?.dismiss('Salir');
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
            <IonTitle>Parques</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent fullscreen>
                <IonList> {lugares.filter( lugares => lugares.categoria == "Parques").map( lugares => (
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

                          

                         <IonButton id="open-modal1" expand="block">
                           Ver
                         </IonButton>
                         <Link to={`/map/${lugares.lati}/${lugares.logi}`}>
                            <IonButton  expand="block">
                                <IonIcon slot="start" ios={locationOutline} md={locateSharp} />
                            </IonButton>  
                          </Link>



                         <IonModal ref={modal1} trigger="open-modal1">
                         <IonHeader>
                           <IonToolbar>                             
                             <IonTitle>{lugares.nombre}</IonTitle>
                             <IonButtons slot="start">
                               <IonButton onClick={() => modal1.current?.dismiss()}> Salir </IonButton>
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
                    )) }
                 </IonList>
                 
        </IonContent>
      </IonPage>
    );
};

export default Parques;