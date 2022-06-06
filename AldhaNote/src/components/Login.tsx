import React, { useState} from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { homeRoute, forgetPasswordRoute, registerRoute} from '../utils/route.utils';
import { Formik } from 'formik';
import Input from './Input';
import Button from './Button';
import * as yup from 'yup';
import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [passwordChecker, onChangePasswordChecker] = useState<boolean>(true);

  const initialValues = { email: '', password: '' };

  const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email()
        .required(),
    password: yup
        .string()
        .required('Please enter your password')
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          'Password must contain at least 8 characters, one uppercase, one number and one special case character'
        ),
  });

  const onSubmit = async (values:any,{setSubmitting}) => {
    try {
      console.log(values);
      const resp = await axios.post(`${BASE_URL}/user/login`, values);
      await AsyncStorage.setItem('@token', resp.data.token);
      const userValue = JSON.stringify(resp.data.user);
      await AsyncStorage.setItem('@user', userValue);
      // console.log('RESP: ', resp.data);
      // console.log('Async Storage: ', AsyncStorage.getItem('@token'));
      setSubmitting(true);
    }
    catch (error){
        console.log(error);
    }
    finally {
      console.log('FINALLY');
      navigation.navigate(homeRoute);
    }
  };

  return (
    <Formik
      validationSchema={loginSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, isSubmitting, values, errors, touched}) => (
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <View style={styles.button} />
          <Input
            label="Email"
            placeholder="email@example.com"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            isSecured={false}
            leftIcon="account"
            rightIcon=""
            error={touched.email && errors.email}
            onRightIconPress={null}
          />
          <Input
            label="Password"
            placeholder="********"
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            isSecured={passwordChecker}
            leftIcon="lock"
            rightIcon={passwordChecker ? 'eye' : 'eye-off'}
            error={touched.password && errors.password}
            onRightIconPress={()=>onChangePasswordChecker(!passwordChecker)}
          />
          <Button
            title="Login"
            onPress={handleSubmit}
            isLoading={isSubmitting}
          />
          <Button
            title="Register"
            onPress={() => navigation.navigate(registerRoute)}
            isLoading={false}
          />
          <Button
            title="Forget password"
            onPress={() => navigation.navigate(forgetPasswordRoute)}
            isLoading={false}
          />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 12,
    marginLeft: 12,
    height:'100%',
    // flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
  },
  backgroundStyle: {},
  button: {
    marginBottom: 16,
  },
});

export default Login;
