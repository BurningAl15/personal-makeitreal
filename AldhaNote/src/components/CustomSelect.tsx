import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    SafeAreaView,
} from 'react-native';
import ModalPicker from './ModalPicker';

const CustomSelect = ({types, handleChange}) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<String>('Select Item...');

    const changeModalVisibility = (bool:boolean) => {
        setIsModalVisible(bool);
    };

    const handleSelect = (option:String) => {
        console.log('SELECTED: ', option);
        setSelectedValue(option);
        handleChange('type',option);
    };

    return (
        <View style={styles.touchableContainer}>
            <TouchableOpacity
                style = {styles.touchableOpacity}
                onPress = {() => changeModalVisibility(true)}
            >
                <Text style={styles.text}>{selectedValue}</Text>
            </TouchableOpacity>
            <Modal
                transparent={true}
                animationType="fade"
                visible={isModalVisible}
                onRequestClose={() => changeModalVisibility(false)}
            >
                <ModalPicker
                    types={types}
                    changeModalVisibility={changeModalVisibility}
                    setSelectedValue={handleSelect}
                    isModalVisible={isModalVisible}
                />
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text:{

    },
    touchableOpacity: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 30,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    touchableContainer: {
        height: 80,
    },
});

export default CustomSelect;
