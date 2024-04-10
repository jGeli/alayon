import React from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, icons } from '../../constants';

const CustomDrawerHeader = () => {
  const navigation = useNavigation();

  const handleSearch = () => {
    // Implement your search functionality here
  };

  const handleFilter = () => {
    // Implement your filter functionality here
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
      {/* Search input with search icon */}
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.lightGray, borderRadius: 5 }}>
        <Image source={icons.search} style={{ width: 20, height: 20, marginLeft: 10 }} />
        <TextInput
          style={{ flex: 1, paddingHorizontal: 10 }}
          placeholder="Search"
          onChangeText={handleSearch}
        />
      </View>

      {/* Filter icon */}
      <TouchableOpacity onPress={handleFilter} style={{ marginLeft: 10 }}>
        <Image source={icons.filter} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomDrawerHeader;