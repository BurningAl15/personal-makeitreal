import React from 'react';
import {View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import {styles} from './styles';

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
  hasMessage = '',
}) => {
  return (
    <View
      style={!isScreen ? styles.view : {...styles.view, ...styles.fullScreen}}>
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
      {<Text style={styles.error}>{error}</Text>}
      {hasMessage !== '' && <Text style={styles.message}>{hasMessage}</Text>}
    </View>
  );
};

export default CustomInput;
