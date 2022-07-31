import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

const ReturnHomeButton = ({navigation, route, icon, buttonText}) => {
  return (
    <Pressable
      onPress={() => navigation.navigate(route)}
      style={({pressed}) => ({
        opacity: pressed ? 0.5 : 1,
        ...styles.button,
      })}>
      <FontAwesomeIcon size={25} style={styles.icon} icon={icon} />
      <Text style={styles.title}>{buttonText}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 20,
    width: '90%',
    marginHorizontal: 16,
    borderRadius: 10,
  },
  icon: {},
  title: {
    marginRight: 16,
    marginLeft: 16,
    fontSize: 16,
  },
});

export default ReturnHomeButton;
