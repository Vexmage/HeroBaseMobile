import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import api from '../services/api';
import * as SecureStore from 'expo-secure-store';

const SaveCharacterButton = ({ character, navigation }) => { // SaveCharacterButton component
  const saveCharacter = async () => { // Save character
    try {
      const token = await SecureStore.getItemAsync('token'); // Get token from SecureStore
      if (!token) { // If token is not found
        alert('User is not authenticated');
        return;
      }
// Save character
      const config = { // Configuration object
        headers: {
          'x-auth-token': token, // Set token in request header
        },
      };

      console.log('Saving character:', character); // Debug log
      const response = await api.post('/characters', character, config);
      console.log('Character saved response:', response.data); // Debug log
      alert('Character saved successfully!');
      navigation.navigate('Home'); // Navigate to Home screen -- may be an issue
    } catch (e) {
      console.error('Error saving character:', e.response ? e.response.data : e.message); // Detailed error log
      alert('Failed to save the character.');
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={saveCharacter}>
      <Text style={styles.buttonText}>Save Character</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#704214',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 50,
    marginBottom: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFD700',
    fontSize: 18,
  },
});

export default SaveCharacterButton;
