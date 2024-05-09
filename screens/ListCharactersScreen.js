import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ListCharactersScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Character listing is currently in development.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: 'grey'
  }
});

export default ListCharactersScreen;
