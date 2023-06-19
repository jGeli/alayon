import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native'
import { COLORS, FONTS, SIZES, icons } from '../../constants'
import { savedAddress } from '../../globals/data'

export default function AddressLocation({ navigation}) {
    const [address, setDefaultAddress] = useState(1);

    function renderHeader() {
        return (
            <View style={styles.headerContainer}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
            <Image source={icons.back} style={{height: 20, width: 20}} />
            </TouchableOpacity>
            <Text style={{...FONTS.h4, color: COLORS.black, fontWeight: 'bold'}}>Set Home Location</Text>
            <View></View>
            {/* <Image source={icons.back} style={{height: 25, width: 25}} /> */}
        </View>
        )
    }



    function renderSearch() {
        return (
            <View
            style={styles.searchContainer}>
              <TouchableOpacity 
              onPress={() => navigation.navigate("Map", {})}
              style={styles.SectionStyle}
              >
              <Image
                source={icons.pin} //Change your icon image here
                style={styles.ImageStyle}
            />
            <Text
                style={{...FONTS.h4, color: COLORS.primary}}
            >  
            Find address location..
            </Text>
            {/* <TextInput
              style={{
                fontSize: 18,
                flexGrow: 1,
                color: COLORS.black
                }}
                disableFullscreenUI={true}
                aria-disabled={true}
              placeholder="Search"
              placeholderTextColor={"gray"}
              underlineColorAndroid="transparent"
            /> */}
            </TouchableOpacity>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: SIZES.padding * 3}}>
                <TouchableOpacity style={styles.saveAddressButton}>
                    <Text style={{...FONTS.body3, color: COLORS.primary, fontWeight: 'bold'}}>Save Address</Text>
                </TouchableOpacity>
            </View>
            </View>
        )
    }

    function renderCurrentLocation() {

        return (
            <TouchableOpacity 
            onPress={() => navigation.navigate("Map", {})}
            style={styles.currentLocationContainer}>
                  <Image
                source={icons.currentLocation} //Change your icon image here
                style={styles.currentLocationImage}
            />
                <Text style={{...FONTS.h4, marginLeft: SIZES.padding, fontWeight: 'bold', color: COLORS.primary}}>Current Location</Text>
            </TouchableOpacity>
        )

    }


    function renderSavedAddress() {

        return (
            <View style={{marginTop: SIZES.padding * 2}}>
                <Text style={{...FONTS.h4, fontWeight: 'bold', color: COLORS.black, marginVertical: SIZES.padding}}>Saved Address</Text>
                {savedAddress.map((item, index) => {

                return (
                    <TouchableOpacity 
                        onPress={() => setDefaultAddress(item.id)}   
                        style={styles.addressItem}
                            >
                        <Text style={{width: 150, ...FONTS.body3}}>{item.address}</Text>
                        {address === item.id && 
                        <Image
                        source={icons.check} //Change your icon image here
                        style={{height: 20, width: 20, tintColor: COLORS.primary, margin: SIZES.padding}}
                        />                  
                        }
             </TouchableOpacity>
                )
                })}
            </View>
        )
    }



  return (
    <SafeAreaView style={styles.container}>
    {/* HEADER */}
    {renderHeader()}

    <ScrollView>
    {/* SEARCH INPUT FIELD and Save Address*/}
    {renderSearch()}


    {/* User Current Location */}
    {renderCurrentLocation()}

    {/* Save Address  */}
    {renderSavedAddress()}
    </ScrollView>

    <View style={{
        flex: 1, 
        // width: 200,
        alignItems: 'center', 
        justifyContent: 'flex-end'}}>
    <TouchableOpacity 
    style={styles.doneButton}
    onPress={() => navigation.goBack()}
    >
        <Text
        style={{...FONTS.h4, color: COLORS.white, fontWeight: 'bold'}}
        >DONE</Text>
    </TouchableOpacity>
    </View>

</SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
        height: '100%',
        flex: 1,
        // padding: 5,
        padding: SIZES.padding * 1,
        backgroundColor: COLORS.lightGray4
    }, 
    headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
    },
    addressItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: SIZES.padding * 2
    },
    currentLocationContainer: {
        flexDirection: 'row', 
        alignItems: 'center'
    },  
    searchContainer: {
        marginVertical: SIZES.padding * 2
    },
    searchListContainer: {
        marginVertical: SIZES.padding * 1
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: "gray",
        borderWidth: 1,
    },
    currentLocationImage: {
        height: 25,
        width: 25,
        padding: 10,
        tintColor: COLORS.primary
    },
    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
        tintColor: COLORS.primary
    },
    saveAddressButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 50,
        width: 200,
        elevation: 3,
        borderColor: COLORS.primary,
        borderWidth: 1,
        backgroundColor: COLORS.lightGray4,
      },
      doneButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 50,
        width: 250,
        elevation: 3,
        backgroundColor: COLORS.primary,
      },
  })