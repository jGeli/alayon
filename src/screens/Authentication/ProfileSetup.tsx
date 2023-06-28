//import liraries
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Switch } from 'react-native';
import { COLORS, FONTS, SIZES, icons, constants } from '../../constants';


// create a component
export default function ProfileSetup({ navigation, route }) {




    function renderHeader() {
        return (
            <View
                style={styles.header}>
                <View></View>
      
                <Text
                    style={{
                        ...FONTS.body2,
                        color: COLORS.black,
                        // fontWeight: 'bold',
                    }}>
                    Profile Setup
                </Text>
          <TouchableOpacity
                    style={{ margin: SIZES.padding, marginRight: SIZES.padding * 2 }}
                    onPress={() => navigation.navigate('CustomerHome')}>
                    <Image
                        source={icons.back}
                        style={{ height: 20, width: 20, tintColor: COLORS.primary }}
                    />
                </TouchableOpacity>
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
        padding: SIZES.padding,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        elevation: 5,
        width: '100%'
    },

});

