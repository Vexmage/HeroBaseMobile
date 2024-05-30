import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';

const ListCharactersScreen = ({ navigation }) => { // Passing navigation prop
  const [characters, setCharacters] = useState([]); // Initialize characters state

  const loadCharacters = async () => { // Load characters from SecureStore
    const charactersData = await SecureStore.getItemAsync('characters'); // Get characters from SecureStore
    if (charactersData) { // If characters exist
      setCharacters(JSON.parse(charactersData)); // Set characters in state
    } else {
      setCharacters([]);  // Ensure to reset the state if there are no characters
    }
  };

  useFocusEffect( // Use useFocusEffect hook
    useCallback(() => { // Callback function
      loadCharacters(); // Call loadCharacters function
    }, [])
  );

  const renderItem = ({ item }) => ( // Render character item
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
        keyExtractor={item => item.name}
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
