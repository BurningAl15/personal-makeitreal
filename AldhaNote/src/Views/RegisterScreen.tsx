import React from 'react';
import {View, StyleSheet} from 'react-native';
import Register from '../components/Register';

const RegisterScreen = ({navigation}) => {
    const styles = StyleSheet.create({
        view: {
          flex:1,
        },
    });

    return (
        <View style={styles.view}>
            <Register navigation={navigation}/>
        </View>
    );
};

export default RegisterScreen;
