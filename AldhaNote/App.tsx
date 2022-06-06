import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Router from './src/router/Router';
import { AuthProvider } from './src/context/AuthContext';
import RNBootSplash from 'react-native-bootsplash';

const App = () => {
  useEffect(() => {
    // ! Documentation https://github.com/zoontek/react-native-bootsplash
    RNBootSplash.hide({ fade: true }); // fade
  }, []);

  return (
      <SafeAreaView style={styles.view}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex:1,
  },
});

export default App;
