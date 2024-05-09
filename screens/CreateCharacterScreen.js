import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';

const statsOrder = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
const ancestries = ["Elf", "Dwarf", "Human", "Halfling"];
const backgrounds = ["Soldier", "Scholar", "Farmer", "Merchant"];
const classes = ["Warrior", "Mage", "Rogue", "Priest"];

const CreateCharacterScreen = ({ navigation }) => {
  const [character, setCharacter] = useState({
    name: '',
    ancestry: ancestries[0],
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

  const handleChange = (value, field) => {
    setCharacter({ ...character, [field]: value });
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
      <Picker
        selectedValue={character.ancestry}
        style={styles.picker}
        onValueChange={itemValue => handleChange(itemValue, 'ancestry')}
      >
        {ancestries.map(ancestry => <Picker.Item key={ancestry} label={ancestry} value={ancestry} />)}
      </Picker>
      <Picker
        selectedValue={character.background}
        style={styles.picker}
        onValueChange={itemValue => handleChange(itemValue, 'background')}
      >
        {backgrounds.map(background => <Picker.Item key={background} label={background} value={background} />)}
      </Picker>
      <Picker
        selectedValue={character.characterClass}
        style={styles.picker}
        onValueChange={itemValue => handleChange(itemValue, 'characterClass')}
      >
        {classes.map(cClass => <Picker.Item key={cClass} label={cClass} value={cClass} />)}
      </Picker>
      <Button title="Start Rolling Stats" onPress={() => setModalVisible(true)} />
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setCurrentStatIndex(0); // Reset on close
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{statsOrder[currentStatIndex].toUpperCase()}</Text>
            <Text>Current Roll: {character.stats[statsOrder[currentStatIndex]]}</Text>
            <Text>Roll Count: {rollCounts[statsOrder[currentStatIndex]]}</Text>
            <Button title="Roll" onPress={handleRoll} disabled={rollCounts[statsOrder[currentStatIndex]] >= 2} />
            <Button title="Accept Stat" onPress={finalizeStat} />
          </View>
        </View>
      </Modal>
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
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  }
});

export default CreateCharacterScreen;
