import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
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
import CustomInput from '../../components/CustomInput';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const ProfileDetailsScreen = ({navigation}) => {
  const {userData, getFullName, getEmail, getImageURL} = useUserData();
  const [image, setImage] = useState<any>(null);
  const [messages, setMessages] = useState<any>([]);
  const [currentUserData, setCurrentUserData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [passwordChecker, onChangePasswordChecker] = useState<boolean>(true);

  const validation = () => {
    const firstNameValidation =
      currentUserData.firstName.length > 0 &&
      currentUserData.firstName !== userData.firstName;
    const lastNameValidation =
      currentUserData.lastName.length > 0 &&
      currentUserData.lastName !== userData.lastName;
    const emailValidation =
      currentUserData.email.length > 0 &&
      currentUserData.email !== userData.email;
    const passwordValidation = currentUserData.password.length > 0;
    const securityQuestion =
      currentUserData.securityQuestion.length > 0 &&
      currentUserData.securityQuestion !== userData.securityQuestion;
    const securityAnswer =
      currentUserData.securityAnswer.length > 0 &&
      currentUserData.securityAnswer !== userData.securityAnswer;

    return (
      firstNameValidation ||
      lastNameValidation ||
      emailValidation ||
      passwordValidation ||
      securityQuestion ||
      securityAnswer
    );
  };

  const getUserData = async () => {
    try {
      setIsLoading(true);
      if (userData !== null) {
        setCurrentUserData({...userData, password: ''});
        // await wait(1000);
        setIsLoading(false);
      }
    } catch (err) {
      console.error('GET PROFILE:', err);
    }
  };

  const onChange = (name, content) => {
    const newUserData = {...currentUserData, [name]: content};
    setCurrentUserData(newUserData);
  };

  useEffect(() => {
    getUserData();
  }, [userData]);

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
      let newValues = {...currentUserData};
      if (image !== null) {
        newValues = {
          ...currentUserData,
          image: `data:image/jpeg;base64,${image.assets[0].base64}`,
        };
      }
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
        <ScrollView contentContainerStyle={profileStyles.scrollView}>
          {isLoading && <ActivityIndicator size="large" />}

          {!isLoading && Object.values(currentUserData).length > 0 && (
            <>
              <CustomInput
                label="First Name"
                placeholder="firstName"
                value={currentUserData?.firstName}
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
                label="Last Name"
                placeholder="lastName"
                value={currentUserData?.lastName}
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
                label="Email"
                placeholder="email"
                value={currentUserData?.email}
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
                label="Password"
                placeholder="password"
                value={currentUserData?.password}
                onChangeText={onChange}
                onBlur={null}
                isSecured={passwordChecker}
                leftIcon=""
                rightIcon={passwordChecker ? 'eye' : 'eye-off'}
                error={false}
                onRightIconPress={() =>
                  onChangePasswordChecker(!passwordChecker)
                }
                isScreen={true}
                hasMessage={
                  'Password must contain at least 8 characters, one uppercase, one number and one special case character'
                }
              />
              <CustomInput
                label="Security Question"
                placeholder="securityQuestion"
                value={currentUserData?.securityQuestion}
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
                label="Security Answer"
                placeholder="securityAnswer"
                value={currentUserData?.securityAnswer}
                onChangeText={onChange}
                onBlur={null}
                isSecured={false}
                leftIcon=""
                rightIcon=""
                error={false}
                onRightIconPress={null}
                isScreen={true}
              />

              <View style={profileStyles.avatarContainer}>
                <Image
                  style={profileStyles.avatar}
                  source={
                    currentUserData?.hasOwnProperty('image')
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
              <Button
                title={'Upload'}
                onPress={openGallery}
                isLoading={false}
              />
              <Button
                title={'Update'}
                onPress={onSubmit}
                isLoading={false}
                isDisabled={!validation()}
              />
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ProfileDetailsScreen;
