import React from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from './styles';

const ModalPicker = ({
  types,
  changeModalVisibility,
  setSelectedValue,
  isModalVisible,
}) => {
  const onPressItem = option => {
    setSelectedValue(option);
    changeModalVisibility(false);
  };

  const options = types.map((type, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.option}
        onPress={() => onPressItem(type.value)}>
        <Text style={styles.text}>{type.label}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <View style={isModalVisible ? styles.backgroundOn : styles.backgroundOff}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => changeModalVisibility(false)}>
        <View style={styles.modal}>
          <Text style={styles.text}>Note Type</Text>
          <ScrollView>{options}</ScrollView>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ModalPicker;
