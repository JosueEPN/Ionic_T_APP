import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyD4Sl0FHs2MsTybkr5KGjJuqFc7kNDr_Uc",
  authDomain: "arduinoproyectjosin.firebaseapp.com",
  databaseURL: "https://arduinoproyectjosin-default-rtdb.firebaseio.com",
  projectId: "arduinoproyectjosin",
  storageBucket: "arduinoproyectjosin.appspot.com",
  messagingSenderId: "377656321437",
  appId: "1:377656321437:web:31d9ef729148f68582bb74",
  measurementId: "G-KSXYTB69ZB"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)