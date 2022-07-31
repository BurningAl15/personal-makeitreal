import * as React from 'react';
import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from '../Views/LoginScreen';
import ForgetPasswordScreen from '../Views/ForgetPasswordScreen';
import RegisterScreen from '../Views/RegisterScreen';
import HomeScreen from '../Views/HomeScreen';
import ProfileScreen from '../Views/ProfileScreen';
import ProfileDetailsScreen from '../Views/ProfileDetailsScreen';
import NoteDetailsScreen from '../Views/NoteDetailsScreen';
import OnBoardingScreen from '../Views/OnBoardingScreen';
import EditNoteScreen from '../Views/EditNoteScreen';

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
      options:{
        // headerShown: false,
      },
    },
    // {
    //   id: 1,
    //   name: 'on Boarding',
    //   component: OnBoardingScreen,
    //   isInitialRoute: true,
    // },
    {
      id: 2,
      name: homeRoute,
      component: BottomTabNavigator,
      isInitialRoute: false,
      options:{
        headerShown: false,
      },
    },
    {
      id: 3,
      name: forgetPasswordRoute,
      component: ForgetPasswordScreen,
      isInitialRoute: false,
      options:{
        // headerShown: false,
      },
    },
    {
      id: 4,
      name: registerRoute,
      component: RegisterScreen,
      isInitialRoute: false,
      options:{
        // headerShown: false,
      },
    },
    {
      id: 5,
      name: profileDetailsRoute,
      component: ProfileDetailsScreen,
      isInitialRoute: false,
      options:{
        // headerShown: false,
      },
    },
    {
      id: 6,
      name: noteDetailsRoute,
      component: NoteDetailsScreen,
      isInitialRoute: false,
      options:{
        // headerShown: false,
      },
    },
    {
      id: 7,
      name: editNoteRoute,
      component: EditNoteScreen,
      isInitialRoute: false,
      options:{
        // headerShown: false,
      },
    },
  ];

  const changeOrder = async () => {
    try {
      setIsLoading(true);

      const jsonValue = await AsyncStorage.getItem('@user');
      const token = await AsyncStorage.getItem('@token');
      // console.log('>>> Storage: ', JSON.stringify(jsonValue));
      // console.log(`>>> Token: ${JSON.stringify(token)}`);

      if (jsonValue === null) {
        // console.log('2> Routes Order: ', routes);
        setInitialView(routes[0].name);
      } else if (jsonValue !== null) {
        // else if (token !== null){
        // && jsonValue !== undefined
        routes[0].isInitialRoute = false;
        routes[1].isInitialRoute = true;
        // console.log('1> Routes Order: ', routes);
        setInitialView(routes[1].name);
      }

      setIsLoading(false);
    } catch (err) {
      console.log('ERROR: ', err);
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
  // const {isLoading getNoteNumbers} = useNotes();

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
