import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isLogin = () => {
    setIsLoggedIn(true);
  };

  const isLogout = () => {
    setIsLoggedIn(false);
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
