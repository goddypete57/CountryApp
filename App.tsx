import 'react-native-gesture-handler'
import React, { useEffect, useContext, useState } from "react";
import { View, Text, StatusBar, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';


// import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import MainStack from "./src/navigation/stacks/MainStack";

import colors from './assets/colors/colors';
import { AuthContext, AuthContextProvider } from './context/AuthContext';



const RootNavigator: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Broken!</Text>
    </View>
  }
  const [isLoading, setLoading] = useState(true);
   useEffect(() => { setTimeout(() => setLoading(false), 2000) });

  return (
    <NavigationContainer>
      {
         <MainStack /> }
    </NavigationContainer>
  )
}
export default function App() {
  {
    Platform.OS == 'ios' && <View style={{ height: 50, backgroundColor: colors.light.black }}></View>
  }
  return (
    <>
      <AuthContextProvider>

      <StatusBar backgroundColor={"#B847EF"} />
      <RootNavigator />
      </AuthContextProvider>
      <Toast />
    </>
  );
}