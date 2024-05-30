import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import api from '../services/api';
import { useUser } from '../UserContext';

const ListCharactersScreen = ({ navigation }) => {
  const [characters, setCharacters] = useState([]);
  const { user } = useUser();

  const loadCharacters = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      const response = await api.get('/characters', config);
      setCharacters(response.data);
    } catch (error) {
      console.error('Error loading characters:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadCharacters();
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('CharacterDetail', { character: item })}
    >
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={characters}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3C2F2F',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#704214',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    color: '#FFD700',
    fontFamily: 'ConanFont',
  },
});

export default ListCharactersScreen;
