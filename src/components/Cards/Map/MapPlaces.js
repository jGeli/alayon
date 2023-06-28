import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { COLORS } from '../../../constants';

const MapPlaces = ({ handlePlace }) => {
  return (
    <GooglePlacesAutocomplete
      GooglePlacesDetailsQuery={{ fields: "geometry" }}
      fetchDetails={true} // 
      placeholder='Search'
      //   textInput={{color: COLORS.primary}}
      //   listView={{color: COLORS.primary}}

      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        handlePlace(details?.geometry?.location)
        // console.log(data, details);
      }}
      debounce={200}
      textInputProps={{
        placeholderTextColor: COLORS.black,
        returnKeyType: "search"
      }}
      //   currentLocation={true}
      query={{
        key: 'AIzaSyD5ibcRV6uhLjLQgcSpt6GySfrzsXZkVkE',
        language: 'en',
      }}
      styles={{
        description: {
          color: COLORS.black
        },
        textInputContainer: {
          //   backgroundColor: 'grey',
          color: COLORS.primary
        },
        textInput: {
          height: 38,
          color: COLORS.black,
          fontSize: 16,
        }
      }}
    />
  );
};

export default MapPlaces;