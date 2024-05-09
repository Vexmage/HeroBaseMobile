import React, { createContext, useContext, useState, useEffect } from 'react'; // Importing createContext, useContext, useState, and useEffect
import * as SecureStore from 'expo-secure-store'; // Import SecureStore

const UserContext = createContext(null); // Create a context for the user

export const UserProvider = ({ children }) => { // Create a provider for the user
    const [user, setUser] = useState(null); // Initialize user state

    useEffect(() => { // Check for user in SecureStore if not in context
        SecureStore.getItemAsync('user').then(storedUser => { // Get user from SecureStore
            setUser(storedUser); // Set user in context
        });
    }, []);

    const loginUser = async (username) => { // Login user
        await SecureStore.setItemAsync('user', username); // Store user in SecureStore
        setUser(username); // Set user in context
    };

    const logoutUser = async () => { // Logout user
        await SecureStore.deleteItemAsync('user'); // Remove user from SecureStore
        setUser(null); // Remove user from context
    };

    return ( 
        <UserContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext); // Create a hook to use the user context
