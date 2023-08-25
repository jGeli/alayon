//import liraries
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Switch } from 'react-native';
import { COLORS, FONTS, SIZES, icons, constants } from '../../constants';


// create a component
export default function DefaultScreen({ navigation, route }) {




    function renderHeader() {
        return (
            <View
                style={styles.header}>
                <TouchableOpacity
                    style={{ margin: SIZES.padding }}
                    onPress={() => navigation.goBack()}>
                    <Image
                        source={icons.back}
                        style={{ height: 20, width: 20, tintColor: COLORS.white }}
                    />
                </TouchableOpacity>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        flexGrow: 1
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.body2,
                            color: COLORS.white,
                            letterSpacing: 0,
                            marginTop: SIZES.base,
                            // fontWeight: 'bold',
                        }}>
                        Default Screen
                    </Text>
                </View>

                <View
                    style={{ margin: SIZES.padding, height: 20, width: 20 }}
                ></View>
            </View>
        );
    }



    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flex: 1,
        backgroundColor: COLORS.lightGray3,
        paddingBottom: SIZES.padding * 3,
        alignItems: 'center'
    },
    header: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        elevation: 5,
        width: '100%'
    },

});

