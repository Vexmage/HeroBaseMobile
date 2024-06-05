import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const CharacterInput = ({ value, onChange }) => {
  const [error, setError] = useState('');

  const handleChange = (text) => {
    if (text.length > 0 && !/^[A-Za-z]/.test(text)) {
      setError('Name must start with a letter');
    } else if (text.length > 0 && text.length < 2) {
      setError('Name must be at least 2 characters long');
    } else {
      setError('');
    }
    onChange(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Character Name"
        value={value}
        onChangeText={handleChange}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: '#FFD700',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#FFD700',
    fontFamily: 'ConanFont',
  },
  error: {
    color: 'red',
    fontSize: 14,
  },
});

export default CharacterInput;
