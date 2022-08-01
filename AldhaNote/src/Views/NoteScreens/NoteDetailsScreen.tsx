import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {BASE_URL} from '../../config/config';
import {View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {noteStyles} from '../styles';

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
      console.log('NOTE DETAILS:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getNote();
  }, []);

  return (
    <SafeAreaView style={noteStyles.bg}>
      <Text style={noteStyles.titleEmail}>ID: {id}</Text>
      <Text style={noteStyles.titleName}>Name: {note.name}</Text>
      <View style={noteStyles.blankSpace} />
      <ScrollView contentContainerStyle={noteStyles.scrollView}>
        {isLoading && <ActivityIndicator size="large" />}
        {!isLoading && (
          <>
            {note.type === 'note' && <Text>Description: {note.content}</Text>}
            {note.type === 'image' && note.image && (
              <Image style={noteStyles.avatar} source={{uri: note.image}} />
            )}
            {note.type === 'list' && note.list.length > 0 && (
              <>
                {note.list.map((item: any, index: any) => (
                  <View key={index} style={noteStyles.noteTile}>
                    <FontAwesomeIcon
                      size={10}
                      style={noteStyles.icon}
                      icon={faCircle}
                    />
                    <Text key={index} style={noteStyles.noteText}>
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

export default NoteDetailsScreen;
