import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StyleSheet, Text, View} from 'react-native';
import MoonIcon from '../../assets/icons/acceptedIcon.svg' 

interface IProps {
  navigation: NativeStackNavigationProp<any>;
}
const Search: React.FC<IProps> = ({navigation}) => {
  return (
    <View style={style.container}>
     
      <MoonIcon fill={'#000'} width={24} height={24} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});
export default Search;
