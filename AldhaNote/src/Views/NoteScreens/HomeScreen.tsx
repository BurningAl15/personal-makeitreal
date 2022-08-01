import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Text,
  Pressable,
} from 'react-native';
import CustomModal from '../../components/Modal';
import {useNotes} from '../../hooks/useNotes';
import ListItem from '../../components/ListItem';
import {noteDetailsRoute, editNoteRoute} from '../../utils/route.utils';
import {useIsFocused} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faPenToSquare,
  faNoteSticky,
  faImage,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {noteStyles} from '../styles';
import Fab from '../../components/Fab';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const HomeScreen = ({navigation}) => {
  const {
    notes,
    isLoading,
    trigger,
    hasElements,
    getNotes,
    getSpecificNotes,
    addNote,
    deleteNote,
    setTrigger,
  } = useNotes();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [currentType, setCurrentType] = useState<string>('all');
  const isFocused = useIsFocused();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getNotes();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (isFocused) {
      getNotes();
    }
  }, [isFocused]);

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    if (currentType === 'all') {
      getNotes();
    } else {
      getSpecificNotes(currentType);
    }
  }, [trigger]);

  const editNoteInfo = id => {
    navigation.navigate(editNoteRoute, {
      noteId: id,
    });
  };

  return (
    <SafeAreaView style={noteStyles.bg}>
      {
        <View style={noteStyles.container}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={noteStyles.scrollViewHorizontalHome}>
            <Pressable
              style={
                currentType === 'all'
                  ? noteStyles.selected
                  : noteStyles.unselected
              }
              onPress={() => {
                setCurrentType('all');
                setTrigger(!trigger);
              }}>
              <FontAwesomeIcon size={20} icon={faPenToSquare} color={'white'} />
              <Text style={noteStyles.option}>All</Text>
            </Pressable>
            <Pressable
              style={
                currentType === 'note'
                  ? noteStyles.selected
                  : noteStyles.unselected
              }
              onPress={() => {
                setCurrentType('note');
                setTrigger(!trigger);
              }}>
              <FontAwesomeIcon size={20} icon={faNoteSticky} color={'white'} />
              <Text style={noteStyles.option}>Note</Text>
            </Pressable>
            <Pressable
              style={
                currentType === 'image'
                  ? noteStyles.selected
                  : noteStyles.unselected
              }
              onPress={() => {
                setCurrentType('image');
                setTrigger(!trigger);
              }}>
              <FontAwesomeIcon size={20} icon={faImage} color={'white'} />
              <Text style={noteStyles.option}>Image</Text>
            </Pressable>
            <Pressable
              style={
                currentType === 'list'
                  ? noteStyles.selected
                  : noteStyles.unselected
              }
              onPress={() => {
                setCurrentType('list');
                setTrigger(!trigger);
              }}>
              <FontAwesomeIcon size={20} icon={faPenToSquare} color={'white'} />
              <Text style={noteStyles.option}>List</Text>
            </Pressable>
          </ScrollView>
        </View>
      }
      {isLoading && <ActivityIndicator size="large" />}
      <ScrollView
        contentContainerStyle={noteStyles.scrollViewHome}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {!isLoading &&
          hasElements &&
          notes.map(item => (
            <ListItem
              key={item.id}
              icon={item.type}
              title={item.name}
              subTitle={item.type}
              onPress_Open={() =>
                navigation.navigate(noteDetailsRoute, {id: item.id})
              }
              onPress_Edit={() => editNoteInfo(item.id)}
              onPress_Delete={() => deleteNote(item.id)}
            />
          ))}
        {!isLoading && !hasElements && (
          <Text style={noteStyles.title}>No notes yet :C</Text>
        )}

        <CustomModal
          modalVisible={createModalVisible}
          setModalVisible={setCreateModalVisible}
          addNote={addNote}
        />
      </ScrollView>
      <Fab icon={faPlus} onPress={() => setCreateModalVisible(true)} />
    </SafeAreaView>
  );
};

export default HomeScreen;
