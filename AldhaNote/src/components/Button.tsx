import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const Button = ({title,onPress,isLoading}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        {
            isLoading 
                ?
                <ActivityIndicator
                    color="white"
                    size="large"
                    />
                :
            <Text style={styles.buttonText}>{title}</Text>
        }
    </TouchableOpacity>
  );
};

const styles=StyleSheet.create({
    button:{
        width:'100%',
        height:60,
        marginVertical:10,
        alignItems:'center',
        backgroundColor:'black',
        justifyContent:'center',
        borderRadius:10,
    },
    buttonText:{
        color:'white',
        fontSize:18,
    },
});

export default Button;
