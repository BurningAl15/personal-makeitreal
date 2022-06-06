import React, { useState} from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { loginRoute } from '../utils/route.utils';
import { Formik } from 'formik';
import Input from './Input';
import Button from './Button';
import * as yup from 'yup';
import axios from 'axios';
import { BASE_URL } from '../config/config';

const Register = ({navigation}) => {
    const [passwordChecker, onChangePasswordChecker] = useState<boolean>(true);

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

    const initialValues = {
        firstName:'',
        lastName:'',
        email: '',
        password: '',
        confirmPassword: '',
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
        confirmPassword: yup
            .string()
            .required('Please confirm your password')
            .when('password', {
                is: (password:any) => (password && password.length > 0 ? true : false),
                then: yup.string().oneOf([yup.ref('password')], 'Password doesn\'t match'),
            }),
    });

    const onSubmit = async (values:any,{setSubmitting}) => {
        try {
            console.log(values);
            const resp = await axios.post(`${BASE_URL}/user/register`, values);
            console.log('RESP: ', resp.data);
            setSubmitting(true);
        }
        catch (error){
            console.log(error);
        }
        finally {
            navigation.navigate(loginRoute);
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
                <Text style={styles.title}>Register</Text>
                <View style={styles.button} />
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
                    onRightIconPress={()=>onChangePasswordChecker(!passwordChecker)}
                />
                <Input
                    label="Confirm Password"
                    placeholder="********"
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    isSecured={passwordChecker}
                    leftIcon="lock"
                    rightIcon={passwordChecker ? 'eye' : 'eye-off'}
                    error={touched.confirmPassword && errors.confirmPassword}
                    onRightIconPress={()=>onChangePasswordChecker(!passwordChecker)}
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
            </View>
          )}
        </Formik>
      );
};

export default Register;
