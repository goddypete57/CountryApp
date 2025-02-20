import 'react-native-gesture-handler';
import React, {useEffect, useContext, useState} from 'react';
import {View, Text, StatusBar, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

// import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import MainStack from './src/navigation/stacks/MainStack';

import colors from './assets/colors/colors';
import {AuthContext, AuthContextProvider} from './context/AuthContext';
import SplashScreen from './src/screens/SplashScreen';

const RootNavigator: React.FC = () => {

  const [isLoading, setLoading] = useState(true);
   useEffect(() => { setTimeout(() => setLoading(false), 3000) });

  return <NavigationContainer>{isLoading ? <SplashScreen /> : <MainStack />}</NavigationContainer>;
};
export default function App() {
  {
    Platform.OS == 'ios' && (
      <View style={{height: 50, backgroundColor: colors.light.white}}></View>
    );
  }
  return (
    <>
      <AuthContextProvider>
        <RootNavigator />
      </AuthContextProvider>
      <Toast />
    </>
  );
}
