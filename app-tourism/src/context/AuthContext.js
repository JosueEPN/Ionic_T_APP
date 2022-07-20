import { createContext, useContext, useEffect, useState } from "react";
import { auth, app } from "../firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  getDoc,
} from "firebase/firestore";

const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
   const firestore = getFirestore(app);

  const signup = async (email, password, rol) => {
    const userData = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((userFirebase) => {
      return userFirebase;
    });
    setLoading(true)
    const docPath = doc(firestore, `usuarios/${userData.user.uid}`);
    setDoc(docPath, { correo: email, rol: rol });
  };
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);

  };
  const getRol = async (uid) =>{
    const docPath = doc(firestore, `usuarios/${uid}`);
    const docCifrada = await getDoc(docPath);
    const userRol = docCifrada.data().rol;
    return userRol;
  } 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if(currentUser){
        getRol(currentUser.uid).then((rol) => {
          const userData = {
            uid: currentUser.uid,
            email: currentUser.email,
            rol: rol,
          };
          setUser(userData);
          setLoading(false);
        });
        //setLoading(false);
        console.log("authcontext: usuario q inició sesión", currentUser);
        //setUser(currentUser);
      }else{
        setUser(null)
      }
    });
    return () => unsubscribe();
  }, []);
  const logout = () => signOut(auth); 

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        user,
        logout,
        loading
      }}
    >
      {children}
    </authContext.Provider>
  );
}
