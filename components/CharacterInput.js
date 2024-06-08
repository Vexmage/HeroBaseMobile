import React, { useState } from 'react'; // Import React and useState
import { View, TextInput, Text, StyleSheet } from 'react-native'; // Import View, TextInput, Text, and StyleSheet components

// CharacterInput component
const CharacterInput = ({ value, onChange }) => { // CharacterInput component
  const [error, setError] = useState(''); // Error state

  // Handle input change
  const handleChange = (text) => { // Handle input change
    if (text.length > 0 && !/^[A-Za-z]/.test(text)) { // Check if name starts with a letter
      setError('Name must start with a letter');
    } else if (text.length > 0 && text.length < 2) { // Check if name is at least 2 characters long
      setError('Name must be at least 2 characters long');
    } else { // Reset error
      setError('');
    }
    onChange(text); // Update value
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
