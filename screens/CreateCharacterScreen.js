import React, { useState, useEffect } from 'react'; // Import React and useState, useEffect hooks
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Button } from 'react-native'; // Import View, Text, StyleSheet, ScrollView, and SafeAreaView components
import CharacterInput from '../components/CharacterInput'; // Import CharacterInput component
import CharacterPicker from '../components/CharacterPicker'; // Import CharacterPicker component
import StatRoller from '../components/StatRoller'; // Import StatRoller component
import SaveCharacterButton from '../components/SaveCharacterButton'; // Import SaveCharacterButton component
import { Ionicons } from '@expo/vector-icons';


// Let's talk about how we import these json files into our project and why
// We import these json files to use them as data for our character creation screen
//
 
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

const getClassIconName = (characterClass) => {
  switch (characterClass.toLowerCase()) {
    case 'fighter':
      return 'shield-outline';
    case 'cleric':
      return 'medkit-outline';
    case 'wizard':
      return 'sparkles-outline';
    case 'rogue':
      return 'skull-outline';
    case 'ranger':
      return 'leaf-outline';
    case 'bard':
      return 'musical-notes-outline';
    default:
      return 'person-outline';
  }
};

const ancestries = { dwarf, elf, halfling, human }; // Ancestries
const backgrounds = { criminal, merchant, scholar, warrior }; // Backgrounds
const classes = { bard, cleric, fighter, rogue }; // Classes

// CreateCharacterScreen component
const CreateCharacterScreen = ({ navigation }) => { // Pass navigation prop
  const [character, setCharacter] = useState({ // Character state
    name: '',
    ancestry: Object.keys(ancestries)[0], // Default ancestry
    background: Object.keys(backgrounds)[0], // Default background
    characterClass: Object.keys(classes)[0], // Default class
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

<View style={styles.iconPreview}>
  <Text style={styles.iconLabel}>Class Icon Preview:</Text>
  <Ionicons
    name={getClassIconName(character.characterClass)}
    size={48}
    color="#FFD700"
  />
</View>

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
  iconPreview: {
  alignItems: 'center',
  marginVertical: 16,
},

iconLabel: {
  fontSize: 16,
  color: '#FFD700',
  fontFamily: 'ConanFont',
  marginBottom: 6,
},
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default CreateCharacterScreen;

