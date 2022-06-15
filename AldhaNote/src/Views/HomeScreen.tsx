import React, {useState, useEffect} from 'react';
import {FlatList, View, Text, StyleSheet, Alert, Modal, Pressable } from 'react-native';
import {FAB} from 'react-native-paper';
import Task from '../components/Task';
import { BASE_URL } from '../config/config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomModal from '../components/Modal';

interface NoteType {
    id: string;
    type: string;
    name: string;
    content: string;
}

const HomeScreen = ({navigation}) => {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [trigger, setTrigger] = useState<boolean>(false);
    const [userData, setUserData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [modalVisible, setModalVisible] = useState(false);

    const renderItem = ({ item }) => (
        <Task type={item.type} name={item.name} />
    );

    const getNotes = async () => {
        try {
            setIsLoading(true);
            const jsonValue = await AsyncStorage.getItem('@user');
            const { email } = jsonValue != null ? JSON.parse(jsonValue) : null;
            const response = await axios.get(`${BASE_URL}/notes/${email}`);
            // console.log('GET: ', response.data.data);
            const newNotes = {...response.data.data}.notes.map((note:any) => ({
                id: note._id,
                type: note.type,
                name: note.name,
                content: note.content,
            }));
            // console.log('UPDATED: ', newNotes);
            setNotes(newNotes);
        } catch (error) {
            console.log('>>> ',error);
        }
    };

    const getUserData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@user');
            // console.log('USER DATA: ', jsonValue);
            setUserData(jsonValue != null ? JSON.parse(jsonValue) : null);
            setIsLoading(false);
        }
        catch (e) {
            console.log(e);
        }
    };

    const logout = async () => {
        await AsyncStorage.setItem('@user', 'null');
        await AsyncStorage.setItem('@token', 'null');
        navigation.navigate('Login');
    };

    useEffect(()=>{
        getNotes();
        getUserData();
    },[]);

    useEffect(()=>{
        getNotes();
        setIsLoading(false);
    },[trigger]);

    const addNote = async ({type,name,content}) => {
        try {
            const newNote = {
                user: userData,
                type: type,
                name: name,
                content: content,
            };
            console.log('NEW NOTE: ', newNote);
            const response = await axios.post(`${BASE_URL}/notes`, newNote);
            setTrigger(!trigger);
        } catch (error) {
            console.log('>>> ',error);
        }
    };

    const getFullName = () => {
        return userData?.firstName + ' ' + userData?.lastName;
    };

    const getEmail = () => {
        return userData?.email;
    };

    const hasElements:boolean = notes.length > 0;

    return (
        <View style={styles.bg}>
            <Text style={styles.title}>Home Screen</Text>
            <Text style={styles.title}>{getFullName() + '\n' + getEmail()}</Text>
            {
                !isLoading &&
                hasElements &&
                <FlatList
                    data={notes}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            }
            {
                !isLoading &&
                !hasElements &&
                    <Text style={styles.title}>No notes yet :C</Text>
            }
            <FAB
                small
                icon="plus"
                onPress={() => logout()}
            />
            <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={() => setModalVisible(true)}
            />
            <CustomModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                addNote={addNote}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    title: {
        marginRight: 16,
        marginLeft: 16,
        marginTop: 16,
        fontSize: 20,
        fontWeight: 'bold',
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    bg:{
        flex:1,
        position:'relative',
    },
});

export default HomeScreen;
