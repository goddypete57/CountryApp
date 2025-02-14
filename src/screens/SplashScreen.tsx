import React, {useEffect} from 'react';
import {View, Image, StyleSheet, Animated, Easing,InteractionManager} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useFocusEffect} from '@react-navigation/native';
import mainRouts from '../navigation/routs/mainRouts';
import {useAuth} from '../../context/AuthContext';
import colors from '../../assets/colors/colors';


interface IProps {
  navigation: NativeStackNavigationProp<any>;
}

const SplashScreen: React.FC = () => {
  const {colorScheme: appearance} = useAuth();
  const fadeIn = new Animated.Value(0);
  const scale = new Animated.Value(0.3);
  const translateY = new Animated.Value(0);
  console.log(appearance);
  useFocusEffect(
    React.useCallback(() => {
      InteractionManager.runAfterInteractions(() => {
        fadeIn.setValue(0);
        scale.setValue(0.3);
        translateY.setValue(0);
  
        const delay = 300;
  
        const animation = Animated.sequence([
          Animated.delay(delay),
          Animated.timing(fadeIn, {
            toValue: 1,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.parallel([
            Animated.spring(scale, {
              toValue: 1,
              tension: 15,
              friction: 7,
              useNativeDriver: true,
            }),
            Animated.timing(translateY, {
              toValue: -20,
              duration: 1000,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
          Animated.spring(scale, {
            toValue: 1.1,
            tension: 50,
            friction: 5,
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 1,
            tension: 30,
            friction: 4,
            useNativeDriver: true,
          }),
        ]);
  
        animation.start(() => {
          Animated.timing(fadeIn, {
            toValue: 0,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
          }).start();
        });
  
        return () => {
          animation.stop();
        };
      });
    }, [])
  );

  return (
    <View
      style={{
       flex:1,
        justifyContent: 'center',
        alignItems: 'center',
         backgroundColor: "rgba(0, 15, 36, 1)",
      }}>
      <View style={styles.logoContainer}>
        <Animated.Image
          style={[
            styles.logo,
            {
              opacity: fadeIn,
              transform: [{scale}, {translateY}],
            },
          ]}
          source={
            require('../../assets/images/explorerLight.png')
          }
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '70%',
    height: '100%',
  },
});

export default SplashScreen;
