import React, { useState } from 'react'; // Import React and useState
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native'; // Import View, TextInput, Text, StyleSheet, and TouchableOpacity components
import * as SecureStore from 'expo-secure-store'; // Import SecureStore for storing sensitive data
import api from '../services/api'; // Import the API module
import { useUser } from '../UserContext'; // Import the useUser hook

function LoginScreen({ navigation }) { // LoginScreen component
  const { loginUser } = useUser(); // Destructure the loginUser function from the useUser hook
  const [username, setUsername] = useState(''); // Username state
  const [password, setPassword] = useState(''); // Password state
  const [error, setError] = useState(''); // Error state

  const handleLogin = async () => { // Handle login
    try { // Try to login
      const payload = { username, password }; // Payload object with username and password
      console.log('Sending payload:', payload); // Debug log
      const response = await api.post('/auth/login', payload); // Send login request
      const { token } = response.data; // Extract token from response data

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
