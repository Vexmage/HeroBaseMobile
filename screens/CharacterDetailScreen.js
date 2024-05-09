import React, { useState } from 'react';

import { View, Text, StyleSheet } from 'react-native';

const CharacterDetailScreen = ({ route }) => {
  const { character } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Name: {character.name}</Text>
      <Text style={styles.detail}>Ancestry: {character.ancestry}</Text>
      <Text style={styles.detail}>Background: {character.background}</Text>
      <Text style={styles.detail}>Class: {character.characterClass}</Text>
      <Text style={styles.detail}>Strength: {character.stats.strength}</Text>
      <Text style={styles.detail}>Dexterity: {character.stats.dexterity}</Text>
      <Text style={styles.detail}>Constitution: {character.stats.constitution}</Text>
      <Text style={styles.detail}>Intelligence: {character.stats.intelligence}</Text>
      <Text style={styles.detail}>Wisdom: {character.stats.wisdom}</Text>
      <Text style={styles.detail}>Charisma: {character.stats.charisma}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  },
  detail: {
    fontSize: 18,
    marginBottom: 5
  }
});

export default CharacterDetailScreen;
