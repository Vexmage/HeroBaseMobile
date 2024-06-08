
// What is StatRollModal.js?
// StatRollModal.js is a component that displays a modal with information about a stat roll.

import React, { useState } from 'react'; // Import React and useState
import { Modal, View, Text, Button, StyleSheet } from 'react-native'; // Import Modal, View, Text, Button, and StyleSheet components

const StatRollModal = ({ modalVisible, onClose, statName, rollCount, currentRoll, onRoll, onAccept }) => { // StatRollModal component
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{statName.toUpperCase()}</Text>
          <Text>Current Roll: {currentRoll}</Text>
          <Text>Roll Count: {rollCount}</Text>
          <Button title="Roll" onPress={onRoll} disabled={rollCount >= 2} />
          <Button title="Accept Stat" onPress={onAccept} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default StatRollModal;
