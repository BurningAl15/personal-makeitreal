import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {FAB} from 'react-native-paper';
// import * as yup from 'yup';
import Button from './Button';
import axios from 'axios';
import {BASE_URL} from '../config/config';
import CustomSelect from './CustomSelect';
import CustomInput from './CustomInput';
import {
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

interface NoteType {
  noteType: string;
  id: string;
}

const CustomModal = ({modalVisible, setModalVisible, addNote}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [types, setTypes] = useState<NoteType[]>([]);
  const initialValues = {type: '', name: '', content: '', image: {}, list: []};
  const [values, setValues] = useState(initialValues);
  const [image, setImage] = useState<any>(null);
  const [list, setList] = useState<any>([]);

  const options: ImageLibraryOptions = {
    maxHeight: 600,
    maxWidth: 600,
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: true,
  };

  const openGallery = async () => {
    const images = await launchImageLibrary(options);
    setImage(images);
  };

  const getTypes = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/noteTypes`);
      const newTypes = {...response.data.data}.noteTypes.map((type: any) => ({
        id: type._id,
        value: type.noteType,
        label: type.noteType.charAt(0).toUpperCase() + type.noteType.slice(1),
      }));
      setTypes(newTypes);
    } catch (error) {
      console.log('>>> ', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (modalVisible) {
      setValues(initialValues);
      setImage(null);
      setList([]);
    }
  }, [modalVisible]);

  useEffect(() => {
    getTypes();
  }, []);

  const onChange = (name, value) => {
    setValues({...values, [name]: value});
  };

  const onChangeList = (name, value, id) => {
    const listElement = [...list].map((item: any) => {
      if (item.id === id) {
        return {...item, value};
      } else {
        return item;
      }
    });
    console.log('>>> ', listElement);
    // {name: [name], value: value}
    setList(listElement);
  };

  const addNewElementToList = () => {
    const newList = [...list];
    newList.push({id: list.length, value: ''});
    console.log('>>> LIST LENGTH', list.length);
    setList(newList);
  };

  const onSubmit = async () => {
    try {
      if (values.type === 'note') {
        console.log(`>>> SUBMIT NOTE: ${values}`);
        addNote({...values});
      } else if (values.type === 'image') {
        console.log(`>>> SUBMIT IMAGE: ${JSON.stringify(image)}`);
        const newValues = {
          ...values,
          image: `data:image/jpeg;base64,${image.assets[0].base64}`,
        };
        addNote(newValues);
      } else if (values.type === 'list') {
        const newList = list.map((item: any) => {
          return item.value;
        });

        const newValues = {
          ...values,
          list: list.length > 0 ? newList : ['item1', 'item2', 'item3'],
        };
        addNote(newValues);
      }
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    } finally {
      console.log('FINALLY');
    }
  };

  return (
    <>
      {!isLoading && (
        <SafeAreaView
          style={modalVisible ? styles.backgroundOn : styles.backgroundOff}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.modalContentContainer}>
              <View style={styles.modalView}>
                <FAB
                  style={styles.fab}
                  small
                  icon="close"
                  onPress={() => setModalVisible(false)}
                />
                <Text style={styles.modalText}>Add a note</Text>
                <ScrollView style={styles.container}>
                  <CustomSelect types={types} handleChange={onChange} />
                  {values.type === '' && <View style={styles.blank} />}
                  {values.type === 'note' && (
                    <>
                      <CustomInput
                        label="Title"
                        placeholder="name"
                        value={values.name}
                        onChangeText={onChange}
                        onBlur={null}
                        isSecured={false}
                        leftIcon=""
                        rightIcon=""
                        // error={touched.name && errors.name}
                        error={false}
                        onRightIconPress={null}
                      />
                      <CustomInput
                        label="Content"
                        placeholder="content"
                        value={values.content}
                        onChangeText={onChange}
                        onBlur={null}
                        isSecured={false}
                        leftIcon=""
                        rightIcon=""
                        isMultiline={true}
                        numLines={15}
                        // error={touched.content && errors.content}
                        error={false}
                        onRightIconPress={null}
                      />
                      <View style={styles.blank} />
                    </>
                  )}
                  {values.type === 'image' && (
                    <>
                      <CustomInput
                        label="Title"
                        placeholder="name"
                        value={values.name}
                        onChangeText={onChange}
                        onBlur={null}
                        isSecured={false}
                        leftIcon=""
                        rightIcon=""
                        // error={touched.name && errors.name}
                        error={false}
                        onRightIconPress={null}
                      />
                      {image === null && (
                        <View style={styles.imageContainer}>
                          <Text>Pick an image</Text>
                        </View>
                      )}
                      {!!image && image !== null && (
                        <View style={styles.imageContainer}>
                          <Image
                            style={styles.image}
                            source={{uri: image.assets[0].uri}}
                          />
                          <Text>{image?.assets[0].fileName}</Text>
                        </View>
                      )}
                      <View style={styles.blank} />
                      <Button
                        title={'Upload'}
                        onPress={openGallery}
                        isLoading={false}
                      />
                    </>
                  )}
                  {values.type === 'list' && (
                    <>
                      <CustomInput
                        label="Title"
                        placeholder="name"
                        value={values.name}
                        onChangeText={onChange}
                        onBlur={null}
                        isSecured={false}
                        leftIcon=""
                        rightIcon=""
                        // error={touched.name && errors.name}
                        error={false}
                        onRightIconPress={null}
                      />
                      {list.length > 0 &&
                        list.map((item: any, index: number) => (
                          <CustomInput
                            key={index}
                            label="New Element"
                            placeholder="new Element"
                            value={item.value}
                            onChangeText={onChangeList}
                            onBlur={null}
                            isSecured={false}
                            leftIcon=""
                            rightIcon=""
                            // error={touched.name && errors.name}
                            error={false}
                            onRightIconPress={null}
                            id={index}
                          />
                        ))}
                      <Button
                        title="Add Element"
                        onPress={addNewElementToList}
                        isLoading={false}
                      />
                      <View style={styles.blank} />
                    </>
                  )}
                </ScrollView>
                <Button title="Submit" onPress={onSubmit} isLoading={false} />
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  blank: {
    flex: 1,
  },
  backgroundOff: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: -1,
    flex: 1,
  },
  backgroundOn: {
    backgroundColor: '#00000099',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    flex: 1,
  },
  modalContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    padding: 10,
  },
  modalView: {
    width: '95%',
    height: '95%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    top: 0,
  },
  image: {
    borderRadius: 10,
    minWidth: 150,
    minHeight: 150,
  },
  imageContainer: {
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

export default CustomModal;
