import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../config/config';

export const useUserData = () => {
  const [userData, setUserData] = useState<any>(null);

  const updateUserData = async () => {
    let userDataTemp = userData !== null && userData;
    if (userData === null){
      userDataTemp = await AsyncStorage.getItem('@user');
      userDataTemp = JSON.parse(userDataTemp);
    }
    console.log("USER DATA TEMP", userDataTemp);
    const resp = await axios.get(`${BASE_URL}/userData/${userDataTemp._id}`);
    const user = JSON.stringify(resp.data.data.user);
    await AsyncStorage.setItem('@user', user);
    setUserData(JSON.parse(user));
  };

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
    updateUserData,
  };
};
