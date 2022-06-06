import * as React from 'react';
import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../Views/LoginScreen';
import ForgetPasswordScreen from '../Views/ForgetPasswordScreen';
import RegisterScreen from '../Views/RegisterScreen';
import HomeScreen from '../Views/HomeScreen';
import {loginRoute, homeRoute, registerRoute, forgetPasswordRoute} from '../utils/route.utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const Router = () => {
  const [isLoading,setIsLoading] = useState<boolean>(true);
  const [initialView,setInitialView] = useState<string>('');
  let routes = [
    {id:1, name: loginRoute, component: LoginScreen, isInitialRoute: true},
    {id:2, name: homeRoute, component: HomeScreen, isInitialRoute: false},
    {id:3, name: forgetPasswordRoute, component: ForgetPasswordScreen, isInitialRoute: false},
    {id:4, name: registerRoute, component: RegisterScreen, isInitialRoute: false},
  ];

  const changeOrder = async () => {
    setIsLoading(true);
    const jsonValue = await AsyncStorage.getItem('@user');
    // console.log('ASYNC STORAGE: ', jsonValue);
    if (!!AsyncStorage.getItem('@token') && jsonValue){
      routes[0].isInitialRoute = false;
      routes[1].isInitialRoute = true;
      // console.log('1> Routes Order: ', routes);
      setInitialView(routes[1].name);
    }
    else {
      setInitialView(routes[0].name);
      // console.log('2> Routes Order: ', routes);
    }

    setIsLoading(false);
  };

  useEffect(()=>{
    changeOrder();
  },[]);

  return (
    <>
      {
        !isLoading &&
          <NavigationContainer>
            <Stack.Navigator initialRouteName={initialView}>
              <>
                {
                  routes.map((route)=>(<Stack.Screen
                                          key={route.id}
                                          name={route.name}
                                          component={route.component}
                                          options={{headerShown:false}}
                                      />))
                }
              </>
            </Stack.Navigator>
          </NavigationContainer>
      }
    </>
  );
};

export default Router;
