import React, { useRef } from 'react';
import { View, Image, TouchableOpacity, PanResponder } from 'react-native';
import { icons, COLORS, images } from '../../constants';
import { useNavigation } from '@react-navigation/native';
// import { icons, COLORS } from './constants';

const CustomDrawerIconButton = () => {
  const navigation = useNavigation();
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // You can add any additional logic you need when the gesture begins
      },
      onPanResponderMove: (evt, gestureState) => {
        // You can add any additional logic you need while the gesture is ongoing
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Determine if the gesture ended within the threshold to trigger opening the drawer
        const { dx } = gestureState;
        if (dx > 50) {
          navigation.openDrawer();
        }
      },
    })
  ).current;

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        {...panResponder.panHandlers} // Attach pan responder handlers to the TouchableOpacity
      >
        <View
          style={{
            justifyContent: 'center',
            // paddingHorizontal: SIZES.base,
          }}
        >
          <Image
            source={images.drawerBeat}
            resizeMode="contain"
            style={{
              width: 40,
              height: 40,
              tintColor: COLORS.white,
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomDrawerIconButton;