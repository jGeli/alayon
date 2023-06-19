import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
// import { COLORS, FONTS, SIZES } from '../constants';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { COLORS, FONTS, SIZES } from '../constants';

const CustomSwitch = ({ value, onChange}) => {
    return (
        <TouchableOpacity
            // onPress={() => onChange(!value)}
            onPress={() => console.log("PRESSED")}
        >
            <View
                style={{
                    flexDirection: 'row'
                }}
            >
             {/* Switch    */}
             <View
                style={value ? embeddedStyles.switchOnContainer : embeddedStyles.switchOffContainer}
             >
                <View
                    style={{
                        // ...embeddedStyles.dot,
                        backgroundColor: value ? COLORS.white : COLORS.gray 
                    }}
                >
                </View>
                <Text
                        style={{
                            color: value ? COLORS.primary : COLORS.gray,
                            ...FONTS.body4,
                            fontWeight: '700',
                            color: COLORS.white,
                        }}
                    >
                        Online
                    </Text>
             </View>
             {/* Text */}

            </View>

        </TouchableOpacity>

    )
}

const embeddedStyles = StyleSheet.create({
    switchOnContainer: {
        width: 40,
        height: 20,
        // paddingRight: 2,
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderRadius: 10,
        backgroundColor: COLORS.green
    },
    switchOffContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 80,
        height: 20,
        // paddingLeft: 2,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 10,
        backgroundColor: COLORS.green

    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6
    }
})

export default CustomSwitch;