import React, {createContext} from 'react';
import {BASE_URL} from '../config/config';
import axios from 'axios';

export const AuthContext = createContext(null);

interface IAuthProviderProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const AuthProvider = ({children}): JSX.Element => {
  const register = (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    axios
      .post(`${BASE_URL}/register`, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      })
      .then(res => {
        let userInfo = res.data;
        console.log(userInfo);
      })
      .catch(e => {
        console.error('AUTH CONTEXT:', e);
      });
  };

  return (
    <AuthContext.Provider value={{register}}>{children}</AuthContext.Provider>
  );
};
