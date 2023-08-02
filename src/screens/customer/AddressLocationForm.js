//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Switch } from 'react-native';
import { COLORS, FONTS, SIZES, icons, constants, images } from '../../constants';
import { TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CUSTOMER_DATA, SET_USER } from '../../redux/actions/type';
import { updateUserById } from '../../redux/actions/user.actions';
import { deleteCustomerLocations, getCustomerLocations, setCustomerBasket, setCustomerLocations } from '../../utils/AsyncStorage';
import { createLocation, deleteLocation, updateLocation } from '../../redux/actions/customer.actions';

const labels = constants.addressLabels;

// create a component
const AddressLocationForm = ({ navigation, route }) => {
    const { address, navType } = route.params;
    const dispatch = useDispatch();
    const { customer: { locations } } = useSelector(({ customer }) => customer);
    const { user, isAuthenticated } = useSelector(({ auth }) => auth);

    const [values, setValues] = useState({
        isDefault: locations.length === 0 ? true : false, label: null, mobile: null, name: null
    })

    const handleChange = prop => e => {
        setValues({ ...values, [prop]: e })
    }


    const handleSetDefault = e => {

        setValues({ ...values, isDefault: e })
    }

    const handleDelete = async (id) => {
        if (isAuthenticated) {
            await dispatch(deleteLocation(id))
        } else {
            let oldLocations = await getCustomerLocations();

            let newLocations = [];

            newLocations = oldLocations.filter(a => {
                return a._id != id
            })

            await setCustomerLocations(newLocations);
            dispatch({ type: 'SET_CUSTOMER_DATA', payload: { locations: newLocations } })
        }

        navigation.navigate('AddressLocationScreen', { navType, rnd: Math.random() })

    }


    const handleSubmit = async () => {



        if (isAuthenticated) {
            if (values._id) {
                await dispatch(updateLocation(values))
            } else {
                await dispatch(createLocation(values))
            }
        } else {
            let newVal = values;
            let newLocations = []
            let oldLocations = await getCustomerLocations()
            if (newVal.isDefault) {
                oldLocations.forEach(a => {
                    newLocations.push({
                        ...a,
                        isDefault: false
                    })
                })
            } else {
                newLocations = oldLocations
            }


            if (values._id) {
                newLocations = newLocations.map(a => {
                    if (a._id == values._id) {
                        return values;
                    } else {
                        return a;
                    }
                })
            } else {
                newVal._id = Math.random();
                newLocations.push(newVal)
            }

            await setCustomerLocations(newLocations);
            dispatch({ type: 'SET_CUSTOMER_DATA', payload: { locations: newLocations } })


        }

        navigation.navigate('AddressLocationScreen', { navType, rnd: Math.random() })
    }


    useEffect(() => {
        if (address) {
            setValues({ ...values, ...address, isDefault: locations.length === 0 ? true : address.isDefault })
        }
        return () => {
            setValues({ isDefault: locations.length === 0 ? true : false, label: null, mobile: null, name: null })
        }
    }, [address])



    function renderHeader() {
        return (
            <View
                style={styles.header}>
                <TouchableOpacity
                    style={{ margin: SIZES.padding, marginRight: SIZES.padding * 2 }}
                    onPress={() => navigation.navigate('AddressLocationScreen', { locations: locations, navType })
                    }>
                    <Image
                        source={icons.back}
                        style={{ height: 20, width: 20, tintColor: COLORS.primary }}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        ...FONTS.body2,
                        color: COLORS.black,
                        flexGrow: 1
                        // fontWeight: 'bold',
                    }}>
                    {address?._id ? "Edit Address" : "New Address"}
                </Text>
                {/* <TouchableOpacity
                    onPress={() => handleDelete(address._id)}
                >
                    <Image
                        source={icons.dele}
                        style={{ height: 25, width: 25, tintColor: COLORS.danger, marginRight: SIZES.padding }}
                    />
                </TouchableOpacity> */}
                <View></View>
            </View>
        );
    }

    function renderContact() {
        return (
            <View style={styles.formGroup}>
                <View style={styles.label}>
                    <Text style={styles.labelText}>Contact</Text>
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput
                        placeholder='Full Name'
                        placeholderTextColor={COLORS.gray2}
                        style={styles.textInput}
                        value={values.name}
                        onChangeText={handleChange('name')}
                    />
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput
                        placeholder='Phone Number'
                        placeholderTextColor={COLORS.gray2}
                        style={styles.textInput}
                        value={values.mobile}
                        maxLength={10}
                        keyboardType='numeric'
                        onChangeText={handleChange('mobile')}
                    />
                </View>
            </View>
        )
    }

    function renderAddress() {
        return (
            <View style={styles.formGroup}>
                <View style={styles.label}>
                    <Text style={styles.labelText}>Address</Text>
                </View>
                {/* <TouchableOpacity style={{ ...styles.textInputContainer, flexDirection: 'row', justifyContent: 'space-between', padding: SIZES.padding, paddingLeft: SIZES.padding }} onPress={() => navigation.navigate('SelectRegion', { address })}>
                    <Text style={{ color: COLORS.gray2 }}>Region, Province, City, Barangay</Text>
                    <Image
                        source={icons.arrow_right}
                        style={{ height: 25, width: 25, tintColor: COLORS.darkGray }}
                    />
                </TouchableOpacity> */}
                {/* <View style={styles.textInputContainer}>
                    <TextInput
                        placeholder='Postal Code'
                        placeholderTextColor={COLORS.gray2}
                        style={styles.textInput}
                        value={values.postalCode}
                        onChangeText={handleChange('postalCode')}
                    />
                </View> */}
                <TouchableOpacity style={{ ...styles.textInputContainer, flexDirection: 'row', justifyContent: 'space-between', padding: SIZES.padding, paddingLeft: SIZES.padding }} onPress={() => navigation.navigate('AddressDetails', { address: values, navType })}>
                    <Text style={{color: values.address ? COLORS.black : COLORS.gray2}}>{values.address ? values.address : 'Street Name, Building, House No.'}</Text>
                   
                    <Image
                        source={icons.arrow_right}
                        style={{ height: 25, width: 25, tintColor: COLORS.darkGray }}
                    />
                </TouchableOpacity>
            </View>
        )
    }


    function renderSettings() {
        return (
            <View style={styles.formGroup}>
                <View style={styles.label}>
                    <Text style={styles.labelText}>Settings</Text>
                </View>
                <View style={styles.textInputContainer2}>
                    <Text style={{color: COLORS.gray}}>Label As:</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flexGrow: 1 }}>
                        {labels.map(a => {
                            return <TouchableOpacity
                                key={a._id}
                                onPress={() => setValues({ ...values, label: a._id })}
                                style={[styles.cardLabel, a._id === values.label ? styles.activeCardLabel : {}]}>
                                <Text style={[styles.cardLabelText]}>{a.name}</Text>
                            </TouchableOpacity>
                        })}
                    </View>
                    <View>

                    </View>
                </View>
                <View style={styles.textInputContainer2}>
                    <Text style={{color: COLORS.gray}}>Set as Default Address</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: COLORS.primary }}
                        thumbColor={values.isDefault ? COLORS.primary : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={handleSetDefault}
                        value={values.isDefault}
                    />
                </View>
            </View>
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            <View style={styles.mainContent}>
                {renderContact()}
                {renderAddress()}
                {renderSettings()}
            </View>

            {values._id &&
                <TouchableOpacity
                    disabled={!values.name || !values.mobile || !values.address}
                    style={[styles.deleteButton, !values.name || !values.mobile || !values.address ? { backgroundColor: COLORS.gray3 } : {}]}
                    onPress={() => handleDelete(values._id)}
                >
                    <Text style={{ ...FONTS.body2, color: COLORS.redTransparent, letterSpacing: 3 }}>DELETE</Text>
                </TouchableOpacity>
            }
            <TouchableOpacity
                disabled={!values.name || !values.mobile || !values.address}
                style={[styles.textButton, !values.name || !values.mobile || !values.address ? { backgroundColor: COLORS.gray3 } : {}]}
                onPress={() => handleSubmit()}
            >
                <Text style={{ ...FONTS.body2, color: COLORS.white, letterSpacing: 2 }}>{values._id ? 'UPDATE' : 'SUBMIT'}</Text>
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
    formGroup: {
        flexDirection: 'column',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
    },
    label: {
        padding: SIZES.padding,
    },
    labelText: {
        ...FONTS.body3, color: COLORS.darkGray
    },
    cardLabel: {
        // height: 10,
        backgroundColor: COLORS.lightGray3,
        borderRadius: 5,
        marginRight: SIZES.padding,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 8,
        paddingRight: 8,
        height: 30,

    },
    cardLabelText: {
        // height: 10,
        ...FONTS.body5,

    },
    activeCardLabel: {
        borderColor: COLORS.primary,
        borderWidth: 1
    },
    textInputContainer: {
        backgroundColor: COLORS.lightGray4,
        paddingLeft: 5,
        paddingRight: 5,
        width: '100%',
        borderBottomColor: COLORS.lightGray3,
        borderBottomWidth: 3
    },
    textInputContainer2: {
        height: 50,
        backgroundColor: COLORS.white,
        paddingLeft: SIZES.padding,
        width: '100%',
        borderBottomColor: COLORS.lightGray3,
        borderBottomWidth: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SIZES.padding,
        paddingLeft: SIZES.padding * 2,
    },
    textInput: {
        // height: 40,
        padding: SIZES.padding,
        width: '100%',
        color: COLORS.black
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
    mainContent: {
        flexGrow: 1,
        marginBottom: 40,
        width: '100%'
    },

    deleteButton: {
        minHeight: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.semiRadius,
        width: '80%',
        borderColor: COLORS.redTransparent,
        borderWidth: 1,
        margin: SIZES.padding
    },
    textButton: {
        minHeight: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.semiRadius,
        width: '80%',
        elevation: 3,
        margin: SIZES.padding
    }
});

//make this component available to the app
export default AddressLocationForm;
