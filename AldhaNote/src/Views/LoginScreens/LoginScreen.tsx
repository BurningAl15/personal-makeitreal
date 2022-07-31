import React from 'react';
import {View} from 'react-native';
import Login from '../../components/Login';
import {loginStyles} from '../styles';

const HomeScreen = ({navigation}) => {
  return (
    <View style={loginStyles.view}>
      <Login navigation={navigation} />
    </View>
  );
};

export default HomeScreen;
