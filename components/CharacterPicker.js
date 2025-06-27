import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { Picker as RNPicker } from '@react-native-picker/picker';

const CharacterPicker = ({ selectedValue, onValueChange, items }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(selectedValue);

  const handleValueChange = (itemValue) => {
    setSelectedItem(itemValue);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    onValueChange(selectedItem);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <RNPicker
        selectedValue={selectedValue}
        onValueChange={handleValueChange}
        style={styles.picker}
        dropdownIconColor="#FFD700"
      >
        {Object.keys(items).map((itemKey) => (
          <RNPicker.Item
            key={itemKey}
            label={items[itemKey].name}
            value={itemKey}
            color="#FFD700"
          />
        ))}
      </RNPicker>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {items[selectedItem]?.system?.description?.value || "No description available."}
            </Text>
            <Pressable style={styles.okButton} onPress={handleConfirm}>
              <Text style={styles.okButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#FFD700',
    borderRadius: 6,
    backgroundColor: '#2A1F1F',
    width: '90%',
    alignSelf: 'center',
  },
  picker: {
    color: '#FFD700',
    fontFamily: 'ConanFont',
    height: 48,
    width: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 20, 20, 0.8)',
    padding: 20,
  },
  modalView: {
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    borderColor: '#FFD700',
    borderWidth: 2,
  },
  modalText: {
    color: '#FFD700',
    fontFamily: 'ConanFont',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  okButton: {
    backgroundColor: '#FFD700',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 20,
    elevation: 2,
  },
  okButtonText: {
    color: '#2A1F1F',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CharacterPicker;
