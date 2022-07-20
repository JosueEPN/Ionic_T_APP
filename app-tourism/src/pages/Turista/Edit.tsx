import React from 'react'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import { useEffect, useState } from 'react';
import { getDoc,updateDoc,doc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { useParams } from 'react-router-dom';


const EditTurist: React.FC = () => {
    const [nombre, setNombre] = useState('')
    const [categoria, setCategoria] = useState('')
    const [ciudad, setCiduad ] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [lati, setLat] = useState(0)
    const [logi, setLog] = useState(0)

    //const { id } = useParams;
  

    const update = async (e:any) =>{

        e.preventDefault()
        const Lugares = doc(db,"Lugares")
        const data = {
            nombre:nombre,
            categoria:categoria,
            ciudad:ciudad,
            descripcion:descripcion,
            lati:lati,
            logi:logi,
        }
        await updateDoc(Lugares,data)

    }
    const getLugaresById = async () =>{

    }
    useEffect(()=>{
        getLugaresById()
    },[])

  return (
    <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle> Edit lugar</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent fullscreen>
                 
        </IonContent>
      </IonPage>
  )
}

export default EditTurist;