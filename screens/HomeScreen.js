import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useUser } from '../UserContext';

export default function HomeScreen({ navigation }) {
  const { user } = useUser();

  useEffect(() => {
    const checkUser = async () => {
      if (!user) {
        const storedUser = await SecureStore.getItemAsync('user');
        if (storedUser) {
          console.log('User loaded from store:', storedUser);
        } else {
          console.log('No user in store');
        }
      }
    };

    checkUser();
  }, [user]);

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.welcomeText}>Hello, {user}</Text>
          <Button
            title="Create Character"
            onPress={() => navigation.navigate('CreateCharacter')}
            style={styles.button}
          />
          <Button
            title="View Characters"
            onPress={() => navigation.navigate('ListCharacters')}
            style={styles.button}
          />
        </>
      ) : (
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={() => navigation.navigate('Login')} style={styles.button} />
          <View style={styles.space} />
          <Button title="Register" onPress={() => navigation.navigate('Register')} style={styles.button} />
        </View>
      )}
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
  welcomeText: {
    fontSize: 22,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
  },
  space: {
    height: 20,
  }
});
