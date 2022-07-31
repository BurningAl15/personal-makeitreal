import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';

const CustomInput = ({
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
  isMultiline = false,
  numLines = 1,
  id = -1,
  isScreen = false,
}) => {
  return (
    <View style={!isScreen?styles.view:{...styles.view,...styles.fullScreen}}>
      <TextInput
        label={label}
        placeholder={placeholder}
        value={value}
        multiline={isMultiline}
        numberOfLines={isMultiline ? numLines : 1}
        secureTextEntry={isSecured}
        onChangeText={text =>
          id === -1
            ? onChangeText(placeholder, text)
            : onChangeText(id, text, id)
        }
        onBlur={onBlur}
        style={styles.input}
        left={!!leftIcon && <TextInput.Icon name={leftIcon} />}
        right={
          !!rightIcon && (
            <TextInput.Icon name={rightIcon} onPress={onRightIconPress} />
          )
        }
      />
      {
        // !!error &&
        <Text style={styles.error}>{error}</Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    position: 'relative',
  },
  fullScreen:{
    width: '90%',
    margin: 'auto',
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

export default CustomInput;
