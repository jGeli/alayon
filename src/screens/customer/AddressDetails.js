//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Switch, TextInput } from 'react-native';
import { COLORS, FONTS, SIZES, icons, constants } from '../../constants';


// create a component
const AddressDetails = ({ navigation, route }) => {
    const { address, navType } = route.params;
    const [values, setValues] = useState(address?.address)

    const handleNext = () => {
        let newAddress = address ? address : {};
        newAddress.address = values;
        navigation.navigate("Map", { ...route.params, address: newAddress })

    }



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
                    Edit Details
                </Text>

                <View></View>
            </View>
        );
    }



    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            <View style={styles.mainContent}>

                <View style={styles.label}>
                    <Text style={styles.labelText}>Address Details</Text>
                </View>

                <View style={styles.textInputContainer}>
                    <TextInput
                        editable
                        placeholder='House No., Building, Street Name.'
                        onChangeText={text => setValues(text)}
                        value={values}
                        multiline={true}
                        numberOfLines={2}
                        style={styles.textInput}
                    />
                </View>
            </View>
            <TouchableOpacity
                style={[styles.textButton, !values ? { backgroundColor: COLORS.gray3 } : {}]}
                disabled={!values}
                onPress={() => handleNext()}
            >

                <Text style={{ ...FONTS.body2, color: COLORS.lightGray4, letterSpacing: 1 }}>Next</Text>
            </TouchableOpacity>
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
    mainContent: {
        flexGrow: 1,
        marginBottom: 40,
        width: '100%'
    },
    textButton: {
        minHeight: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.semiRadius,
        width: '80%',
        elevation: 3
        // marginTop: 
    },
    label: {
        padding: SIZES.padding,
    },
    labelText: {
        ...FONTS.body3, color: COLORS.darkGray2
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
    textInput: {
        width: '100%'
    },
    textInputContainer: {
        backgroundColor: COLORS.white3,
        paddingLeft: 5,
        paddingRight: 5,
        minHeight: 70,
        width: '100%',
        borderBottomColor: COLORS.lightGray3,
        borderBottomWidth: 3
    },
});

//make this component available to the app
export default AddressDetails;
