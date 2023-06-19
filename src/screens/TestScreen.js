//import liraries
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Switch } from 'react-native';
import { COLORS, FONTS, SIZES, icons, constants } from '../../constants';


// create a component
const TestScreen = ({ navigation }) => {




    function renderHeader() {
        return (
            <View
                style={styles.header}>
                <TouchableOpacity
                    style={{ margin: SIZES.padding, marginRight: SIZES.padding * 2 }}
                    onPress={() => navigation.goBack()}>
                    <Image
                        source={icons.back}
                        style={{ height: 20, width: 20, tintColor: COLORS.primary }}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        ...FONTS.body2,
                        color: COLORS.black,
                        // fontWeight: 'bold',
                    }}>
                    {address ? "Edit Address" : "New Address"}
                </Text>

                <View></View>
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        elevation: 5,
        width: '100%'
    },

});

//make this component available to the app
export default TestScreen;
