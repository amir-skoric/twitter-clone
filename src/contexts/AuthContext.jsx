import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function setdisplayname(displayName) {
    return updateProfile(auth.currentUser, {
      displayName: displayName
    })
  }

  function signin(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false)
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    signup,
    signin,
    signout,
    setdisplayname
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
