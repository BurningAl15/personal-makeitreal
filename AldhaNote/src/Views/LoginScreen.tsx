import React from 'react';
import {StyleSheet, View} from 'react-native';
import Login from '../components/Login';

const HomeScreen = ({navigation}) => {
  const styles = StyleSheet.create({
    view: {
      flex: 1,
    },
  });

  return (
    <View style={styles.view}>
      <Login navigation={navigation} />
    </View>
  );
};

export default HomeScreen;
