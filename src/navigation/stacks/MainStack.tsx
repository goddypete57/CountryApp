import 'react-native-gesture-handler';
import React, { useContext, useRef, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Platform, Text, TouchableOpacity, View, Dimensions, KeyboardAvoidingView, TextInput } from 'react-native';
// import { AuthContext } from '../../../context/AuthContext';
import colors from '../../../assets/colors/colors';
import mainRouts from '../routs/mainRouts';
import Search from '../../screens/Search';
import SearchDetail from '../../screens/SearchDetail';
import SplashScreen from '../../screens/SplashScreen';
import { useAuth } from '../../../context/AuthContext';

const Stack = createNativeStackNavigator();

const AuthPassed = () => {
  const {colorScheme: appearance} = useAuth();
  return (
    <>
     
      <Stack.Navigator
      screenOptions={{headerShown: false}}
      
      >

        <Stack.Screen
          name={mainRouts.search}
          component={Search}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={mainRouts.searchDetails}
          component={SearchDetail}
          options={{ headerShown: false }}
        />


      </Stack.Navigator>


    </>
  );
};
export default AuthPassed;