import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import Bottomsheet from 'react-native-raw-bottom-sheet';
import {useAuth} from '../../context/AuthContext';
import colors from '../../assets/colors/colors';
import {RBSheetRef} from 'react-native-raw-bottom-sheet';
import {RadioButton} from 'react-native-paper';

const LANGUAGES = [
  'Bahasa',
  'Deutsch',
  'English',
  'Español',
  'Française',
  'Italiano',
  'Português',
  'Pусский',
  'Svenska',
  'Türkçe',
  '普通话',
  'بالعربية',
  'বাঙ্গালী',
];

interface LanguageBottomSheetProps {
  bottomSheetRef: React.RefObject<RBSheetRef>;
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
}

const LanguageBottomSheet: React.FC<LanguageBottomSheetProps> = ({
  bottomSheetRef,
  selectedLanguage,
  setSelectedLanguage,
}) => {
  const {colorScheme: appearance} = useAuth();

  return (
    <Bottomsheet
      height={500}
      ref={bottomSheetRef}
      closeOnPressMask={true}
      closeOnPressBack={true}
      customStyles={{
        draggableIcon: {
          width: 0,
          height: 0,
        },
        container: {
          backgroundColor: colors[appearance].background,
          borderTopStartRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
          paddingBottom: 12,
        },
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Axiforma-Bold',
            color: colors[appearance].text,
            paddingTop: 2,
          }}>
          Languages
        </Text>

        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current?.close();
          }}>
          <Image
            style={{width: 30, height: 30}}
            source={
              appearance == 'dark'
                ? require('../../assets/images/close2.png')
                : require('../../assets/images/close1.png')
            }
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 20}}>
        {LANGUAGES.map(language => (
          <TouchableOpacity
            key={language}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 12,
              borderBottomWidth: 0.5,
              borderBottomColor: colors[appearance].border,
            }}
            onPress={() => {
              setSelectedLanguage(language);
              bottomSheetRef.current?.close();
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Axiforma-Regular',
                color: colors[appearance].text,
              }}>
              {language}
            </Text>
            <RadioButton
              value={language}
              status={selectedLanguage === language ? 'checked' : 'unchecked'}
              onPress={() => {
                setSelectedLanguage(language);
                bottomSheetRef.current?.close();
              }}
              color={colors[appearance].text}
              uncheckedColor={colors[appearance].text}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Bottomsheet>
  );
};

export default LanguageBottomSheet; 