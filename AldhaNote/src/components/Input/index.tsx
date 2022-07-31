import React from 'react';
import {View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import {styles} from './styles';

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

export default Input;
