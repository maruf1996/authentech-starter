import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import React, { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import app from '../Firebase/firebase.config';

export const AuthContext=createContext()

const auth = getAuth(app);
const ggogleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user,setUser]=useState('')
    const [loading,setLoading]=useState(false)

    const navigate=useNavigate()
    const location=useLocation()
    const from=location.state?.from?.pathname||'/'

    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUser=(name)=>{
        return updateProfile(auth.currentUser, {
            displayName: name
          }).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Sign up',
                text:'Sign up is successfully',
              })
            navigate(from,{replace:true})
          }).catch((error) => {
          });
    }

    const verifyEmail=()=>{
        sendEmailVerification(auth.currentUser)
        .then(() => {
        });
    }

    const signIn=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const resetPassword=(email)=>{
        return sendPasswordResetEmail(auth, email)
    }

    const signInGoogle=()=>{
        setLoading(true)
        return signInWithPopup(auth, ggogleProvider)
    }

    useEffect(()=>{
       const unsubscribe= onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                setLoading(false)
            } else {
            }
          });
        return unsubscribe
    },[])

    const logOut=()=>{
        signOut(auth).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Logout',
                text:'Log out is successfully',
              })
        window.location.reload();
          }).catch((error) => {
          });
    }
    
    const authInfo={
        createUser,
        signIn,
        user,
        updateUser,
        verifyEmail,
        signInGoogle,
        resetPassword,
        logOut,
        loading
    }
    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;