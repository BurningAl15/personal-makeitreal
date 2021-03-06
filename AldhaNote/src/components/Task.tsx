import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Task = ({name}) => {

    return (
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          {/* <View style={styles.square} /> */}
          <Icon.Button 
            style={styles.button} 
            name="rocket" 
            size={30} 
            color="#900"
            onPress={() => Alert.alert('ALERT')}
          >
            <Text style={styles.itemText}>{name}</Text>
          </Icon.Button>
        </View>
        <Icon.Button 
          style={styles.button} 
          name="rocket" 
          size={30} 
          color="#900"
          onPress={() => Alert.alert('ALERT')}
        />
      </View>
    );
  };

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 20,
        marginRight: 16,
        marginLeft: 16,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: 'black',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        maxWidth: '80%',
        color:'black',
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
    },
    button: {
      backgroundColor: 'white',
    },
});

export default Task;
