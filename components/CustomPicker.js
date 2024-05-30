// What is CustomPicker? 
// CustomPicker is a component that displays a Picker component and a Modal component. 
// The Picker component displays a list of items that the user can select from, and 
// the Modal component displays a description of the selected item. The CustomPicker component 
// receives the selected value, the onValueChange function, the items to display in the Picker, 
// and the descriptions of the items as props. When the user selects an item in the Picker,
// the description of the selected item is displayed in the Modal. 

import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getDescription } from '../src/utils/dataHelpers';

const CustomPicker = ({ selectedValue, onValueChange, items, descriptions }) => { // Add descriptions as a prop
    const [modalVisible, setModalVisible] = useState(false); // Add modalVisible state
    const [selectedItem, setSelectedItem] = useState(selectedValue); // Add selectedItem state

    console.log("Items: ", items);  // Log to check items
    console.log("Descriptions: ", descriptions);  // Log to check descriptions structure


    const handleValueChange = (itemValue) => { // Update handleValueChange to set selectedItem and modalVisible
      setSelectedItem(itemValue); // Set selectedItem
      setModalVisible(true); // Set modalVisible
    };

    const handleConfirm = () => { // Add handleConfirm to call onValueChange and set modalVisible
      onValueChange(selectedItem); // Call onValueChange with selectedItem
      setModalVisible(false); // Set modalVisible
    };

    return (
      <>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={handleValueChange}
        >
          {items.map(item => <Picker.Item key={item} label={item} value={item} />)}
        </Picker>
        <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
        <Text style={styles.modalText}>
            {descriptions && descriptions[selectedItem] ? getDescription(descriptions[selectedItem]) : "No description available."}
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
