import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSignOut, faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import {useUserData} from '../hooks/useUserData';
import {profileDetailsRoute} from '../utils/route.utils';

const ProfileScreen = ({navigation}) => {
  const {userData, getFullName, getEmail, getImageURL} = useUserData();

  const navigateToProfile = () => {
    navigation.navigate(profileDetailsRoute);
  };

  const logout = async () => {
    // await AsyncStorage.setItem('@user', 'null');
    // await AsyncStorage.setItem('@token', 'null');
    await AsyncStorage.removeItem('@user');
    await AsyncStorage.removeItem('@token');
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.bg}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Pressable
          onPress={() => navigateToProfile()}
          style={({pressed}) => ({
            opacity: pressed ? 0.5 : 1,
            ...styles.profile,
          })}>
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
            />
          </View>
          <Text style={styles.title}>{getFullName() + '\n' + getEmail()}</Text>
        </Pressable>

        <Pressable
          onPress={() => console.warn('DO ANYTHING')}
          style={({pressed}) => ({
            opacity: pressed ? 0.5 : 1,
            ...styles.button,
          })}>
          <FontAwesomeIcon size={25} style={styles.icon} icon={faPenToSquare} />
          <Text style={styles.title}>Edit Profile</Text>
        </Pressable>
      </ScrollView>
      <Pressable
        onPress={() => logout()}
        style={({pressed}) => ({
          opacity: pressed ? 0.5 : 1,
          ...styles.button,
        })}>
        <FontAwesomeIcon size={25} style={styles.icon} icon={faSignOut} />
        <Text style={styles.title}>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  title: {
    // fontWeight: 'bold',
    marginRight: 16,
    marginLeft: 16,
    fontSize: 16,
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
    borderRadius: 50,
    width: 45,
    height: 45,
  },
  avatarContainer: {
    borderRadius: 50,
    width: 50,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 2,
    padding: 2.5,
  },
  profile: {
    // flex:1,
    display: 'flex',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    // flex:1,
    // justifyContent:'flex-start',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 20,
    width: '90%',
    marginHorizontal: 16,
    borderRadius: 10,
  },
  icon: {
    // marginRight: 15,
  },
});

export default ProfileScreen;
