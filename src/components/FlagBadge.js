import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS, FONTS } from '../constants'

const FlagBadge = ({bgColor, textValue, textStyle}) => {
    return (
        <View style={styles.base}>
        <View style={{
            ...styles.baseBottom,
            backgroundColor: bgColor
            }}>
                <Text 
                    style={{
                        ...FONTS.body3,
                        fontWeight: '700',
                        color: COLORS.black,
                        ...textStyle
                    }}
                >
                  {textValue}
                </Text>            
            </View>
        <View style={{ 
            ...styles.baseTop,
            borderTopColor: bgColor,
            borderBottomColor: bgColor
            
            }} />
      </View>
    )
}

export default FlagBadge;

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: -10
    },
    baseTop: {
      borderRightWidth: 15,
      borderRightColor: "transparent",
      borderTopWidth: 15,
      borderTopColor: "red",
      borderBottomWidth: 15,
      borderBottomColor: "red",
      height: 0,
      width: 0,
      marginLeft: -1
    //   left: 0,
    //   top: -35,
    //   position: "absolute",
    },
    baseBottom: {
      height: 30,
      width: 150,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.lightGray1
    },
  });