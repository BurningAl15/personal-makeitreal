import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    ScrollView,
} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ModalPicker = ({types, changeModalVisibility,setSelectedValue,isModalVisible}) => {

    const onPressItem = (option) => {
        setSelectedValue(option);
        changeModalVisibility(false);
    };

    const options = types.map((type, index) => {
        return (
            <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => onPressItem(type.label)}
            >
                <Text style={styles.text}>{type.label}</Text>
            </TouchableOpacity>
        );
    });

    return (
        <View style={isModalVisible ? styles.backgroundOn : styles.backgroundOff}>
            <TouchableOpacity
                style={styles.container}
                onPress={()=>changeModalVisibility(false)}
            >
                <View style={styles.modal}>
                    <Text style={styles.text}>Note Type</Text>
                    <ScrollView>
                        { options }
                    </ScrollView>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundOff:{
        height:'100%',
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: -1,
    },
    backgroundOn:{
        backgroundColor:'#00000099',
        height:'100%',
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1,
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    modal:{
        width:WIDTH - 80,
        height:HEIGHT / 2,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
    },
    option:{
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        alignItems:'center',
        width: WIDTH - 150,
        height: 70,
    },
    text:{
        fontSize:20,
        fontWeight:'bold',
        margin:20,
    },
});

export default ModalPicker;
