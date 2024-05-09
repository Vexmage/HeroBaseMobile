import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const ListCharactersScreen = ({ navigation }) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const loadCharacters = async () => {
      const charactersData = await SecureStore.getItemAsync('characters');
      if (charactersData) {
        setCharacters(JSON.parse(charactersData));
      }
    };

    loadCharacters();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('CharacterDetail', { character: item })} // Updated screen name
    >
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FlatList
        data={characters}
        renderItem={renderItem}
        keyExtractor={item => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});

export default ListCharactersScreen;
