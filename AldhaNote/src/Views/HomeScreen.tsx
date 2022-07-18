import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, ActivityIndicator, ScrollView, RefreshControl, Text, StyleSheet, Pressable} from 'react-native';
// import {FlatList, View, Text, StyleSheet, Alert, Modal, Pressable } from 'react-native';
// import Task from '../components/Task';
import {Button, FAB} from 'react-native-paper';
import CustomModal from '../components/Modal';
import { useNotes } from '../hooks/useNotes';
import ListItem from '../components/ListItem';
import { noteDetailsRoute } from '../utils/route.utils';
// import CustomEditModal from '../components/EditModal';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

const HomeScreen = ({navigation}) => {
    const {notes, isLoading, trigger, hasElements, getNotes, getSpecificNotes, addNote, deleteNote, editNote, setTrigger} = useNotes();
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editId,setEditId] = useState<string>('');
    const [refreshing, setRefreshing] = React.useState(false);
    const [currentType, setCurrentType] = useState<string>('all');

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      getNotes();
      wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(()=>{
        getNotes();
    },[]);

    useEffect(()=>{
        if (currentType === 'all'){
            getNotes();
        }
        else {
            getSpecificNotes(currentType);
        }
    },[trigger]);

    // useEffect(()=>{
    // },[currentType]);

    const editNoteInfo = (id) => {
        setEditModalVisible(true);
        setEditId(id);
    };

    return (
        <SafeAreaView style={styles.bg}>
            {
                <View style={styles.container}>
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={styles.scrollViewHorizontal}
                    >
                        <Pressable
                            style={ currentType === 'all' ? styles.selected : styles.unselected }
                            onPress={()=>{
                                setCurrentType('all');
                                setTrigger(!trigger);
                            }}
                        >
                            <Text style={styles.option}>All</Text>
                        </Pressable>
                        <Pressable
                            style={ currentType === 'note' ? styles.selected : styles.unselected }
                            onPress={()=>{
                                setCurrentType('note');
                                setTrigger(!trigger);
                            }}
                        >
                            <Text style={styles.option}>Note</Text>
                        </Pressable>
                        <Pressable
                            style={ currentType === 'image' ? styles.selected : styles.unselected }
                            onPress={()=>{
                                setCurrentType('image');
                                setTrigger(!trigger);
                            }}
                        >
                            <Text style={styles.option}>Image</Text>
                        </Pressable>
                        <Pressable
                            style={ currentType === 'list' ? styles.selected : styles.unselected }
                            onPress={()=>{
                                setCurrentType('list');
                                setTrigger(!trigger);
                            }}
                        >
                            <Text style={styles.option}>List</Text>
                        </Pressable>
                    </ScrollView>
                </View>
            }
            {
                isLoading && <ActivityIndicator size="large"/>
            }
            <ScrollView
             contentContainerStyle={styles.scrollView}
             refreshControl={
               <RefreshControl
                 refreshing={refreshing}
                 onRefresh={onRefresh}
               />
             }>
                {
                    !isLoading &&
                    hasElements &&
                    notes.map((item)=>(
                        <ListItem
                            key={item.id}
                            icon = {item.type}
                            title = {item.name}
                            subTitle = {item.type}
                            onPress_Open = {()=>navigation.navigate(noteDetailsRoute,{id:item.id})}
                            // onPress_Open = {()=>navigation.navigate(noteDetailsRoute)}
                            onPress_Edit = {()=>editNoteInfo(item.id)}
                            onPress_Delete = {()=>deleteNote(item.id)}
                        />
                    ))
                }
                {
                    !isLoading &&
                    !hasElements &&
                        <Text style={styles.title}>No notes yet :C</Text>
                }

                <CustomModal
                    modalVisible={createModalVisible}
                    setModalVisible={setCreateModalVisible}
                    addNote={addNote}
                />
                {/* {
                    !isLoading &&
                    <CustomEditModal
                        modalVisible={editModalVisible}
                        setModalVisible={setEditModalVisible}
                        editId={editId}
                        noteData={notes}
                        editNote={editNote}
                    />
                } */}
            </ScrollView>
            <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={() => setCreateModalVisible(true)}
            />
        </SafeAreaView>
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
        marginTop:20,
        // display:'flex',
        // flexDirection:'column',
        // alignItems:'center',
        // maxHeight:700,
    },
    container:{
        alignItems: 'center',
        marginBottom: 10,
    },
    scrollView: {
        alignItems: 'center',
        // flex: 1,
        // height:'100%',
        // justifyContent: 'flex-start',
    },
    scrollViewHorizontal: {
        alignItems: 'flex-start',
        // flex: 1,
        // height:'100%',
        // justifyContent: 'flex-start',
    },
    option: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    unselected: {
        backgroundColor: '#A6A6A6',
        margin: 5,
        padding: 10,
        borderRadius: 10,
    },
    selected: {
        backgroundColor: '#575757',
        margin: 5,
        padding: 10,
        borderRadius: 10,
    },
});

export default HomeScreen;
