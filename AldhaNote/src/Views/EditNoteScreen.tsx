import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Image,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import {faAngleLeft, faCircle} from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button';
import axios from 'axios';
import {BASE_URL} from '../config/config';
import CustomInput from '../components/CustomInput';
import { useNotes } from '../hooks/useNotes';
import { homeRoute } from '../utils/route.utils';

import {
    ImageLibraryOptions,
    launchCamera,
    launchImageLibrary,
} from 'react-native-image-picker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const EditNoteScreen = ({ route, navigation}) => {
    const { noteId } = route.params;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [note, setNote] = useState<any>({});
    const [image, setImage] = useState<any>(null);
    const [list, setList] = useState<any>([]);
    const { editNote } = useNotes();

    useEffect(() => {
        getNote();
    }, []);

    const options: ImageLibraryOptions = {
        // maxHeight: 600,
        // maxWidth: 600,
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
            const newList = newNote.list.map((item: any,index: any) => {
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

    const onChange = (name, content) =>{
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
        newList = newList.filter((item: any, index: any) => index !== newList.length - 1);
        setList(newList);
    };

    const removeIDElementToList = (_id) => {
        let newList = [...list];
        newList = newList.filter((item: any) => item.id !== _id);
        setList(newList);
    };

    const onSubmit = async () => {
        try {
            if (note.type === 'note'){
                await editNote({...note,id:note._id});
            }
            else if (note.type === 'image'){
                await editNote({...note,id:note._id, image: `data:image/jpeg;base64,${image.assets[0].base64}`});
            }
            else if (note.type === 'list'){
                const newList = list.map((item: any) => {
                    return item.value;
                });

                const newValues = {
                    ...note,
                    list: list.length > 0 ? newList : ['item1', 'item2', 'item3'],
                };
                await editNote({...newValues,id:note._id});
            }

            navigation.navigate(homeRoute);
        } catch (error) {
            console.error('EDIT SUBMIT',error);
        } finally {
            // Complete successfully or with error
        }
    };

    return (
      <SafeAreaView style={styles.bg}>
        <Text style={styles.titleEmail}>Edit {note.type}</Text>
        <View style={styles.blankSpace} />
        <ScrollView contentContainerStyle={styles.scrollView}>
          {isLoading && <ActivityIndicator size="large" />}
          {!isLoading && (
            <>
                {
                    note.type === 'note' &&
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
                            // error={touched.name && errors.name}
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
                            // error={touched.name && errors.name}
                            error={false}
                            onRightIconPress={null}
                            isScreen={true}
                        />
                        <Button title="Submit" onPress={onSubmit} isLoading={false} />
                    </>
                }
                {
                    note.type === 'image' && note.image &&
                    (
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
                                // error={touched.name && errors.name}
                                error={false}
                                onRightIconPress={null}
                                isScreen={true}
                            />
                            {
                                <View style={styles.imageContainer}>
                                    <Text>Old Image</Text>
                                    <Image style={styles.oldAvatar} source={{uri: note.image}} />
                                </View>
                            }
                            <View style={styles.blankSpace} />
                            {image === null && (
                                <View style={styles.imageContainer}>
                                    <Text>Pick an image</Text>
                                </View>
                            )}
                            {!!image && image !== null && (
                                <View style={styles.imageContainer}>
                                    <Text>New image</Text>
                                    <Image
                                        style={styles.oldAvatar}
                                        source={{uri: image.assets[0].uri}}
                                    />
                                    <Text>{image?.assets[0].fileName}</Text>
                                </View>
                            )}
                            <View style={styles.blank} />
                            <View style={styles.buttonContainer}>
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
                    )
                }
                {
                    note.type === 'list' &&
                    (
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
                                    // error={touched.name && errors.name}
                                    error={false}
                                    onRightIconPress={null}
                                    isScreen={true}
                                />
                            }
                            {
                                note.list.length > 0 && list.length > 0 &&
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
                                        // error={touched.name && errors.name}
                                        error={false}
                                        onRightIconPress={()=>{removeIDElementToList(item.id);}}
                                        id={item.id}
                                        isScreen={true}
                                    />
                                </>
                            ))}

                            <View style={styles.buttonContainer}>
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

                            <Button title="Submit" onPress={onSubmit} isLoading={false} isDisabled={!(list.length > 0)}/>
                        </>
                    )
                }
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    buttonContainer:{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    blank: {
        flex: 1,
    },
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
      // fontWeight: 'bold',
      marginRight: 16,
      marginLeft: 16,
      fontSize: 20,
      marginBottom: 16,
      textAlign: 'center',
    },
    titleEmail: {
      // fontWeight: 'bold',
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
      // width: windowWidth - 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    oldAvatar:{
        // borderRadius: 200,
        width: 200,
        height: 200,
    },
    avatar: {
    //   borderRadius: 300,
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
      // flex:1,
      display: 'flex',
      marginBottom: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
        borderRadius: 10,
        minWidth: 150,
        minHeight: 150,
    },
    imageContainer: {
        maxWidth:'80%',
        marginHorizontal: 20,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#000',
        borderWidth: 2,
        padding: 10,
    },
});

export default EditNoteScreen;
