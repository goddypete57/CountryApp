import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-gesture-handler';

interface IProps {
  navigation: NativeStackNavigationProp<any>;
}
const SearchDetail: React.FC<IProps> = ({navigation}) => {
  return (
    <View style={style.container}>
      <Text>Search</Text>
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
export default SearchDetail;
