//import liraries
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { COLORS, SIZES } from '../constants';


// create a component
const DashLine = ({ color }) => {

  const Triangle = props => {
    return <View style={[styles.triangle, props.style, { borderBottomColor: color }]} />;
  };

  const TriangleDown = props => {
    return <Triangle style={[styles.triangleDown, props.style]} />;
  };

  const TriangleUp = props => {
    return <Triangle style={[styles.parallelogramRight, props.style]} />;
  };

  const Parallelogram = () => {
    return (
      <View style={styles.parallelogram}>
        <TriangleUp style={styles.parallelogramLeft} />
        <View style={[styles.parallelogramInner, { backgroundColor: color }]} />
        <TriangleDown style={styles.parallelogramRight} />
      </View>
    );
  };



  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        // overflow: 'hidden',
      }}>
      {Array.apply(null, { length: 12 }).map((a, index) => {
        return <View key={index}><Parallelogram /></View>;
      })}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.padding * 3,
    justifyContent: 'space-around',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
  triangleDown: {
    transform: [{ rotate: '180deg' }],
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 2.5,
    borderRightWidth: 2.5,
    borderBottomWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: COLORS.primary,
  },
  parallelogram: {
    width: 25,
    height: 5,
  },
  parallelogramInner: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: COLORS.primary,
    width: 25,
    height: 5,
  },
  parallelogramRight: {
    top: 0,
    right: -2.5,
    position: 'absolute',
  },
  parallelogramLeft: {
    top: 0,
    left: -2.5,
    position: 'absolute',
  },
});

//make this component available to the app
export default DashLine;
