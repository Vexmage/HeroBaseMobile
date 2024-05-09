import React, { useState } from 'react'; // Importing useState
import { View, TextInput, Button, Text, StyleSheet } from 'react-native'; // Importing components
import * as SecureStore from 'expo-secure-store'; // Import SecureStore

export default function RegisterScreen({ navigation }) { // Passing navigation prop
  const [username, setUsername] = useState(''); // Username state
  const [password, setPassword] = useState(''); // Password state
  const [confirmPassword, setConfirmPassword] = useState(''); // Confirm password state
  const [errorMessage, setErrorMessage] = useState(''); // Error message state


const handleRegister = async () => { // Handle registration
  if (password !== confirmPassword) { // Check if passwords match
      setErrorMessage('Passwords do not match'); // Update error message
      return;
  }
  // Check if user already exists
  const userExists = await SecureStore.getItemAsync(username); // Get user from SecureStore
  if (userExists) { 
      setErrorMessage('Username already taken');
      return;
  }
  await SecureStore.setItemAsync(username, password); // Store user in SecureStore
  await SecureStore.setItemAsync('user', username);  // Log in the user immediately
  navigation.navigate('Home'); // Navigate to the Home screen
};


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
  },
});
