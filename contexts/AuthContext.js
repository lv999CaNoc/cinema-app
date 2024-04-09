import * as SecureStore from 'expo-secure-store';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwtToken, setJwtToken] = useState(null)
  const [userRoles, setUserRoles] = useState([])
  const [dob, setDob] = useState()

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const jwt = await SecureStore.getItemAsync('jwt');
        const roles = await SecureStore.getItemAsync('roles');
        const dob = await SecureStore.getItemAsync('dob');
        if (jwt){
          setIsLoggedIn(true)
          setJwtToken(jwt)
          setUserRoles(JSON.parse(roles))
          setDob(dob)

          console.log(roles);
          console.log("DOB: "+ dob);
        }else setIsLoggedIn(false);
      } catch (error) {
        console.log('Error checking login status:', error);
      }
    };
    
    checkLoginStatus();
    console.log("AuthProvider run checkLoginStatus()");
  }, []);

  const isLogin = (jwt, roles, dob) => {
    setIsLoggedIn(true);
    setJwtToken(jwt)
    setUserRoles(roles)
    setDob(dob)
  };

  const isLogout = () => {
    setIsLoggedIn(false);
    SecureStore.deleteItemAsync('jwt');
    SecureStore.deleteItemAsync('roles');
    SecureStore.deleteItemAsync('dob');
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+jwtToken,
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLogin,
        isLogout,
        userRoles,
        dob,
        config
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
