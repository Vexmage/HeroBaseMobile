import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const CharacterDetailScreen = ({ route, navigation }) => { // Destructure route and navigation props
  const { character } = route.params; // Destructure character from route.params

  const deleteCharacter = async () => { // Delete character function
    const existingCharacters = await SecureStore.getItemAsync('characters'); // Get characters from SecureStore
    let characters = existingCharacters ? JSON.parse(existingCharacters) : [];  // Parse characters if they exist
    const filteredCharacters = characters.filter(c => c.name !== character.name); // Filter out the character to delete
    
    await SecureStore.setItemAsync('characters', JSON.stringify(filteredCharacters)); // Update characters in SecureStore
    Alert.alert("Character Deleted", `${character.name} has been successfully deleted.`); // Alert user of successful deletion
    navigation.goBack(); // Navigate back to the previous screen
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
      <Button title="Delete Character" color="#B22222" onPress={() => deleteCharacter()} />
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
