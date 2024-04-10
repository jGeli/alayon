import React from 'react';
import {
    TouchableOpacity,
    Text,
    ActivityIndicator
} from 'react-native';
import { COLORS, FONTS } from '../constants';

const TextButtonLoader = ({ label, buttonContainerStyle, labelStyle, onPress, disabled, loaderComponent }) => {
    return (
        <TouchableOpacity
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.primary,
                ...buttonContainerStyle
            }}
            onPress={onPress}
            disabled={disabled}
        >
            
        { disabled ?
            loaderComponent
            :
            <Text
                style={{
                    color: COLORS.white,
                    ...FONTS.h3,
                    ...labelStyle
                }}
            >
                {label}
            </Text>
        }

        </TouchableOpacity>
    )
    
}

export default TextButtonLoader;