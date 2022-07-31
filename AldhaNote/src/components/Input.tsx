import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';

const Input = ({
  label,
  placeholder,
  value,
  isSecured,
  leftIcon,
  rightIcon,
  onChangeText,
  onBlur,
  error,
  onRightIconPress,
}) => {
  return (
    <View style={styles.view}>
      <TextInput
        label={label}
        placeholder={placeholder}
        value={value}
        secureTextEntry={isSecured}
        onChangeText={onChangeText}
        onBlur={onBlur}
        style={styles.input}
        left={!!leftIcon && <TextInput.Icon name={leftIcon} />}
        right={
          !!rightIcon && (
            <TextInput.Icon name={rightIcon} onPress={onRightIconPress} />
          )
        }
      />
      {<Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    position: 'relative',
  },
  input: {
    marginBottom: 40,
  },
  error: {
    position: 'absolute',
    color: 'red',
    bottom: 10,
    textAlign: 'center',
    fontSize: 10,
    marginLeft: 10,
  },
});

export default Input;
