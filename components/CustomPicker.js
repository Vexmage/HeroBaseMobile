import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getDescription } from '../src/utils/dataHelpers';




const CustomPicker = ({ selectedValue, onValueChange, items, descriptions }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(selectedValue);

    console.log("Items: ", items);  // Log to check items
    console.log("Descriptions: ", descriptions);  // Log to check descriptions structure


    const handleValueChange = (itemValue) => {
      setSelectedItem(itemValue);
      setModalVisible(true);
    };

    const handleConfirm = () => {
      onValueChange(selectedItem);
      setModalVisible(false);
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
