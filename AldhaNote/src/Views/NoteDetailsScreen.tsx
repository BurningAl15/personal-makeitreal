import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {BASE_URL} from '../config/config';
import {View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const NoteDetailsScreen = ({route, navigation}) => {
  const {id} = route.params;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [note, setNote] = useState<any>({});

  const getNote = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/note/${id}`);
      const newNote = {...response.data.data}.notes;
      setNote(newNote);
    } catch (error) {
      console.log('>>> ', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getNote();
  }, []);

  return (
    <SafeAreaView style={styles.bg}>
      {/* <Text>{noteData.}</Text> */}
      <Text style={styles.titleEmail}>ID: {id}</Text>
      <Text style={styles.titleName}>Name: {note.name}</Text>
      <View style={styles.blankSpace} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {isLoading && <ActivityIndicator size="large" />}
        {!isLoading && (
          <>
            {note.type === 'note' && <Text>Description: {note.content}</Text>}
            {note.type === 'image' && note.image && (
              <Image style={styles.avatar} source={{uri: note.image}} />
            )}
            {note.type === 'list' && note.list.length > 0 && (
              <>
                {note.list.map((item: any, index: any) => (
                  <View key={index} style={styles.noteTile}>
                    <FontAwesomeIcon
                      size={10}
                      style={styles.icon}
                      icon={faCircle}
                    />
                    <Text key={index} style={styles.noteText}>
                      {item}
                    </Text>
                  </View>
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  blankSpace: {
    marginBottom: 16,
  },
  screenPage: {
    textAlign: 'center',
    fontSize: 20,
  },
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
  noteTile: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '90%',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  noteText: {
    fontSize: 20,
  },
  icon: {
    marginRight: 10,
  },
  titleName: {
    marginRight: 16,
    marginLeft: 16,
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  titleEmail: {
    marginRight: 16,
    marginLeft: 16,
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  bg: {
    flex: 1,
    position: 'relative',
    marginTop: 20,
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    borderRadius: 300,
    width: 300,
    height: 300,
  },
  avatarContainer: {
    borderRadius: 100,
    width: 150,
    height: 150,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: 20,
  },
  profile: {
    display: 'flex',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NoteDetailsScreen;
