import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../assets/colors/colors';
import {useAuth} from '../../context/AuthContext';
import InputField from '../Component/InputField';

interface IProps {
  navigation: NativeStackNavigationProp<any>;
}

const Search: React.FC<IProps> = ({navigation}) => {
  const {colorScheme, toggleTheme} = useAuth();
  const appearance = colorScheme;
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: colors[appearance].background},
      ]}>
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={require('../../assets/images/explorer.png')}
          resizeMode="contain"
          tintColor={colors[appearance].text}
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
        <View style={styles.box}> 
          <Image
            style={{width: 16, height: 16}}
            source={require('../../assets/images/search.png')}
            resizeMode="contain"
            tintColor={colors[appearance].text}
          />
        </View>
      </View>
    </View>
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
  },
  box:{
    borderRadius:4,
    borderWidth:0.2,
    borderColor:'#000000',
  }
});

export default Search;
