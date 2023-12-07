import React, { createContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwtToken, setJwtToken] = useState(null)
  
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const jwt = await SecureStore.getItemAsync('jwt');
        if (jwt){
          setIsLoggedIn(true)
          setJwtToken(jwt)
        }else setIsLoggedIn(false);
      } catch (error) {
        console.log('Error checking login status:', error);
      }
    };
    
    checkLoginStatus();
    console.log("AuthProvider run checkLoginStatus()");
  }, []);

  const isLogin = () => {
    setIsLoggedIn(true);
  };

  const isLogout = () => {
    setIsLoggedIn(false);
    SecureStore.deleteItemAsync('jwt');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLogin,
        isLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
