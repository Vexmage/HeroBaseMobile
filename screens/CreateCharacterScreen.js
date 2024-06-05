import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Button } from 'react-native';
import CharacterInput from '../components/CharacterInput';
import CharacterPicker from '../components/CharacterPicker';
import StatRoller from '../components/StatRoller';
import SaveCharacterButton from '../components/SaveCharacterButton';

import dwarf from '../data/ancestries/dwarf.json';
import elf from '../data/ancestries/elf.json';
import halfling from '../data/ancestries/halfling.json';
import human from '../data/ancestries/human.json';

import criminal from '../data/backgrounds/criminal.json';
import merchant from '../data/backgrounds/merchant.json';
import scholar from '../data/backgrounds/scholar.json';
import warrior from '../data/backgrounds/warrior.json';

import bard from '../data/classes/bard.json';
import cleric from '../data/classes/cleric.json';
import fighter from '../data/classes/fighter.json';
import rogue from '../data/classes/rogue.json';

const ancestries = { dwarf, elf, halfling, human }; // Ancestries
const backgrounds = { criminal, merchant, scholar, warrior }; // Backgrounds
const classes = { bard, cleric, fighter, rogue }; // Classes

// CreateCharacterScreen component
const CreateCharacterScreen = ({ navigation }) => {
  const [character, setCharacter] = useState({
    name: '',
    ancestry: Object.keys(ancestries)[0],
    background: Object.keys(backgrounds)[0],
    characterClass: Object.keys(classes)[0],
    stats: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0
    }
  });

  const [statModalVisible, setStatModalVisible] = useState(false); // Stat modal visibility

  useEffect(() => { // Log data on component mount
    console.log("Ancestries:", ancestries);
    console.log("Backgrounds:", backgrounds);
    console.log("Classes:", classes);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <CharacterInput
          value={character.name}
          onChange={(text) => setCharacter({ ...character, name: text })}
        />
        <CharacterPicker
          selectedValue={character.ancestry}
          onValueChange={(value) => setCharacter({ ...character, ancestry: value })}
          items={ancestries}
        />
        <CharacterPicker
          selectedValue={character.background}
          onValueChange={(value) => setCharacter({ ...character, background: value })}
          items={backgrounds}
        />
        <CharacterPicker
          selectedValue={character.characterClass}
          onValueChange={(value) => setCharacter({ ...character, characterClass: value })}
          items={classes}
        />
        <Button title="Roll Stats" onPress={() => setStatModalVisible(true)} />
      </ScrollView>
      <StatRoller
        character={character}
        setCharacter={setCharacter}
        modalVisible={statModalVisible}
        setModalVisible={setStatModalVisible}
      />
      <SaveCharacterButton
        character={character}
        navigation={navigation}
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
});

export default CreateCharacterScreen;

