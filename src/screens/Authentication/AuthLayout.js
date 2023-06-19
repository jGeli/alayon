import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { images, FONTS, SIZES, COLORS, icons } from '../../constants';

const AuthLayout = ({ title, subtitle, titleContainerStyle, children }) => {
    return (
        <View
            style={{
                flex: 1,
                paddingVertical: SIZES.padding,
                backgroundColor: COLORS.white3,
            }}>
            {/*  <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
        }}> */}
            {/* App Icon */}

            {/* Title & Subtitle */}

            {/* Content / Children */}
            {children}

            {/* <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                }}
            >
                <Image 
                        source={images.chariot}
                        resizeMode='contain'
                        style={{
                            height: 250,
                            width: 360,
                            // transform: [{ rotate: '90deg'}]
                        }}
                    />

                <Text>
                    Copyright @ Bugtech Solutions 2023.
                </Text>
            </View> */}
            {/*   </KeyboardAwareScrollView> */}
        </View >
    );
};

export default AuthLayout;
