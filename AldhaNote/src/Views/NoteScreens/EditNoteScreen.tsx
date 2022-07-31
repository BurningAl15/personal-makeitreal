import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Button from '../../components/Button';
import axios from 'axios';
import {BASE_URL} from '../../config/config';
import CustomInput from '../../components/CustomInput';
import {useNotes} from '../../hooks/useNotes';
import {homeRoute} from '../../utils/route.utils';

import {
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {noteStyles} from '../styles';

const EditNoteScreen = ({route, navigation}) => {
  const {noteId} = route.params;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [note, setNote] = useState<any>({});
  const [image, setImage] = useState<any>(null);
  const [list, setList] = useState<any>([]);
  const {editNote} = useNotes();

  useEffect(() => {
    getNote();
  }, []);

  const options: ImageLibraryOptions = {
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: true,
  };

  const openGallery = async () => {
    const images = await launchImageLibrary(options);
    setImage(images);
  };

  const getNote = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/note/${noteId}`);
      const newNote = {...response.data.data}.notes;
      setNote(newNote);
      if (newNote.type === 'list') {
        const newList = newNote.list.map((item: any, index: any) => {
          return {
            id: new Date().getTime() + index,
            value: item,
          };
        });
        setList(newList);
      }
    } catch (error) {
      console.error('GET NOTE:', error);
    }
    setIsLoading(false);
  };

  const onChange = (name, content) => {
    setNote({...note, [name]: content});
  };

  const onChangeList = (name, value, id) => {
    const listElement = [...list].map((item: any) => {
      if (item.id === id) {
        return {...item, value};
      } else {
        return item;
      }
    });
    setList(listElement);
  };

  const addNewElementToList = () => {
    const newList = [...list];
    newList.push({id: new Date().getTime(), value: ''});
    setList(newList);
  };

  const removeLastElementToList = () => {
    let newList = [...list];
    newList = newList.filter(
      (item: any, index: any) => index !== newList.length - 1,
    );
    setList(newList);
  };

  const removeIDElementToList = _id => {
    let newList = [...list];
    newList = newList.filter((item: any) => item.id !== _id);
    setList(newList);
  };

  const onSubmit = async () => {
    try {
      if (note.type === 'note') {
        await editNote({...note, id: note._id});
      } else if (note.type === 'image') {
        await editNote({
          ...note,
          id: note._id,
          image: `data:image/jpeg;base64,${image.assets[0].base64}`,
        });
      } else if (note.type === 'list') {
        const newList = list.map((item: any) => {
          return item.value;
        });

        const newValues = {
          ...note,
          list: list.length > 0 ? newList : ['item1', 'item2', 'item3'],
        };
        await editNote({...newValues, id: note._id});
      }

      navigation.navigate(homeRoute);
    } catch (error) {
      console.error('EDIT SUBMIT', error);
    } finally {
      // Complete successfully or with error
    }
  };

  return (
    <SafeAreaView style={noteStyles.bg}>
      <Text style={noteStyles.titleEmail}>Edit {note.type}</Text>
      <View style={noteStyles.blankSpace} />
      <ScrollView contentContainerStyle={noteStyles.scrollView}>
        {isLoading && <ActivityIndicator size="large" />}
        {!isLoading && (
          <>
            {note.type === 'note' && (
              <>
                <CustomInput
                  label="Title"
                  placeholder="name"
                  value={note.name}
                  onChangeText={onChange}
                  onBlur={null}
                  isSecured={false}
                  leftIcon=""
                  rightIcon=""
                  error={false}
                  onRightIconPress={null}
                  isScreen={true}
                />
                <CustomInput
                  label="Content"
                  placeholder="content"
                  value={note.content}
                  onChangeText={onChange}
                  onBlur={null}
                  isSecured={false}
                  leftIcon=""
                  rightIcon=""
                  isMultiline={true}
                  numLines={15}
                  error={false}
                  onRightIconPress={null}
                  isScreen={true}
                />
                <Button title="Submit" onPress={onSubmit} isLoading={false} />
              </>
            )}
            {note.type === 'image' && note.image && (
              <>
                <CustomInput
                  label="Title"
                  placeholder="name"
                  value={note.name}
                  onChangeText={onChange}
                  onBlur={null}
                  isSecured={false}
                  leftIcon=""
                  rightIcon=""
                  error={false}
                  onRightIconPress={null}
                  isScreen={true}
                />
                {
                  <View style={noteStyles.imageContainer}>
                    <Text>Old Image</Text>
                    <Image
                      style={noteStyles.oldAvatar}
                      source={{uri: note.image}}
                    />
                  </View>
                }
                <View style={noteStyles.blankSpace} />
                {image === null && (
                  <View style={noteStyles.imageContainer}>
                    <Text>Pick an image</Text>
                  </View>
                )}
                {!!image && image !== null && (
                  <View style={noteStyles.imageContainer}>
                    <Text>New image</Text>
                    <Image
                      style={noteStyles.oldAvatar}
                      source={{uri: image.assets[0].uri}}
                    />
                    <Text>{image?.assets[0].fileName}</Text>
                  </View>
                )}
                <View style={noteStyles.blank} />
                <View style={noteStyles.buttonContainer}>
                  <Button
                    title={'Upload'}
                    onPress={openGallery}
                    isLoading={false}
                    isFull={false}
                  />
                  <Button
                    title="Submit"
                    onPress={onSubmit}
                    isLoading={false}
                    isFull={false}
                    isDisabled={!(image !== null)}
                  />
                </View>
              </>
            )}
            {note.type === 'list' && (
              <>
                {
                  <CustomInput
                    label="Title"
                    placeholder="name"
                    value={note.name}
                    onChangeText={onChange}
                    onBlur={null}
                    isSecured={false}
                    leftIcon=""
                    rightIcon=""
                    error={false}
                    onRightIconPress={null}
                    isScreen={true}
                  />
                }
                {note.list.length > 0 &&
                  list.length > 0 &&
                  list.map((item: any) => (
                    <>
                      <CustomInput
                        key={item.id}
                        label="New Element"
                        placeholder="new Element"
                        value={item.value}
                        onChangeText={onChangeList}
                        onBlur={null}
                        isSecured={false}
                        leftIcon=""
                        rightIcon="delete"
                        error={false}
                        onRightIconPress={() => {
                          removeIDElementToList(item.id);
                        }}
                        id={item.id}
                        isScreen={true}
                      />
                    </>
                  ))}

                <View style={noteStyles.buttonContainer}>
                  <Button
                    title="Add"
                    onPress={addNewElementToList}
                    isLoading={false}
                    isFull={false}
                  />
                  <Button
                    title="Remove"
                    onPress={removeLastElementToList}
                    isLoading={false}
                    isFull={false}
                    isDisabled={list.length === 0}
                  />
                </View>

                <Button
                  title="Submit"
                  onPress={onSubmit}
                  isLoading={false}
                  isDisabled={!(list.length > 0)}
                />
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditNoteScreen;
