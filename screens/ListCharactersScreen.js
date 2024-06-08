import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import api from '../services/api';
import { useUser } from '../UserContext';

// ListCharactersScreen component
// List all characters for the authenticated user
// Uses the useFocusEffect hook to reload characters when the screen is focused
// Displays a list of characters with a touchable item to navigate to the CharacterDetail screen

const ListCharactersScreen = ({ navigation }) => { // ListCharactersScreen component
  const [characters, setCharacters] = useState([]); // Characters state
  const { user } = useUser(); // Destructure the user from the useUser hook

  const loadCharacters = async () => { // Load characters function
    try {
      const token = await SecureStore.getItemAsync('token'); // Get token from SecureStore
      const config = { // Configuration object
        headers: { // Headers object
          'x-auth-token': token, // Set token in request header
        },
      };
      const response = await api.get('/characters', config);
      setCharacters(response.data);
    } catch (error) {
      console.error('Error loading characters:', error);
    }
  };


  useFocusEffect( // useFocusEffect hook
    useCallback(() => { // Callback function
      loadCharacters(); // Load characters
    }, [])
  );

  const renderItem = ({ item }) => ( // Render item function
    <TouchableOpacity // TouchableOpacity component
      style={styles.item} // Style
      onPress={() => navigation.navigate('CharacterDetail', { character: item })} // Navigation to CharacterDetail screen
    >
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Return JSX
  // FlatList component to display the list of characters
  // TouchableOpacity component for each character item
  
  return (
    <View style={styles.container}>
      <FlatList
        data={characters}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3C2F2F',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#704214',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    color: '#FFD700',
    fontFamily: 'ConanFont',
  },
});

export default ListCharactersScreen;
