import React, {useState} from 'react';
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

const CONTINENTS = [
  'Africa',
  'Antarctica',
  'Asia',
  'Australia',
  'Europe',
  'North America',
  'South America',
];

const TIME_ZONES = ['GMT+1:00', 'GMT+2:00', 'GMT+3:00', 'GMT+4:00', 'GMT+5:00'];

interface FilterSectionProps {
  title: string;
  items: string[];
  selectedItems: string[];
  onItemPress: (item: string) => void;
  isExpanded: boolean;
  onToggle: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  items,
  selectedItems,
  onItemPress,
  isExpanded,
  onToggle,
}) => {
  const {colorScheme: appearance} = useAuth();

  return (
    <View style={{marginBottom: 24}}>
      <TouchableOpacity
        onPress={onToggle}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Axiforma-Bold',
            color: colors[appearance].text,
          }}>
          {title}
        </Text>
        <Image
          style={{
            width: 24,
            height: 24,
            transform: [{rotate: isExpanded ? '180deg' : '0deg'}],
          }}
          source={require('../../assets/images/down.png')}
          resizeMode="contain"
          tintColor={colors[appearance].text}
        />
      </TouchableOpacity>

      {isExpanded &&
        items.map(item => (
          <TouchableOpacity
            key={item}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 12,
            }}
            onPress={() => onItemPress(item)}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Axiforma-Regular',
                color: colors[appearance].text,
              }}>
              {item}
            </Text>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                borderWidth: 2,
                borderColor: colors[appearance].text,
                backgroundColor: selectedItems.includes(item)
                  ? colors[appearance].text
                  : 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {selectedItems.includes(item) && (
                <Image
                  source={require('../../assets/images/check.png')}
                  resizeMode="contain"
                  style={{width: 16, height: 16}}
                  tintColor={colors[appearance].checkBoxColor}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );
};

interface FilterBottomSheetProps {
  bottomSheetRef: React.RefObject<RBSheetRef>;
  selectedContinents: string[];
  setSelectedContinents: (continents: string[]) => void;
  selectedTimeZones: string[];
  setSelectedTimeZones: (timeZones: string[]) => void;
}

const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({
  bottomSheetRef,
  selectedContinents,
  setSelectedContinents,
  selectedTimeZones,
  setSelectedTimeZones,
}) => {
  const {colorScheme: appearance} = useAuth();
  const [expandedSections, setExpandedSections] = useState({
    continent: true,
    timeZone: true,
  });

  return (
    <Bottomsheet
      height={600}
      ref={bottomSheetRef}
      closeOnPressMask={true}
      closeOnPressBack={true}
      customStyles={{
        container: {
          backgroundColor: colors[appearance].background,
          borderTopStartRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
          paddingBottom: 12,
        },
        draggableIcon: {
          width: 0,
          height: 0,
        },
      }}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <Text
            style={{
              fontSize: 24,
              fontFamily: 'Axiforma-Bold',
              color: colors[appearance].text,
            }}>
            Filter
          </Text>
          <TouchableOpacity onPress={() => bottomSheetRef.current?.close()}>
            <Image
              style={{width: 30, height: 30}}
              source={
                appearance === 'dark'
                  ? require('../../assets/images/close2.png')
                  : require('../../assets/images/close1.png')
              }
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: 80}}
          showsVerticalScrollIndicator={false}>
          <FilterSection
            title="Continent"
            items={CONTINENTS}
            selectedItems={selectedContinents}
            isExpanded={expandedSections.continent}
            onToggle={() =>
              setExpandedSections(prev => ({
                ...prev,
                continent: !prev.continent,
              }))
            }
            onItemPress={item => {
              setSelectedContinents(prev =>
                prev.includes(item)
                  ? prev.filter(i => i !== item)
                  : [...prev, item],
              );
            }}
          />

          <FilterSection
            title="Time Zone"
            items={TIME_ZONES}
            selectedItems={selectedTimeZones}
            isExpanded={expandedSections.timeZone}
            onToggle={() =>
              setExpandedSections(prev => ({
                ...prev,
                timeZone: !prev.timeZone,
              }))
            }
            onItemPress={item => {
              setSelectedTimeZones(prev =>
                prev.includes(item)
                  ? prev.filter(i => i !== item)
                  : [...prev, item],
              );
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 40,
            }}>
            <TouchableOpacity
              style={{
                flex: 0.5,
                justifyContent: 'center',
                borderRadius: 8,
                borderWidth: 1,
                height: 48,
                borderColor: colors[appearance].text,
                alignItems: 'center',
              }}
              onPress={() => {
                setSelectedContinents([]);
                setSelectedTimeZones([]);
              }}>
              <Text
                style={{
                  color: colors[appearance].text,
                  fontSize: 16,
                  fontFamily: 'Axiforma-SemiBold',
                }}>
                Reset
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                borderRadius: 8,
                height: 48,
                backgroundColor: colors[appearance].buttonColor,
                alignItems: 'center',
              }}
              onPress={() => {
                bottomSheetRef.current?.close();
              }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontFamily: 'Axiforma-SemiBold',
                }}>
                Show results
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Bottomsheet>
  );
};

export default FilterBottomSheet; 