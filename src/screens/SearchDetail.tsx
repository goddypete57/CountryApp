import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {useAuth} from '../../context/AuthContext';
import colors from '../../assets/colors/colors';
import Swiper from 'react-native-swiper';
import {Route} from '@react-navigation/native';

interface IProps {
  navigation: NativeStackNavigationProp<any>;
  route: Route<any>;
}

const SearchDetail: React.FC<IProps> = ({navigation, route}) => {
  const {items} = route.params;
  const {colorScheme} = useAuth();
  const appearance = colorScheme;

  const images = [
    items?.flags?.png,
    items?.coatOfArms?.png,
    // items?.maps?.googleMaps,
  ].filter(Boolean);

  console.log('item', items);

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
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Image
              style={styles.backIcon}
              source={require('../../assets/images/back.png')}
              resizeMode="contain"
              tintColor={colors[appearance].text}
            />
          </TouchableOpacity>
          <Text style={[styles.title, {color: colors[appearance].text}]}>
            {items?.name?.common || 'Country Name'}
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.swiperContainer}>
            <Swiper
              key={images.length}
              autoplay={false}
              loop={false}
              showsPagination={true}
              showsButtons={true}
              paginationStyle={{
                bottom: 10,
              }}
              dotStyle={{
                backgroundColor: 'rgba(153, 153, 153, 1)',
                width: 8,
                height: 8,
                borderRadius: 4,
                marginHorizontal: 5,
              }}
              activeDotStyle={{
                backgroundColor: 'white',
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 5,
              }}
              nextButton={
                <View
                  style={{
                    width: 32,
                    height: 32,
                    backgroundColor: colors[appearance].transwhite,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 15,
                  }}>
                  <Image
                    source={require('../../assets/images/right_arrow.png')}
                    style={{width: 16, height: 16}}
                    tintColor={'white'}
                  />
                </View>
              }
              prevButton={
                <View
                  style={{
                    width: 32,
                    height: 32,
                    backgroundColor: colors[appearance].transwhite,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 15,
                  }}>
                  <Image
                    source={require('../../assets/images/back2.png')}
                    style={{width: 16, height: 16}}
                    tintColor={
                      images.indexOf(1) ? colors[appearance].text : 'white'
                    }
                  />
                </View>
              }>
              {images.length > 0 ? (
                images.map((img, index) => (
                  <Image
                    key={index}
                    source={{uri: img}}
                    style={[
                      styles.image,
                      {resizeMode: index == 0 ? 'cover' : 'contain'},
                    ]}
                  />
                ))
              ) : (
                <Text style={styles.noImageText}>No images available</Text>
              )}
            </Swiper>
          </View>

          <View style={{paddingHorizontal: 24, marginTop: 24}}>
            <View style={{marginBottom: 24}}>
              <Text style={[styles.topic, {color: colors[appearance].text}]}>
                Population:{'  '}
                <Text
                  style={[
                    styles.subTopic,
                    {color: colors[appearance].warmgray},
                  ]}>
                  {items?.population || 'N/A'}
                </Text>
              </Text>

              <Text style={[styles.topic, {color: colors[appearance].text}]}>
                Region:{'  '}
                <Text
                  style={[
                    styles.subTopic,
                    {color: colors[appearance].warmgray},
                  ]}>
                  {items?.region || 'N/A'}
                </Text>
              </Text>

              <Text style={[styles.topic, {color: colors[appearance].text}]}>
                Capital:{'  '}
                <Text
                  style={[
                    styles.subTopic,
                    {color: colors[appearance].warmgray},
                  ]}>
                  {items?.capital?.join(', ') || 'N/A'}
                </Text>
              </Text>

              <Text style={[styles.topic, {color: colors[appearance].text}]}>
                Motto:{'  '}
                <Text
                  style={[
                    styles.subTopic,
                    {color: colors[appearance].warmgray},
                  ]}>
                  {items?.motto || 'N/A'}
                </Text>
              </Text>
            </View>

            <View style={{marginBottom: 24}}>
              <Text style={[styles.topic, {color: colors[appearance].text}]}>
                Official Language:{'  '}
                <Text
                  style={[
                    styles.subTopic,
                    {color: colors[appearance].warmgray},
                  ]}>
                  {items?.languages
                    ? Object.values(items.languages).join(', ')
                    : 'N/A'}
                </Text>
              </Text>

              <Text style={[styles.topic, {color: colors[appearance].text}]}>
                Ethnic Group:{'  '}
                <Text
                  style={[
                    styles.subTopic,
                    {color: colors[appearance].warmgray},
                  ]}>
                  {items?.ethnicGroup || 'N/A'}
                </Text>
              </Text>

              <Text style={[styles.topic, {color: colors[appearance].text}]}>
                Religion:{'  '}
                <Text
                  style={[
                    styles.subTopic,
                    {color: colors[appearance].warmgray},
                  ]}>
                  {items?.religion || 'N/A'}
                </Text>
              </Text>

              <Text style={[styles.topic, {color: colors[appearance].text}]}>
                Government:{'  '}
                <Text
                  style={[
                    styles.subTopic,
                    {color: colors[appearance].warmgray},
                  ]}>
                  {items?.government || 'N/A'}
                </Text>
              </Text>
            </View>

            <View style={{marginBottom: 24}}>
              <Text style={[styles.topic, {color: colors[appearance].text}]}>
                Independence:{'  '}
                <Text
                  style={[
                    styles.subTopic,
                    {color: colors[appearance].warmgray},
                  ]}>
                  {items?.independent ? 'Yes' : 'No'}
                </Text>
              </Text>

              <Text style={[styles.topic, {color: colors[appearance].text}]}>
                Area:{'  '}
                <Text
                  style={[
                    styles.subTopic,
                    {color: colors[appearance].warmgray},
                  ]}>
                  {items?.area ? `${items.area} km²` : 'N/A'}
                </Text>
              </Text>

              <Text style={[styles.topic, {color: colors[appearance].text}]}>
                Currency:{'  '}
                <Text
                  style={[
                    styles.subTopic,
                    {color: colors[appearance].warmgray},
                  ]}>
                  {items?.currencies
                    ? Object.keys(items.currencies).join(', ')
                    : 'N/A'}
                </Text>
              </Text>

              <Text style={[styles.topic, {color: colors[appearance].text}]}>
                GDP:{'  '}
                <Text
                  style={[
                    styles.subTopic,
                    {color: colors[appearance].warmgray},
                  ]}>
                  {items?.gdp ? `US$${items.gdp} billion` : 'N/A'}
                </Text>
              </Text>
            </View>

            <View style={{marginBottom: 24}}>
              <Text style={[styles.topic, {color: colors[appearance].text}]}>
                Time Zone:{'  '}
                <Text
                  style={[
                    styles.subTopic,
                    {color: colors[appearance].warmgray},
                  ]}>
                  {items?.timezones?.join(', ') || 'N/A'}
                </Text>
              </Text>

              <Text style={[styles.topic, {color: colors[appearance].text}]}>
                Date Format:{'  '}
                <Text
                  style={[
                    styles.subTopic,
                    {color: colors[appearance].warmgray},
                  ]}>
                  {items?.dateFormat || 'dd/mm/yyyy'}
                </Text>
              </Text>

              <Text style={[styles.topic, {color: colors[appearance].text}]}>
                Dialing Code:{'  '}
                <Text
                  style={[
                    styles.subTopic,
                    {color: colors[appearance].warmgray},
                  ]}>
                  {items?.idd?.root
                    ? `${items.idd.root}${items.idd.suffixes?.join(', ')}`
                    : 'N/A'}
                </Text>
              </Text>

              <Text style={[styles.topic, {color: colors[appearance].text}]}>
                Driving Side:{'  '}
                <Text
                  style={[
                    styles.subTopic,
                    {color: colors[appearance].warmgray},
                  ]}>
                  {items?.car?.side || 'N/A'}
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 24,
    width: '100%',
  },
  backButton: {
    borderRadius: 40,
    padding: 6,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontFamily: 'Axiforma-Bold',
    fontSize: 20,
    flex: 0.9,
    textAlign: 'center',
  },
  topic: {
    fontFamily: 'Axiforma-Medium',
    fontSize: 16,
    marginTop: 5,
  },
  subTopic: {
    fontFamily: 'Axiforma-Light',
    fontSize: 16,
  },
  swiperContainer: {
    width: 380,
    height: 200,
    paddingHorizontal: 24,
    marginTop: 16,
    alignSelf: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 15,
  },
  noImageText: {
    textAlign: 'center',
    paddingTop: 80,
    fontSize: 16,
    color: 'gray',
  },
});

export default SearchDetail;
