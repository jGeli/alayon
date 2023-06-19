import React from 'react'
import { View, Text } from 'react-native'
import { SIZES, FONTS, COLORS } from '../constants'

const LabeledText = ({label, textValue, containerStyle, labelStyle, textStyle, prependComponent}) => {
    return (
        <View
            style={{
                padding: 3,
                ...containerStyle
            }}
        >
            <Text style={{
                ...FONTS.body3,
                fontWeight: '700',
                ...labelStyle
            }}>{label}</Text>
            {prependComponent}
            <Text style={{
                ...FONTS.body3,
                fontWeight: '600',
                ...textStyle
            }}>{textValue}</Text>
        </View>
    )
}

export default LabeledText
