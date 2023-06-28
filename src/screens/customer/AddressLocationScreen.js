//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { COLORS, FONTS, SIZES, icons, constants } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CUSTOMER_BASKET } from '../../redux/actions/type';

const { addressLocations, addressLabels } = constants;


// create a component
const AddressLocationScreen = ({ navigation, route }) => {
    const { navType } = route.params;
    const dispatch = useDispatch();
    const { customer: { locations }, basket } = useSelector(({ customer }) => customer);
    const [selected, setSelected] = useState(null)


    const handleBack = () => {
        navigation.goBack()
    }

    const handleSelect = (val) => {


        dispatch({ type: SET_CUSTOMER_BASKET, payload: { [navType]: selected === val._id ? null : val } })
        setSelected(selected === val._id ? null : val._id)
    }

    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: COLORS.white,
                    elevation: 5,
                    // height: 40,
                }}>
                <TouchableOpacity
                    style={{ margin: SIZES.padding, marginRight: SIZES.padding * 2 }}
                    onPress={() => handleBack()}>
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
                    Select Address
                </Text>

                <View></View>
            </View>
        );
    }

    function renderAddresses() {

        return (
            <View

            >
                {locations.length === 0 ?
                    <View style={{ minHeight: 50 }}>

                    </View> :
                    <View style={{ minHeight: 50 }}>
                        <Text style={{
                            padding: SIZES.padding,
                            ...FONTS.body3,
                            color: COLORS.transparentBlack7
                        }}
                        >Address</Text>
                    </View>

                }
                {
                    locations.map((a, index) => {
                        let label = addressLabels.find(ab => ab._id === a.label);
                        return (

                            <View
                                key={a._id}
                                style={[styles.addressCard, selected === a._id ? styles.activeCard : {}]}
                            >
                                <TouchableOpacity
                                    style={styles.cardContentLeft}
                                    onPress={() => handleSelect(a)}

                                >
                                    {index !== 0 && <View style={styles.cardTopBorder}></View>}

                                    <View
                                        style={{ flexDirection: 'row', marginTop: SIZES.padding }}
                                    >
                                        <Text
                                            style={{ ...FONTS.body3, color: COLORS.black }}
                                        >{a.name}</Text>
                                        <Text style={{ marginLeft: SIZES.padding, marginRight: SIZES.padding }}>|</Text>
                                        <Text
                                            style={{ ...FONTS.body3, color: COLORS.darkGray }}
                                        >(+63) {a.mobile}</Text>
                                    </View>
                                    <Text style={{ ...FONTS.body4 }}>{a.address}</Text>
                                    {/* <Text style={{ ...FONTS.body4 }}>Barangay, City Municipality, Province, Region, {a.postalCode}</Text> */}
                                    {label && <Text style={{ ...FONTS.body3, color: COLORS.transparentBlack7 }}>{label.name}</Text>}
                                    {a.isDefault && <Text style={{ ...FONTS.body4, color: COLORS.primary, marginTop: 5, borderRadius: 5, borderColor: COLORS.primary, borderWidth: 1, paddingLeft: 5, paddingRight: 5 }}>Default</Text>}
                                </TouchableOpacity>
                                <View
                                    style={styles.cardContentRight}

                                >
                                    {index !== 0 && <View style={styles.cardTopBorder}></View>}
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('AddressLocationForm', { address: a, navType })}
                                        style={{ flexGrow: 1 }}
                                    >
                                        <Text style={{ ...FONTS.body3, color: COLORS.primary, marginTop: SIZES.padding }}>Edit</Text>
                                    </TouchableOpacity>
                                    {/*          {selected === a._id ?
                                        <Image
                                            source={icons.check}
                                            style={{ height: 20, width: 20, tintColor: COLORS.primary }}
                                        />
                                        :
                                        <View style={{ height: 20 }}>

                                        </View>
                                    } */}

                                </View>
                            </View>
                        )
                    })
                }
            </View >

        )
    }

    useEffect(() => {
        if (navType === 'pickupDelivery' || navType === 'returnDelivery') {
            setSelected(basket[navType] ? basket[navType]._id : null)
        }

    }, [navType, basket])


    console.log('ADD',)

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderAddresses()}
            <TouchableOpacity
                style={styles.textButton}
                onPress={() => navigation.navigate('AddressLocationForm', { navType })}

            >
                <Image
                    source={icons.addbox}
                    style={{ height: 25, width: 25, tintColor: COLORS.primary, marginRight: SIZES.padding }}
                />
                <Text style={{ ...FONTS.body3, color: COLORS.primary }}>Add New Address</Text>
            </TouchableOpacity>
        </SafeAreaView >
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flex: 1
    },
    addressCard: {
        minHeight: 100,
        backgroundColor: COLORS.white,
        borderLeftColor: COLORS.white,
        borderLeftWidth: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'

    },
    activeCard: {
        borderLeftColor: COLORS.primary,
        borderLeftWidth: 5
    },
    cardContentLeft: {
        // flex: 1,
        width: '100%',
        height: '100%',
        // flexGrow: 1,
        paddingBottom: SIZES.padding,
        paddingLeft: SIZES.padding * 2,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexBasis: "80%",
    },
    cardContentRight: {
        height: '100%',
        paddingBottom: SIZES.padding,
        flexBasis: "20%",
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexGrow: 1
    },
    cardTopBorder: {
        width: '100%',
        height: 1,
        backgroundColor: COLORS.gray2,
    },
    textButton: {
        minHeight: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        borderTopColor: COLORS.lightGray3,
        borderTopWidth: 1
        // marginTop: 
    }
});

//make this component available to the app
export default AddressLocationScreen;
