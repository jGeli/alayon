import React, { useCallback, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, Button } from 'react-native'
import { COLORS, FONTS, SIZES, icons } from '../../constants'
import Slider from '../../components/Slider'
import { averageRatings, deliveryType, servicesProvided } from '../../globals/data';
import CheckBox from '@react-native-community/checkbox';
import RadioGroup from 'react-native-radio-buttons-group';


export default function Filter({ navigation }) {
  const [selectedId, setSelectedId] = useState()

  function renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Image source={icons.back} style={{ height: 20, width: 20 }} />
        </TouchableOpacity>
        <Text style={{ ...FONTS.h4, color: COLORS.black, fontWeight: 'bold' }}>Filter</Text>
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
        // onPress={() => navigation.goBack()}
        >
          <Text style={{ ...FONTS.h4, color: COLORS.black, fontWeight: 'bold' }}>Clear</Text>
        </TouchableOpacity>
        {/* <Image source={icons.back} style={{height: 25, width: 25}} /> */}
      </View>
    )

  }


  function renderSlider() {
    return (
      <View style={{ marginVertical: SIZES.padding * 1 }}>
        <Text style={{ ...FONTS.body3, color: COLORS.black, marginVertical: SIZES.padding }}>Distance From Me</Text>
        <Slider />
      </View>
    )
  }



  function renderDesiredService() {
    return (
      <View style={{ marginVertical: SIZES.padding * 1 }}>
        <Text style={{ ...FONTS.body3, color: COLORS.black, marginVertical: SIZES.padding, fontWeight: 'bold' }}>Desired Services</Text>
        {servicesProvided.map(item => {
          return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
              <CheckBox
                value={item.isExpress}
                //   onValueChange={() => setSelection(sample, index)}
                tintColors={{ true: COLORS.primary, false: COLORS.black }}
                style={styles.checkbox}
              />
              <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}>{item.name}</Text>
            </View>
          )
        })}
      </View>
    )
  }


  function renderAverageRating() {
    return (
      <View style={{ marginVertical: SIZES.padding * 1 }}>
        <Text style={{ ...FONTS.body3, color: COLORS.black, marginVertical: SIZES.padding, fontWeight: 'bold' }}>Average Ratings</Text>
        <RadioGroup
          containerStyle={{ width: '100%', alignItems: 'flex-start', color: COLORS.primary }}
          color={COLORS.primary}
          borderColor={COLORS.primary}
          radioButtons={averageRatings}
          onPress={setSelectedId}
          selectedId={selectedId}
          labelStyle={{ ...FONTS.body3, color: COLORS.black }}
        />
      </View>
    )
  }


  function renderDeliveryServiceType() {
    return (
      <View style={{ marginVertical: SIZES.padding * 1 }}>
        <Text style={{ ...FONTS.body3, color: COLORS.black, marginVertical: SIZES.padding, fontWeight: 'bold' }}>Delivery Service Type</Text>
        {deliveryType.map(item => {
          return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
              <CheckBox
                value={item.isExpress}
                //   onValueChange={() => setSelection(sample, index)}
                tintColors={{ true: COLORS.primary, false: COLORS.black }}
                style={styles.checkbox}
              />
              <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}>{item.name}</Text>
            </View>
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
        {/* DISTANCE SLIDER */}
        {renderSlider()}

        {/* DESIRED SERVICES */}
        {renderDesiredService()}

        {/* AVERAGE RATINGS */}
        {renderAverageRating()}

        {/* DELIVERY SERVICE TYPE */}
        {renderDeliveryServiceType()}
      </ScrollView>
      <Button title='Apply Filter'
        onPress={() => navigation.goBack()}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: '100%',
    flex: 1,
    padding: SIZES.padding * 1,
    backgroundColor: COLORS.lightGray4
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
})