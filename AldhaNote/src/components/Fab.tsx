import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

const Fab = ({icon, onPress}) => {
  return (
    <Button
        style={styles.fab}
        onPress={onPress}
        title={icon}
    />
  );
};

export default Fab;
