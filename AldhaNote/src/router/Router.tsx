import * as React from 'react';
import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// Login Screens
import LoginScreen from '../Views/LoginScreens/LoginScreen';
import ForgetPasswordScreen from '../Views/LoginScreens/ForgetPasswordScreen';
import RegisterScreen from '../Views/LoginScreens/RegisterScreen';
// Note Screens
import HomeScreen from '../Views/NoteScreens/HomeScreen';
import NoteDetailsScreen from '../Views/NoteScreens/NoteDetailsScreen';
import EditNoteScreen from '../Views/NoteScreens/EditNoteScreen';
// Profile Screens
import ProfileScreen from '../Views/ProfileScreens/ProfileScreen';
import ProfileDetailsScreen from '../Views/ProfileScreens/ProfileDetailsScreen';
import OnBoardingScreen from '../Views/OnBoardingScreen/OnBoardingScreen';

import {
  loginRoute,
  homeRoute,
  registerRoute,
  forgetPasswordRoute,
  profileRoute,
  profileDetailsRoute,
  noteDetailsRoute,
  notesRoute,
  editNoteRoute,
  onBoardingRoute,
} from '../utils/route.utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTasks, faUserCircle} from '@fortawesome/free-solid-svg-icons';
const Stack = createNativeStackNavigator();

const Router = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [initialView, setInitialView] = useState<string>('');

  let routes = [
    {
      id: 1,
      name: loginRoute,
      component: LoginScreen,
      isInitialRoute: true,
      options: {
        headerShown: false,
      },
    },
    {
      id: 2,
      name: onBoardingRoute,
      component: OnBoardingScreen,
      isInitialRoute: true,
      options: {
        headerShown: false,
      },
    },
    {
      id: 3,
      name: homeRoute,
      component: BottomTabNavigator,
      isInitialRoute: false,
      options: {
        headerShown: false,
      },
    },
    {
      id: 4,
      name: forgetPasswordRoute,
      component: ForgetPasswordScreen,
      isInitialRoute: false,
      options: {
        headerShown: false,
      },
    },
    {
      id: 5,
      name: registerRoute,
      component: RegisterScreen,
      isInitialRoute: false,
      options: {
        headerShown: false,
      },
    },
    {
      id: 6,
      name: profileDetailsRoute,
      component: ProfileDetailsScreen,
      isInitialRoute: false,
      options: {
        // headerShown: false,
      },
    },
    {
      id: 7,
      name: noteDetailsRoute,
      component: NoteDetailsScreen,
      isInitialRoute: false,
      options: {
        // headerShown: false,
      },
    },
    {
      id: 8,
      name: editNoteRoute,
      component: EditNoteScreen,
      isInitialRoute: false,
      options: {
        // headerShown: false,
      },
    },
  ];

  const changeOrder = async () => {
    try {
      setIsLoading(true);

      const jsonValue = await AsyncStorage.getItem('@user');
      const token = await AsyncStorage.getItem('@token');
      const onBoardingToken = await AsyncStorage.getItem('@onBoarding');

      if (jsonValue === null) {
        setInitialView(routes[0].name);
      } else if (jsonValue !== null) {
        routes[0].isInitialRoute = false;
        if (onBoardingToken === null) {
          routes[1].isInitialRoute = true;
          setInitialView(routes[1].name);
        } else {
          routes[1].isInitialRoute = false;
          routes[2].isInitialRoute = true;
          setInitialView(routes[2].name);
        }
      }

      setIsLoading(false);
    } catch (err) {
      console.error('LOGIN ROUTE ORDER: ', err);
    }
  };

  useEffect(() => {
    changeOrder();
  }, []);

  return (
    <>
      {!isLoading && (
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialView}>
            <Stack.Group
            //  screenOptions={({ navigation }) => ({
            //   presentation: 'modal',
            //   // headerLeft: () => <CancelButton onPress={navigation.goBack} />,
            //   headerStyle: { backgroundColor: 'papayawhip' },
            // })}
            >
              <>
                {routes.map(route => (
                  <Stack.Screen
                    key={route.id}
                    name={route.name}
                    component={route.component}
                    options={{...route.options}}
                  />
                ))}
              </>
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName={notesRoute}
      screenOptions={
        {
          // headerShown: false,
          // tabBarShowLabel: false,
        }
      }>
      <BottomTab.Screen
        name={notesRoute}
        component={HomeScreen}
        options={({navigation}: any) => ({
          title: 'Notes',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faTasks} color={color} size={size} />
          ),
          // tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          // headerRight: () => (
          //   <Pressable
          //     onPress={() => navigation.navigate('Modal')}
          //     style={({ pressed }) => ({
          //       opacity: pressed ? 0.5 : 1,
          //     })}>
          //     {/* <FontAwesome
          //       name="info-circle"
          //       size={25}
          //       color={Colors[colorScheme].text}
          //       style={{ marginRight: 15 }}
          //     /> */}
          //     <Text>Home</Text>
          //   </Pressable>
          // ),
        })}
      />
      <BottomTab.Screen
        name={profileRoute}
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faUserCircle} color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default Router;
