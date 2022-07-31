import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
} from 'react-native';
import {loginRoute} from '../utils/route.utils';
import {Formik} from 'formik';
import Input from './Input';
import Button from './Button';
import * as yup from 'yup';
import axios from 'axios';
import {BASE_URL} from '../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from './Snackbar';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

const Register = ({navigation}) => {
  const [passwordChecker, onChangePasswordChecker] = useState<boolean>(true);
  const [confirmPasswordChecker, onChangeConfirmPasswordChecker] =
    useState<boolean>(true);
  const [messages, setMessages] = useState<any>([]);
  const [image, setImage] = useState<any>(null);

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

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    securityQuestion: '',
    securityAnswer: '',
  };

  const loginSchema = yup.object().shape({
    firstName: yup
      .string()
      .required('A first Name is required')
      .min(2, 'First Name must be at least 2 characters'),
    lastName: yup
      .string()
      .required('A last Name is required')
      .min(2, 'Last  Name must be at least 2 characters'),
    email: yup.string().email().required(),
    password: yup
      .string()
      .required('Please enter your password')
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        'Password must contain at least 8 characters, one uppercase, one number and one special case character',
      ),
    confirmPassword: yup
      .string()
      .required('Please confirm your password')
      .when('password', {
        is: (password: any) => (password && password.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf([yup.ref('password')], "Password doesn't match"),
      }),
  });

  const onSubmit = async (values: any, {setSubmitting}) => {
    try {
      const newValues = {
        ...values,
        image: `data:image/jpeg;base64,${image.assets[0].base64}`,
      };
      const resp = await axios.post(`${BASE_URL}/register`, newValues);
      await AsyncStorage.setItem('@token', resp.data.data.user.activationToken);

      // Activate User
      const token = await AsyncStorage.getItem('@token');
      await axios.post(`${BASE_URL}/login/${token}`, values);

      setSubmitting(true);
      navigation.navigate(loginRoute);
    } catch (error) {
      const message = 'Your info is already registered';
      setMessages([...messages, message]);
      console.error(error);
    } finally {
      // Registry successful
    }
  };

  return (
    <>
      <Snackbar messages={messages} setMessages={setMessages} />
      <Formik
        validationSchema={loginSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          values,
          errors,
          touched,
        }) => (
          <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <View style={styles.button} />
            <ScrollView>
              <Input
                label="First Name"
                placeholder="Aldhair"
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                isSecured={false}
                leftIcon="account"
                rightIcon=""
                error={touched.firstName && errors.firstName}
                onRightIconPress={null}
              />
              <Input
                label="Last Name"
                placeholder="Vera Camacho"
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                isSecured={false}
                leftIcon="account"
                rightIcon=""
                error={touched.lastName && errors.lastName}
                onRightIconPress={null}
              />
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
                onRightIconPress={() =>
                  onChangePasswordChecker(!passwordChecker)
                }
              />
              <Input
                label="Confirm Password"
                placeholder="********"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                isSecured={confirmPasswordChecker}
                leftIcon="lock"
                rightIcon={confirmPasswordChecker ? 'eye' : 'eye-off'}
                error={touched.confirmPassword && errors.confirmPassword}
                onRightIconPress={() =>
                  onChangeConfirmPasswordChecker(!confirmPasswordChecker)
                }
              />
              {!!image && image !== null && (
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
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
              <Input
                label="Write a security question"
                placeholder="What is your favorite color?"
                value={values.securityQuestion}
                onChangeText={handleChange('securityQuestion')}
                onBlur={handleBlur('securityQuestion')}
                isSecured={false}
                leftIcon="lock"
                rightIcon=""
                error={touched.securityQuestion && errors.securityQuestion}
                onRightIconPress={null}
              />
              <Input
                label="Write a security answer"
                placeholder="Blue"
                value={values.securityAnswer}
                onChangeText={handleChange('securityAnswer')}
                onBlur={handleBlur('securityAnswer')}
                isSecured={false}
                leftIcon="lock"
                rightIcon=""
                error={touched.securityAnswer && errors.securityAnswer}
                onRightIconPress={null}
              />
              <Button
                title="Register"
                onPress={handleSubmit}
                isLoading={isSubmitting}
              />
              <View style={styles.button} />
              <Button
                title="Login"
                onPress={() => navigation.navigate(loginRoute)}
                isLoading={false}
              />
            </ScrollView>
          </SafeAreaView>
        )}
      </Formik>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 12,
    marginLeft: 12,
    height: '100%',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
  },
  backgroundStyle: {},
  button: {
    marginBottom: 16,
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

export default Register;
