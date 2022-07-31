import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {styles} from './styles';

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

export default Button;
