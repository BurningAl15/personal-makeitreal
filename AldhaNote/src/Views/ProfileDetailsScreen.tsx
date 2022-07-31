import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import Button from '../components/Button';
import {profileRoute} from '../utils/route.utils';
import {useUserData} from '../hooks/useUserData';
import {BASE_URL} from '../config/config';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import axios, {AxiosError} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from '../components/Snackbar';

const ProfileDetailsScreen = ({navigation}) => {
  const {userData, getFullName, getEmail, getImageURL, updateUserData} = useUserData();
  const [image, setImage] = useState<any>(null);
  const [messages, setMessages] = useState<any>([]);

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

  const onSubmit = async () => {
    try {
      const newValues = {
        ...userData,
        image: `data:image/jpeg;base64,${image.assets[0].base64}`,
      };
      const resp = await axios.patch(`${BASE_URL}/edit`, newValues);
      const user = JSON.stringify(resp.data.data.user);
      console.log('USER: ', user);
      await AsyncStorage.setItem('@user', user);
      // await updateUserData();

      navigation.navigate('Notes');
    } catch (error) {
      const err = error as AxiosError;

      let message = '';
      if (err.response) {
        switch (err.response.status) {
          case 413:
            message = 'Image is too large';
            break;
          default:
            message = 'Is empty';
            break;
        }
        console.log(err.response.status);
        console.log(err.response.data);
        setMessages([...messages, message]);
      }

      if (message === '') {
        message = 'You did not add an image, please add one';
        setMessages([...messages, message]);
      }

      console.log(error);
    } finally {
      console.log('FINALLY');
    }
  };

  return (
    <>
      <Snackbar messages={messages} setMessages={setMessages} />

      <SafeAreaView style={styles.bg}>
        <Text style={styles.screenPage}>User Details</Text>
        <View style={styles.blankSpace} />
        <View style={styles.blankSpace} />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={
                userData?.hasOwnProperty('image')
                  ? {uri: getImageURL()}
                  : {
                      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/60px-OOjs_UI_icon_userAvatar.svg.png',
                    }
              }
              // source={{uri: `https://cdn.icon-icons.com/icons2/2438/PNG/512/boy_avatar_icon_148455.png`}}
            />
          </View>
          {!!image && image !== null && (
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{uri: image.assets[0].uri}} />
              <Text>{image?.assets[0].fileName}</Text>
            </View>
          )}
          <Button title={'Upload'} onPress={openGallery} isLoading={false} />

          <Text style={styles.titleName}>{getFullName()}</Text>
          <Text style={styles.titleEmail}>{getEmail()}</Text>
          {/* <Text style={styles.titleEmail}>{getUserNotesCount()}</Text> */}
          <Button title={'Update'} onPress={onSubmit} isLoading={false} />
        </ScrollView>
      </SafeAreaView>
    </>
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

  titleName: {
    fontWeight: 'bold',
    marginRight: 16,
    marginLeft: 16,
    fontSize: 30,
  },
  titleEmail: {
    // fontWeight: 'bold',
    marginRight: 16,
    marginLeft: 16,
    fontSize: 25,
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
  avatar: {
    borderRadius: 100,
    width: 145,
    height: 145,
  },
  avatarContainer: {
    borderRadius: 100,
    width: 150,
    height: 150,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 2,
    padding: 2.5,
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

export default ProfileDetailsScreen;
