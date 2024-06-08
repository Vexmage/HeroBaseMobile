import React, { useState } from 'react'; // Import React and useState
import { View, Text, StyleSheet, Modal, Button } from 'react-native'; // Import View, Text, StyleSheet, Modal, and Button components
import { Picker as RNPicker } from '@react-native-picker/picker'; // Import Picker component from @react-native-picker/picker

// The code below is a component that displays a picker with a modal that shows the description of the selected item.
// The component takes three props: selectedValue, onValueChange, and items.
// selectedValue is the currently selected value.
// onValueChange is a function that is called when the selected value changes.
// items is an object that contains the items to be displayed in the picker.
// The component renders a RNPicker component with the items passed as props.
// When the value of the picker changes, the handleValueChange function is called, 
// hich updates the selected item and opens the modal.

const CharacterPicker = ({ selectedValue, onValueChange, items }) => { // CharacterPicker component
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

export default CharacterPicker;
