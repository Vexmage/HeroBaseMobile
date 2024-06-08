import React, { useState } from 'react'; // Import React and useState hook
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native'; // Import components from React Native
import * as SecureStore from 'expo-secure-store'; // SecureStore for storing sensitive data
import api from '../services/api'; // Import the API module

export default function RegisterScreen({ navigation }) { // Navigation prop is passed to the component
  const [username, setUsername] = useState(''); // Username state
  const [password, setPassword] = useState(''); // Password state
  const [confirmPassword, setConfirmPassword] = useState(''); // Confirm password state
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const [successMessage, setSuccessMessage] = useState(''); // Success message state

  const handleRegister = async () => { // Handle registration
    setErrorMessage(''); // Clear error message
    setSuccessMessage(''); // Clear success message

    if (password !== confirmPassword) { // If passwords do not match
      setErrorMessage('Passwords do not match'); // Set error message
      return;
    }

    try { // Try block for registration
      const response = await api.post('/auth/register', { username, password }); // Send registration request
      const { token } = response.data; // Extract token from response data
      await SecureStore.setItemAsync('token', token); // Store the token in SecureStore
      await SecureStore.setItemAsync('user', username); // Store the username in SecureStore
      setSuccessMessage('Registration successful! Redirecting to Welcome Screen, please login.'); // Set success message
      setTimeout(() => { // Delay navigation
        navigation.navigate('Welcome', { screen: 'WelcomeScreen' }); // Navigate to the Welcome screen
      }, 1000); // Delay navigation to show the success message
    } catch (error) { // Catch any errors
      setErrorMessage('Registration failed: ' + (error.response?.data?.msg || error.message)); // Set error message
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#FFD700" // Golden text color for placeholder
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#FFD700" // Golden text color for placeholder
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        placeholderTextColor="#FFD700" // Golden text color for placeholder
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#3C2F2F', // Dark Reddish-Brown background
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#8C7853', // Bronze border
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#FFD700', // Golden text color
    fontFamily: 'ConanFont', // Custom font
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  success: {
    color: 'green',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#704214', // Dark Wood color
    width: '80%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFD700', // Golden text
    fontSize: 18,
  }
});
