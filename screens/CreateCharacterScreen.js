import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import CustomPicker from '../components/CustomPicker';
import StatRollModal from '../components/StatRollModal';
import dwarf from '../data/ancestries/dwarf.json';
import elf from '../data/ancestries/elf.json';
import halfling from '../data/ancestries/halfling.json';
import human from '../data/ancestries/human.json';

const ancestries = { dwarf, elf, halfling, human };
const statsOrder = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
const backgrounds = ["Soldier", "Scholar", "Farmer", "Merchant"];
const classes = ["Warrior", "Mage", "Rogue", "Priest"];

const CreateCharacterScreen = ({ navigation }) => {
  const [character, setCharacter] = useState({
    name: '',
    ancestry: Object.keys(ancestries)[0],
    background: backgrounds[0],
    characterClass: classes[0],
    stats: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0
    }
  });
  const [rollCounts, setRollCounts] = useState({
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0
  });
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (value, field) => {
    setCharacter({ ...character, [field]: value });
  };

  const rollStat = () => {
    let rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
    rolls.sort();
    rolls.shift();
    return rolls.reduce((a, b) => a + b, 0);
  };

  const handleRoll = () => {
    const statName = statsOrder[currentStatIndex];
    const newStatValue = rollStat();
    const updatedStats = { ...character.stats, [statName]: newStatValue };
    const updatedCharacter = { ...character, stats: updatedStats };
    const updatedRollCounts = { ...rollCounts, [statName]: rollCounts[statName] + 1 };

    setCharacter(updatedCharacter);
    setRollCounts(updatedRollCounts);
  };

  const finalizeStat = () => {
    if (currentStatIndex < statsOrder.length - 1) {
      setCurrentStatIndex(currentStatIndex + 1);
    } else {
      setModalVisible(false);
      setCurrentStatIndex(0);
      saveCharacter(character); // Save the character when all stats are rolled
    }
  };

  const saveCharacter = async (characterData) => {
    try {
      const existingCharacters = await SecureStore.getItemAsync('characters');
      let characters = existingCharacters ? JSON.parse(existingCharacters) : [];
      characters.push(characterData); // Add the new character to the array
  
      await SecureStore.setItemAsync('characters', JSON.stringify(characters));
      alert('Character saved successfully!');
    } catch (e) {
      alert('Failed to save the character.');
      console.error(e);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Character Name"
        value={character.name}
        onChangeText={text => handleChange(text, 'name')}
      />
      <CustomPicker
        selectedValue={character.ancestry}
        onValueChange={itemValue => handleChange(itemValue, 'ancestry')}
        items={Object.keys(ancestries)}
        descriptions={ancestries}
      />


      <CustomPicker
        selectedValue={character.background}
        onValueChange={itemValue => handleChange(itemValue, 'background')}
        items={backgrounds}
      />
      <CustomPicker
        selectedValue={character.characterClass}
        onValueChange={itemValue => handleChange(itemValue, 'characterClass')}
        items={classes}
      />
      <Button title="Start Rolling Stats" onPress={() => setModalVisible(true)} />
      <StatRollModal
        modalVisible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setCurrentStatIndex(0); // Reset on close
        }}
        statName={statsOrder[currentStatIndex]}
        rollCount={rollCounts[statsOrder[currentStatIndex]]}
        currentRoll={character.stats[statsOrder[currentStatIndex]]}
        onRoll={handleRoll}
        onAccept={finalizeStat}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default CreateCharacterScreen;
