import React from 'react';
import {
    View
} from 'react-native';

import {
    COLORS, SIZES,
} from "../constants";

const LineDivider = ({lineStyle}) => {
    return (
        <View
            style={{
                height: 2,
                width: "100%",
                backgroundColor: COLORS.lightGray3,
                ...lineStyle,
            }}
        >

        </View>
    )
}

export default LineDivider;