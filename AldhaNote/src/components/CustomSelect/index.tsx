import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Modal} from 'react-native';
import ModalPicker from '../ModalPicker';
import {styles} from './styles';

const CustomSelect = ({types, handleChange}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<String>('Select Item...');

  const changeModalVisibility = (bool: boolean) => {
    setIsModalVisible(bool);
  };

  const handleSelect = (option: String) => {
    setSelectedValue(option);
    handleChange('type', option);
  };

  return (
    <View style={styles.touchableContainer}>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => changeModalVisibility(true)}>
        <Text style={styles.text}>{selectedValue}</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => changeModalVisibility(false)}>
        <ModalPicker
          types={types}
          changeModalVisibility={changeModalVisibility}
          setSelectedValue={handleSelect}
          isModalVisible={isModalVisible}
        />
      </Modal>
    </View>
  );
};

export default CustomSelect;
