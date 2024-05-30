import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = (username) => {
    setUser(username);
  };

  const logoutUser = async () => {
    await SecureStore.deleteItemAsync('token');
    setUser(null);
  };

  useEffect(() => {
    const loadUser = async () => {
      const token = await SecureStore.getItemAsync('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken.user.username);
      }
    };
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
