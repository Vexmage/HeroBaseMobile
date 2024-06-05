import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Button } from 'react-native';
import { Picker as RNPicker } from '@react-native-picker/picker';

const CharacterPicker = ({ selectedValue, onValueChange, items }) => { // CharacterPicker component
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(selectedValue);

  const handleValueChange = (itemValue) => { // Handle value change
    setSelectedItem(itemValue);
    setModalVisible(true);
  };

  const handleConfirm = () => { // Handle confirm
    onValueChange(selectedItem);
    setModalVisible(false);
  };

  return (
    <>
      <RNPicker
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={handleValueChange}
      >
        {Object.keys(items).map(itemKey => (
          <RNPicker.Item key={itemKey} label={items[itemKey].name} value={itemKey} />
        ))}
      </RNPicker>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {items[selectedItem] && items[selectedItem].system && items[selectedItem].system.description ? items[selectedItem].system.description.value : "No description available."}
            </Text>
            <Button title="OK" onPress={handleConfirm} />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
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

export default CharacterPicker;
