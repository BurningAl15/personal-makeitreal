import React from 'react';
import {View} from 'react-native';
import Register from '../../components/Register';
import {loginStyles} from '../styles';

const RegisterScreen = ({navigation}) => {
  return (
    <View style={loginStyles.view}>
      <Register navigation={navigation} />
    </View>
  );
};

export default RegisterScreen;
