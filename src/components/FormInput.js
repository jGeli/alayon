import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {FONTS, SIZES, COLORS} from '../constants';

const FormInput = ({
  onSubmitEditing,
  value,
  onSubmitEditing,
  containerStyle,
  label,
  placeholder,
  inputStyle,
  prependComponent,
  appendComponent,
  onChange,
  defaultValue,
  maxLength,
  secureTextEntry,
  keyboardType = 'default',
  autoCompleteType = 'off',
  autoCapitalize = 'none',
  errorMsg = '',
}) => {
  return (
    <View style={{...containerStyle}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{...FONTS.body4, color: COLORS.gray}}>{label}</Text>
        <Text style={{...FONTS.body4, color: COLORS.danger}}>{errorMsg}</Text>
      </View>
      {/* Text Input */}
      <View
        style={{
          flexDirection: 'row',
          height: 45,
          paddingHorizontal: SIZES.padding,
          marginTop: SIZES.base,
          borderRadius: SIZES.radius2,
          // borderBottomWidth: 2,
          borderWidth: 1,
          borderColor: COLORS.black,
          backgroundColor: COLORS.lightGray2,
        }}>
        {prependComponent}
        {/* <LinearGradient colors={['#c3c3c3']} style={styles.LinearGradientStyle} > */}
        <TextInput
          style={{
            flex: 1,
            ...inputStyle,
          }}
          onSubmitEditing={onSubmitEditing}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray}
          containerStyle={containerStyle}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          maxLength={maxLength}
          autoCompleteType={autoCompleteType}
          autoCapitalize={autoCapitalize}
          defaultValue={defaultValue}
          onChangeText={text => onChange(text)}
        />
        {/* </LinearGradient> */}
        {appendComponent}
      </View>
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  LinearGradientStyle: {
    height: 50,
    borderRadius: 10,
    height: 45,
    width: '80%',
  },
});
