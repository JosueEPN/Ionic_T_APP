import React, { useEffect, useState }from "react";
import {IonList, IonItem, IonLabel,IonInput, IonSelect, IonSelectOption,IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton, IonLoading} from '@ionic/react';
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { ref, uploadBytesResumable,getDownloadURL, uploadBytes} from "firebase/storage";
import { image } from "ionicons/icons";



const CreateEnca: React.FC = () => {


  const [nombre, setNombre] = useState('')
  const [categoria, setCategoria] = useState('')
  const [ciudad, setCiduad ] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [lati, setLat] = useState(0)
  const [logi, setLog] = useState(0)
  const [url1,setUrl1] =useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const [position, setPosition] = useState<Geoposition>()
  const [Imagen, setImagen] = useState<any>(null);
  

  const lugarCollection = collection(db, "Lugares")

  if(!navigator.geolocation){
    alert('Tu navegador no tiene la opcion de ubicacion');
    throw new Error('Tu navegador no tiene la opcion de ubicacion')
  }

  useEffect (()=>{
    const uploadFile = () =>{

      const FileName = Imagen.name + '_' + (new Date()).getTime();
      const storageRef = ref(storage,`/Img/${FileName}`);
  
  
      const uploadTask = uploadBytesResumable(storageRef, Imagen);
      uploadTask.on('state_changed',
          (snapshot) => {
            
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
          },
        () => {
         
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const URLPRI = String(downloadURL)
            setUrl1(URLPRI)
            setImagen(null)
          });
        }
      );
  
    };
    Imagen && uploadFile();
  },[Imagen]);


      
 


  const store = async (e:any) =>{

   

    console.log('este es el url:  ' + url1)
    e.preventDefault()
    await addDoc(lugarCollection,{
      nombre:nombre,
      categoria:categoria,
      ciudad:ciudad,
      descripcion:descripcion,
      lati:lati,
      logi:logi,
      url:url1,

    })

    setNombre('')
    setCategoria('')
    setCiduad('')
    setDescripcion('')
    setLat(0)
    setLog(0)
    setUrl1('')

  
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
    if(lati < 0 || lati > 0){
    pos = <IonInput >{lati}</IonInput>
    pos2= <IonInput >{logi}</IonInput>     
    }else{

      pos = <IonLabel >Vuelva a cargar la coordenadas</IonLabel>
      pos2= <IonLabel >Vuelva a cargar la coordenadas</IonLabel>

    }
                   
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
            <IonTitle> Crea un lugar</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent fullscreen>

          <form onSubmit={store}>
              <IonList>
                <IonItem>
                  <IonLabel position="floating"> Nombre </IonLabel>
                  <IonInput value={nombre} onIonChange={e=> setNombre(e.detail.value!)}/>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked"> Categoria </IonLabel>           
                  <IonSelect placeholder="Categoria" value={categoria} onIonChange={ e => setCategoria(e.detail.value!)}>
                    <IonSelectOption value="Turistico"> Turistico </IonSelectOption>
                    <IonSelectOption value="Restaurante"> Restaurante </IonSelectOption>
                    <IonSelectOption value="Tienda"> Tienda</IonSelectOption>
                    <IonSelectOption value="Parques"> Parques</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked"> Ciudad </IonLabel>           
                  <IonSelect placeholder="Categoria" value={ciudad} onIonChange={e=> setCiduad(e.detail.value!)}>
                    <IonSelectOption value="Quito"> Quito </IonSelectOption>
                    <IonSelectOption value="Guayaquill"> Guayaquill </IonSelectOption>
                    <IonSelectOption value="Cuenca"> Cuenca</IonSelectOption>
                    <IonSelectOption value="Manabi"> Manabi</IonSelectOption>
                    <IonSelectOption value="Esmeraldas"> Esmeraldas </IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem>

                  <IonLabel position="floating"> Descripcion </IonLabel>
                  <IonInput value={descripcion} onIonChange={(e)=> setDescripcion(e.detail.value!)}></IonInput>   

                </IonItem>

                <IonItem>
                  
                  <IonLoading 
                  isOpen={loading}
                  message={"Obteniendo......"}
                  onDidDismiss={()=> setLoading(false)} />
                  <IonButton onClick={getLocation}> Localizacion Actual </IonButton> 
                  <IonLabel > Ubicacion de Lugar: </IonLabel>
                  {pos}
                  {pos2} 

                </IonItem>

                <IonItem>

                <IonLabel > Carga una imagen: </IonLabel>

                  
                 <input type="file" name="imagen" onChange={(event:any) => setImagen(event.target.files[0])} />

                </IonItem>

              </IonList>

              <IonButton disabled={url1 === ''} type="submit" routerLink="/Encargado/Principal-Page" > Crear</IonButton>
          </form>

          
                 
        </IonContent>
      </IonPage>
    );
};

export default CreateEnca;


