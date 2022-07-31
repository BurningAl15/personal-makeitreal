import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View, Text, Image} from 'react-native';
import Button from '../../components/Button';
import {useUserData} from '../../hooks/useUserData';
import {BASE_URL} from '../../config/config';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import axios, {AxiosError} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from '../../components/Snackbar';
import {profileStyles} from '../styles';

const ProfileDetailsScreen = ({navigation}) => {
  const {userData, getFullName, getEmail, getImageURL} = useUserData();
  const [image, setImage] = useState<any>(null);
  const [messages, setMessages] = useState<any>([]);

  const options: ImageLibraryOptions = {
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
      await AsyncStorage.setItem('@user', user);

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
        setMessages([...messages, message]);
      }

      if (message === '') {
        message = 'You did not add an image, please add one';
        setMessages([...messages, message]);
      }

      console.error(error);
    } finally {
      // Complete the request
    }
  };

  return (
    <>
      <Snackbar messages={messages} setMessages={setMessages} />

      <SafeAreaView style={profileStyles.bg}>
        <Text style={profileStyles.screenPage}>User Details</Text>
        <View style={profileStyles.blankSpace} />
        <View style={profileStyles.blankSpace} />
        <ScrollView contentContainerStyle={profileStyles.scrollView}>
          <View style={profileStyles.avatarContainer}>
            <Image
              style={profileStyles.avatar}
              source={
                userData?.hasOwnProperty('image')
                  ? {uri: getImageURL()}
                  : {
                      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/60px-OOjs_UI_icon_userAvatar.svg.png',
                    }
              }
            />
          </View>
          {!!image && image !== null && (
            <View style={profileStyles.imageContainer}>
              <Image
                style={profileStyles.image}
                source={{uri: image.assets[0].uri}}
              />
              <Text>{image?.assets[0].fileName}</Text>
            </View>
          )}
          <Button title={'Upload'} onPress={openGallery} isLoading={false} />

          <Text style={profileStyles.titleName}>{getFullName()}</Text>
          <Text style={profileStyles.titleEmail}>{getEmail()}</Text>
          {/* <Text style={profileStyles.titleEmail}>{getUserNotesCount()}</Text> */}
          <Button title={'Update'} onPress={onSubmit} isLoading={false} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ProfileDetailsScreen;
