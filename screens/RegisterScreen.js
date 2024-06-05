import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import api from '../services/api';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await api.post('/auth/register', { username, password });
      const { token } = response.data;
      await SecureStore.setItemAsync('token', token);
      await SecureStore.setItemAsync('user', username);
      setSuccessMessage('Registration successful! Redirecting to home...');
      setTimeout(() => {
        navigation.navigate('Home', { screen: 'HomeScreen' });
      }, 1000); // Delay navigation to show the success message
    } catch (error) {
      setErrorMessage('Registration failed: ' + (error.response?.data?.msg || error.message));
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
