import React from 'react'; // Import React
import { View, Text, Button, StyleSheet, Alert } from 'react-native'; // Import View, Text, Button, StyleSheet, and Alert components
import * as SecureStore from 'expo-secure-store'; // Import SecureStore from Expo
import api from '../services/api'; // Import api from services/api
import { Ionicons } from '@expo/vector-icons';

// CharacterDetailScreen component
// Displays the details of a character
// Allows the user to delete the character

const getClassIconName = (characterClass) => {
  switch (characterClass.toLowerCase()) {
    case 'fighter':
      return 'shield-outline';
    case 'cleric':
      return 'medkit-outline';
    case 'wizard':
      return 'sparkles-outline';
    case 'rogue':
      return 'skull-outline';
    case 'ranger':
      return 'leaf-outline';
    case 'bard':
      return 'musical-notes-outline';
    default:
      return 'person-outline';
  }
};

const CharacterDetailScreen = ({ route, navigation }) => { // CharacterDetailScreen component
  const { character } = route.params; // Destructure the character from the route params

const confirmDelete = () => {
  Alert.alert(
    'Delete Character',
    `Are you sure you want to delete ${character.name}?`,
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: handleDelete, style: 'destructive' },
    ]
  );
};

const handleDelete = async () => {
  try {
    const token = await SecureStore.getItemAsync('token');
    const config = {
      headers: { 'x-auth-token': token },
    };
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
      <View style={styles.classRow}>
        <Ionicons
          name={getClassIconName(character.characterClass)}
          size={22}
          color="#FFD700"
          style={styles.icon}
        />
        <Text style={styles.detail}>Class: {character.characterClass}</Text>
      </View>

      <Text style={styles.detail}>Strength: {character.stats.strength}</Text>
      <Text style={styles.detail}>Dexterity: {character.stats.dexterity}</Text>
      <Text style={styles.detail}>Constitution: {character.stats.constitution}</Text>
      <Text style={styles.detail}>Intelligence: {character.stats.intelligence}</Text>
      <Text style={styles.detail}>Wisdom: {character.stats.wisdom}</Text>
      <Text style={styles.detail}>Charisma: {character.stats.charisma}</Text>
      <Button title="Delete Character" color="#B22222" onPress={confirmDelete} />

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
  },
  classRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
},
icon: {
  marginRight: 8,
}
});

export default CharacterDetailScreen;
