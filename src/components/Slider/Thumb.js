import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';

const Label = ({ text, ...restProps }) => {
  return (
    <View style={styles.root} {...restProps}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: SIZES.padding,
    height: 25,
    width: 25,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
});

export default memo(Label);