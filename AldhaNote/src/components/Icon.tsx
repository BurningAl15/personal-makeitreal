import React from 'react';
import {View, StyleSheet, useColorScheme, Image, Text} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const Icon = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const styles = StyleSheet.create({
    container: {
      marginTop: 100,
      marginBottom: 100,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    img: {
      width: 80,
      height: 80,
      marginBottom: 16,
    },
    backgroundStyle: {
      textAlign: 'center',
      color: isDarkMode ? Colors.darker : Colors.lighter,
      marginBottom: 16,
    },
    title: {
      fontSize: 40,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../img/icon.png')} />
      <Text style={{...styles.backgroundStyle, ...styles.title}}>
        AldhaNote
      </Text>
      <Text style={styles.backgroundStyle}>Remember everything you need</Text>
    </View>
  );
};

export default Icon;
