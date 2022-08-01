import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSignOut, faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import {useUserData} from '../../hooks/useUserData';
import {profileDetailsRoute} from '../../utils/route.utils';
import {useIsFocused} from '@react-navigation/native';
import {profileStyles} from '../styles';

const ProfileScreen = ({navigation}) => {
  const {userData, getFullName, getEmail, getImageURL, updateUserData} =
    useUserData();
  const isFocused = useIsFocused();

  const navigateToProfile = () => {
    navigation.navigate(profileDetailsRoute);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('@user');
    await AsyncStorage.removeItem('@token');
    navigation.navigate('Login');
  };

  useEffect(() => {
    if (isFocused) {
      updateUserData();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={profileStyles.bg}>
      <ScrollView contentContainerStyle={profileStyles.scrollView}>
        <Pressable
          onPress={() => navigateToProfile()}
          style={({pressed}) => ({
            opacity: pressed ? 0.5 : 1,
            ...profileStyles.profile,
          })}>
          <View style={profileStyles.avatarContainerProfile}>
            <Image
              style={profileStyles.avatarProfile}
              source={
                userData?.hasOwnProperty('image')
                  ? {uri: getImageURL()}
                  : {
                      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/60px-OOjs_UI_icon_userAvatar.svg.png',
                    }
              }
            />
          </View>
          <Text style={profileStyles.title}>
            {getFullName() + '\n' + getEmail()}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigateToProfile()}
          style={({pressed}) => ({
            opacity: pressed ? 0.5 : 1,
            ...profileStyles.button,
          })}>
          <FontAwesomeIcon
            size={25}
            style={profileStyles.icon}
            icon={faPenToSquare}
          />
          <Text style={profileStyles.title}>Edit Profile</Text>
        </Pressable>
      </ScrollView>
      <Pressable
        onPress={() => logout()}
        style={({pressed}) => ({
          opacity: pressed ? 0.5 : 1,
          ...profileStyles.button,
        })}>
        <FontAwesomeIcon
          size={25}
          style={profileStyles.icon}
          icon={faSignOut}
        />
        <Text style={profileStyles.title}>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ProfileScreen;
