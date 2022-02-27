import { useEffect, createContext, useState, useContext } from "react";
import { auth } from "../firebase/config";
import { useHistory } from "react-router-dom";
const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}
export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();

  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function signIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function signOut() {
    return auth.signOut();
  }
  useEffect(() => {
    const unsubsrciber = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setCurrentUser({ displayName, email, uid, photoURL });
        return;
      }
    });
    return () => {
      unsubsrciber();
    };
  }, []);
  const value = {
    currentUser,
    signIn,
    signUp,
    signOut,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
