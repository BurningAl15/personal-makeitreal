import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUserData = () => {
  const [userData, setUserData] = useState<any>(null);

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user');
      console.log('ASYNC STORAGE: ', jsonValue);
      setUserData(jsonValue != null ? JSON.parse(jsonValue) : null);
    } catch (e) {
      console.log(e);
    }
  };

  const getFullName = () => {
    return userData?.firstName + ' ' + userData?.lastName;
  };

  const getEmail = () => {
    return userData?.email;
  };

  const getImageURL = () => {
    return userData?.image;
  };

  const getSecurityQuestion = () => {
    return userData?.securityQuestion;
  };

  const getSecurityAnswer = () => {
    return userData?.securityAnswer;
  };

  const getUserNotesCount = () => {
    return userData?.notes.length;
  };

  useEffect(() => {
    getUserData();
  }, []);

  return {
    userData,
    getFullName,
    getEmail,
    getImageURL,
    getUserNotesCount,
    getSecurityQuestion,
    getSecurityAnswer,
  };
};
