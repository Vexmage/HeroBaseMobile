import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import api from '../services/api';
import { useUser } from '../UserContext';

function LoginScreen({ navigation }) {
  const { loginUser } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const payload = { username, password };
      console.log('Sending payload:', payload); // Debug log
      const response = await api.post('/auth/login', payload);
      const { token } = response.data;

      await SecureStore.setItemAsync('token', token); // Store the token

      loginUser(username); // Set the user context with the username
      navigation.navigate('Home'); // Navigate to the Home drawer
    } catch (error) {
      if (error.response) {
        console.error('Login error response data:', error.response.data);
        console.error('Login error response status:', error.response.status);
        console.error('Login error response headers:', error.response.headers);
        setError(error.response.data.msg || 'Invalid credentials');
      } else if (error.request) {
        console.error('Login error request:', error.request);
        setError('No response from server');
      } else {
        console.error('Login error message:', error.message);
        setError('Error in setting up the request');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        placeholderTextColor="#FFD700"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor="#FFD700"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
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
    backgroundColor: '#3C2F2F'
  },
  input: {
    height: 40,
    borderColor: '#8C7853',
    borderWidth: 1,
    width: '80%',
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#FFD700',
    fontFamily: 'ConanFont',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#704214',
    width: '80%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFD700',
    fontSize: 18,
  }
});

export default LoginScreen;
