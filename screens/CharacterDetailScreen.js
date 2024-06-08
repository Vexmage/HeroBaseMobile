import React from 'react'; // Import React
import { View, Text, Button, StyleSheet, Alert } from 'react-native'; // Import View, Text, Button, StyleSheet, and Alert components
import * as SecureStore from 'expo-secure-store'; // Import SecureStore from Expo
import api from '../services/api'; // Import api from services/api

// CharacterDetailScreen component
// Displays the details of a character
// Allows the user to delete the character

const CharacterDetailScreen = ({ route, navigation }) => { // CharacterDetailScreen component
  const { character } = route.params; // Destructure the character from the route params

  const deleteCharacter = async () => { // Delete character function
    try {
      const token = await SecureStore.getItemAsync('token'); // Get token from SecureStore
      const config = { // Configuration object
        headers: { // Headers object
          'x-auth-token': token, // Set token in request header
        },
      };
      console.log(`Deleting character with ID: ${character._id}`); // Debug log
      await api.delete(`/characters/${character._id}`, config);
      Alert.alert('Character Deleted', `${character.name} has been successfully deleted.`);
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting character:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Name: {character.name}</Text>
      <Text style={styles.detail}>Ancestry: {character.ancestry}</Text>
      <Text style={styles.detail}>Background: {character.background}</Text>
      <Text style={styles.detail}>Class: {character.characterClass}</Text>
      <Text style={styles.detail}>Strength: {character.stats.strength}</Text>
      <Text style={styles.detail}>Dexterity: {character.stats.dexterity}</Text>
      <Text style={styles.detail}>Constitution: {character.stats.constitution}</Text>
      <Text style={styles.detail}>Intelligence: {character.stats.intelligence}</Text>
      <Text style={styles.detail}>Wisdom: {character.stats.wisdom}</Text>
      <Text style={styles.detail}>Charisma: {character.stats.charisma}</Text>
      <Button title="Delete Character" color="#B22222" onPress={deleteCharacter} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#3C2F2F',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFD700',
    fontFamily: 'ConanFont',
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
    color: '#FFD700',
    fontFamily: 'ConanFont',
  }
});

export default CharacterDetailScreen;
