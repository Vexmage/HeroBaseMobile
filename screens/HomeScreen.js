import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useUser } from '../UserContext';
import { Ionicons } from '@expo/vector-icons';


export default function HomeScreen({ navigation }) {
  const { user, setUser } = useUser();

  useEffect(() => {
    const checkUser = async () => {
      if (!user) {
        const storedUser = await SecureStore.getItemAsync('user');
        if (storedUser) {
          setUser(storedUser);
        }
      }
    };
    checkUser();
  }, [user, setUser]);

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.welcomeText}>Hello, {user}</Text>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateCharacter')}>
            <View style={styles.buttonContent}>
              <Ionicons name="create-outline" size={20} color="#FFD700" style={styles.icon} />
              <Text style={styles.buttonText}>Create Character</Text>
            </View>
          </TouchableOpacity>



          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListCharacters')}>
            <View style={styles.buttonContent}>
              <Ionicons name="person-outline" size={20} color="#FFD700" style={styles.icon} />
              <Text style={styles.buttonText}>View Characters</Text>
            </View>
          </TouchableOpacity>



        </>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.space} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
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
    backgroundColor: '#3C2F2F',
  },
  welcomeText: {
    fontSize: 22,
    marginBottom: 20,
    color: '#FFD700',
    fontFamily: 'ConanFont',
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
button: {
  backgroundColor: '#704214',
  padding: 10,
  alignItems: 'center',
  borderRadius: 10,
  width: '80%',
  marginBottom: 10,
  elevation: 3,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
},

  buttonText: {
    color: '#FFD700',
    fontSize: 18,
  },
  buttonContent: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },

  space: {
    height: 20,
  }
});
