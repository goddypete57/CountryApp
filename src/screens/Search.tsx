import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  FlatList,
  Image,
  ScrollView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import colors from '../../assets/colors/colors';
import {useAuth} from '../../context/AuthContext';
import InputField from '../Component/InputField';
import {useCallback, useEffect, useRef, useState} from 'react';
import endpoints from '../../assets/endpoints/EndPoint';
import mainRouts from '../navigation/routs/mainRouts';
import Bottomsheet from 'react-native-raw-bottom-sheet';
import {RadioButton} from 'react-native-paper';
import {RBSheetRef} from 'react-native-raw-bottom-sheet';
import CheckBox from '@react-native-community/checkbox';
import FilterBottomSheet from '../Component/FilterBottomSheet';
import LanguageBottomSheet from '../Component/LanguageBottomSheet';

interface IProps {
  navigation: NativeStackNavigationProp<any>;
}

interface Country {
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
  capital?: string[];
}

const Search: React.FC<IProps> = ({navigation}) => {
  const {colorScheme, toggleTheme} = useAuth();
  const appearance = colorScheme;
  const [search, setSearch] = useState('');
  const [allCountry, setcountry] = useState<Country[]>([]);
  const [filteredInterests, setFilteredInterests] = useState<Country[]>([]);
  const bottomSheetRef = useRef<RBSheetRef>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedContinents, setSelectedContinents] = useState<string[]>([]);
  const [selectedTimeZones, setSelectedTimeZones] = useState<string[]>([]);
  const filterBottomSheetRef = useRef<RBSheetRef>(null);
  const languageBottomSheetRef = useRef<RBSheetRef>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchInterests = async (query: string) => {
    try {
      const response = await fetch(
        `${endpoints.baseUrl}${endpoints.interest}`,
        // {
        //   method: 'GET',
        //   headers: {
        //     Authorization: 'Bearer ' + endpoints.token,
        //     Accept: 'application/json',
        //   },
        // },
      );
      setRefreshing(true)
      const data = await response.json();

      const sortedCountries = data.sort((a: any, b: any) =>
        a.name.common.localeCompare(b.name.common),
      );

      setcountry(sortedCountries);
      setRefreshing(false)
    } catch (error) {
      setRefreshing(false)
      console.error('Error fetching interests:', error);
    }
  };

  const filterInterests = useCallback(
    (query: string, interests: Country[] = allCountry) => {
      const searchedWord = query.trim().toLowerCase();

      if (!searchedWord) {
        setFilteredInterests(allCountry);
        return;
      }

      const exactMatches = interests.filter(item =>
        item.name.common.toLowerCase().startsWith(searchedWord),
      );

      exactMatches.sort((a, b) => a.name.common.localeCompare(b.name.common));

      setFilteredInterests([...exactMatches]);
    },
    [allCountry],
  );

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchInterests(search);
      filterInterests(search);
    }, 200);

    return () => clearTimeout(delaySearch);
  }, [search]);

  const getAlphabeticallyGroupedData = (countries: any[]) => {
    const grouped: {title: string; data: any[]}[] = [];

    countries.forEach(country => {
      const firstLetter = country.name.common.charAt(0).toUpperCase();

      let section = grouped.find(sec => sec.title === firstLetter);

      if (section) {
        section.data.push(country);
      } else {
        grouped.push({title: firstLetter, data: [country]});
      }
    });

    return grouped.sort((a, b) => a.title.localeCompare(b.title));
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchInterests(search);
    } catch (error) {
      console.error('Error refreshing:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <>
      <StatusBar
        barStyle={appearance == 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors[appearance].background}
      />
      <View
        style={[
          styles.container,
          {backgroundColor: colors[appearance].background},
        ]}>
        <View style={styles.header}>
          <Image
            style={styles.image}
            source={
              appearance == 'dark'
                ? require('../../assets/images/explorerLight.png')
                : require('../../assets/images/explorer.png')
            }
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={() => {
              toggleTheme();
            }}
            style={[
              styles.themeIconBackground,
              {backgroundColor: colors[appearance].thembackground},
            ]}>
            <Image
              style={styles.themeIcon}
              source={
                appearance == 'light'
                  ? require('../../assets/images/sun.png')
                  : require('../../assets/images/moon.png')
              }
              resizeMode="contain"
              tintColor={colors[appearance].text}
            />
          </TouchableOpacity>
        </View>

        <InputField
          theme={appearance}
          label="Search Country"
          onChangeText={text => setSearch(text)}
          value={search}
          leftComponet={
            <Image
              style={{width: 16, height: 16}}
              source={require('../../assets/images/search.png')}
              resizeMode="contain"
              tintColor={colors[appearance].text}
            />
          }
          containerStyle={{marginTop: 20}}
        />

        <View style={styles.filterHeader}>
          <TouchableOpacity
            onPress={() => {
              languageBottomSheetRef.current?.open();
            }}
            style={styles.box}>
            <Image
              style={{width: 24, height: 24}}
              source={require('../../assets/images/internet.png')}
              resizeMode="contain"
              tintColor={colors[appearance].text}
            />
            <Text style={[styles.language, {color: colors[appearance].text}]}>
              {selectedLanguage.substring(0, 2)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => filterBottomSheetRef.current?.open()}
            style={styles.box}>
            <Image
              style={{width: 24, height: 24}}
              source={require('../../assets/images/filter.png')}
              resizeMode="contain"
              tintColor={colors[appearance].text}
            />
            <Text style={[styles.language, {color: colors[appearance].text}]}>
              Filter
            </Text>
          </TouchableOpacity>
        </View>

        <SectionList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors[appearance].text}
              colors={[colors[appearance].background]}
            />
          }
          sections={getAlphabeticallyGroupedData(
            filteredInterests.length > 0 ? filteredInterests : allCountry,
          )}
          keyExtractor={item => item.name.common}
          style={{marginTop: 16}}
          renderSectionHeader={({section: {title}}) => (
            <Text
              style={[
                styles.sectionHeader,
                {
                  color: colors[appearance].text,
                },
              ]}>
              {title}
            </Text>
          )}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(mainRouts.searchDetails, {items: item});
              }}
              style={styles.countryItem}>
              <Image
                style={styles.flag}
                source={{uri: item?.flags.png}}
                resizeMode="cover"
              />
              <View style={{paddingLeft: 10}}>
                <Text style={[styles.tittle, {color: colors[appearance].text}]}>
                  {item?.name?.common}
                </Text>
                <Text
                  style={[
                    styles.tittle,
                    {color: colors[appearance].gray, paddingTop: 2},
                  ]}>
                  {item?.capital}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <LanguageBottomSheet
        bottomSheetRef={languageBottomSheetRef}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />

      <FilterBottomSheet
        bottomSheetRef={filterBottomSheetRef}
        selectedContinents={selectedContinents}
        setSelectedContinents={setSelectedContinents}
        selectedTimeZones={selectedTimeZones}
        setSelectedTimeZones={setSelectedTimeZones}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    color: '#000000',
  },
  image: {
    width: 100,
    height: 26,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  themeIcon: {
    width: 24,
    height: 24,
  },
  themeIconBackground: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },

  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  box: {
    borderRadius: 4,
    borderWidth: 0.2,
    borderColor: colors.dark.border,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  language: {
    fontSize: 12,
    fontFamily: 'Axiforma-SemiBold',
    paddingLeft: 8,
  },
  tittle: {
    fontSize: 14,
    fontFamily: 'Axiforma-Medium',
  },

  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  flag: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});

export default Search;
