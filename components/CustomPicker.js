import React, { useState } from 'react'; // Import React and useState
import { View, Text, StyleSheet, Modal, TouchableOpacity, Button } from 'react-native'; // Import View, Text, StyleSheet, Modal, TouchableOpacity, and Button components
import { Picker as RNPicker } from '@react-native-picker/picker'; // Import Picker component from @react-native-picker/picker

const CustomPicker = ({ selectedValue, onValueChange, items }) => { // CustomPicker component
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility
  const [selectedItem, setSelectedItem] = useState(selectedValue); // Selected item

  const handleValueChange = (itemValue) => { // Handle value change
    setSelectedItem(itemValue); // Update selected item
    setModalVisible(true); // Open modal
  };

  const handleConfirm = () => { // Handle confirm
    onValueChange(selectedItem); // Update selected value
    setModalVisible(false); // Close modal
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

export default CustomPicker;
