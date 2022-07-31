import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const Button = ({
  title,
  onPress,
  isLoading,
  isFull = true,
  isDisabled = false,
}) => {
  const styleCondition = isDisabled
    ? isFull
      ? styles.disabled
      : {...styles.disabled, ...styles.buttonSeparated}
    : isFull
    ? styles.button
    : {...styles.button, ...styles.buttonSeparated};

  return (
    <TouchableOpacity
      style={styleCondition}
      onPress={onPress}
      disabled={isDisabled}>
      {isLoading ? (
        <ActivityIndicator color="white" size="large" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '90%',
    height: 60,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#2e2e2e',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonSeparated: {
    width: '40%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  disabled: {
    width: '90%',
    height: 60,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#949494',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default Button;
