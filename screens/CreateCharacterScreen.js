// Import necessary hooks and components
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import CustomPicker from '../components/CustomPicker';
import StatRollModal from '../components/StatRollModal';
import api from '../services/api'; // Import the API service 
import * as SecureStore from 'expo-secure-store';

import dwarf from '../data/ancestries/dwarf.json';
import elf from '../data/ancestries/elf.json';
import halfling from '../data/ancestries/halfling.json';
import human from '../data/ancestries/human.json';

const ancestries = { dwarf, elf, halfling, human };
const statsOrder = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
const backgrounds = ["Soldier", "Scholar", "Farmer", "Merchant"];
const classes = ["Warrior", "Mage", "Rogue", "Priest"];

const CreateCharacterScreen = ({ navigation }) => { // Add navigation prop
  const [character, setCharacter] = useState({ // Initialize character state
    name: '', // Add name field
    ancestry: Object.keys(ancestries)[0], // Set default ancestry
    background: backgrounds[0], // Set default background
    characterClass: classes[0], // Set default class
    stats: { // Add stats object
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0
    }
  });

  const [rollCounts, setRollCounts] = useState({ // Initialize rollCounts state
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0
  });
  const [currentStatIndex, setCurrentStatIndex] = useState(0); // Initialize currentStatIndex state
  const [ancestryModalVisible, setAncestryModalVisible] = useState(false); // Initialize ancestryModalVisible state
  const [backgroundModalVisible, setBackgroundModalVisible] = useState(false); // Initialize backgroundModalVisible state
  const [classModalVisible, setClassModalVisible] = useState(false); // Initialize classModalVisible state
  const [statModalVisible, setStatModalVisible] = useState(false); // Initialize statModalVisible state

  const handleChange = (value, field) => { // Update handleChange function
    setCharacter({ ...character, [field]: value }); // Update character state
  };

  const rollStat = () => { // Update rollStat function
    let rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1); // Roll 4d6
    rolls.sort(); // Sort the rolls
    rolls.shift(); // Drop the lowest roll
    return rolls.reduce((a, b) => a + b, 0); // Sum the remaining rolls
  };

  const handleRoll = () => { // Update handleRoll function
    const newStatValue = rollStat(); // Roll a new stat value
    const updatedStats = { ...character.stats, [statsOrder[currentStatIndex]]: newStatValue }; // Update the stats object
    const updatedRollCounts = { ...rollCounts, [statsOrder[currentStatIndex]]: rollCounts[statsOrder[currentStatIndex]] + 1 }; // Update the rollCounts object

    setCharacter({ ...character, stats: updatedStats }); // Update the character state
    setRollCounts(updatedRollCounts); // Update the rollCounts state
  };

  const finalizeStat = () => { // Update finalizeStat function
    if (currentStatIndex < statsOrder.length - 1) { // Check if there are more stats to roll
      setCurrentStatIndex(currentStatIndex + 1); // Move to the next stat
    } else {
      setStatModalVisible(false); // Close the modal when all stats are rolled
      setCurrentStatIndex(0); // Reset the currentStatIndex
      saveCharacter(character); // Save the character when all stats are rolled
    }
  };

  const saveCharacter = async (characterData) => {
    try {
      const token = await SecureStore.getItemAsync('token');
      console.log('Token from SecureStore:', token); // Debug log
      if (!token) {
        alert('User is not authenticated');
        return;
      }
  
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
  
      const response = await api.post('/characters', characterData, config);
      alert('Character saved successfully!');
    } catch (e) {
      alert('Failed to save the character.');
      console.error(e);
    }
  };
  
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <TextInput
          style={styles.input}
          placeholder="Character Name"
          value={character.name}
          onChangeText={text => handleChange(text, 'name')}
        />
        <CustomPicker
          selectedValue={character.ancestry}
          onValueChange={(value) => handleChange(value, 'ancestry')}
          items={Object.keys(ancestries)}
          descriptions={ancestries}
          modalVisible={ancestryModalVisible}
          onOpenModal={() => setAncestryModalVisible(true)}
          onCloseModal={() => setAncestryModalVisible(false)}
        />
        <CustomPicker
          selectedValue={character.background}
          onValueChange={(value) => handleChange(value, 'background')}
          items={backgrounds}
          modalVisible={backgroundModalVisible}
          onOpenModal={() => setBackgroundModalVisible(true)}
          onCloseModal={() => setBackgroundModalVisible(false)}
        />
        <CustomPicker
          selectedValue={character.characterClass}
          onValueChange={(value) => handleChange(value, 'characterClass')}
          items={classes}
          modalVisible={classModalVisible}
          onOpenModal={() => setClassModalVisible(true)}
          onCloseModal={() => setClassModalVisible(false)}
        />
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => setStatModalVisible(true)}>
        <Text style={styles.buttonText}>Start Rolling Stats</Text>
      </TouchableOpacity>
      <StatRollModal
        modalVisible={statModalVisible}
        onClose={() => setStatModalVisible(false)}
        statName={statsOrder[currentStatIndex]}
        rollCount={rollCounts[statsOrder[currentStatIndex]]}
        currentRoll={character.stats[statsOrder[currentStatIndex]]}
        onRoll={handleRoll}
        onAccept={finalizeStat}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3C2F2F',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 10,
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
  button: {
    backgroundColor: '#704214',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 50, // Smaller width by reducing horizontal margin
    marginBottom: 10,
    alignSelf: 'center', // Center button horizontally
  },
  buttonText: {
    color: '#FFD700',
    fontSize: 18,
  },
    modalText: { // Assuming you have texts in your modals
    color: '#FFD700', // Set modal text color to golden
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  }
});
export default CreateCharacterScreen;
