import * as SecureStore from 'expo-secure-store';
import React, { createContext, useEffect, useState } from 'react';

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

  const isLogin = (jwt) => {
    setIsLoggedIn(true);
    setJwtToken(jwt)
  };

  const isLogout = () => {
    setIsLoggedIn(false);
    SecureStore.deleteItemAsync('jwt');
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
        config
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
