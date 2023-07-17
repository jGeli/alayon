import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList
} from 'react-native';


import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  images,
  styles,
} from '../../../constants';

import LabeledText from '../../LabeledText';
import LineDivider from '../../LineDivider';
import { termsAndCondition } from '../../../globals/data';

export default function TermsAndCondition({ onPress }) {
  const [myList, setMyList] = React.useState([])

  function renderHeader() {
    return (
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '100%',
            alignItems: 'flex-start',
            right: 10,
            bottom: 10,
          }}
        >
          <TouchableOpacity
            onPress={onPress}
          >
            <Image
              source={icons.cross}
              resizeMode='contain'
              style={{
                height: 20,
                width: 20,
              }}
            />
          </TouchableOpacity>
        </View>

        <Text
          style={embeddedStyles.header}
        >
          TERMS AND CONDITIONS
        </Text>
        <LineDivider
          lineStyle={{
            marginTop: SIZES.base / 2,
            height: 0.5,
            backgroundColor: COLORS.lightGray3
          }}
        />
      </View>
    )
  }

  function renderContent() {
    const renderItem = ({ item }) => {
      return (
        <View
          style={{
            // alignItems: 'flex-start',
            // justifyContent: 'flex-start',
            width: '100%',
            alignItems: 'flex-start',
            // borderWidth: 1
          }}
        >
          <LabeledText
            label={item.title.toString()}
            labelStyle={embeddedStyles.title}
            // textValue={'Welcome to Bugtech Solutions Laundry Service On-Demand Mobile App. These terms and conditions govern your use of the mobile app and the services provided by Bugtech Solutions. By accessing or using the app, you agree to comply with these terms and conditions. Please read them carefully before proceeding.'}
            textValue={item.description}
            textStyle={embeddedStyles.description}
          />
          {/* <Text
          style={{
            fontSize: SIZES.radius2,
          }}
        >
        Welcome to Bugtech Solutions' Laundry Service On-Demand Mobile App. These terms and conditions govern your use of the mobile app and the services provided by Bugtech Solutions. By accessing or using the app, you agree to comply with these terms and conditions. Please read them carefully before proceeding.
        </Text> */}
        </View>
      )
    }
    return (
      <View
        style={{
          // alignItems: 'flex-start',
          // justifyContent: 'flex-start',
          flexGrow: 1,
          width: '100%',
          alignItems: 'flex-start',
          height: SIZES.height,
          // paddingBottom: 100, 

          // borderWidth: 1
        }}
      >
        {/* <LabeledText 
          label={'Introduction'}
          labelStyle={styles.title}
          textValue={'Welcome to Bugtech Solutions Laundry Service On-Demand Mobile App. These terms and conditions govern your use of the mobile app and the services provided by Bugtech Solutions. By accessing or using the app, you agree to comply with these terms and conditions. Please read them carefully before proceeding.'}
          textStyle={styles.description}
        /> */}

        <FlatList
          data={termsAndCondition}
          renderItem={renderItem}
          vertical
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100,
            // height: SIZES.height
          }}
        />
      </View>
    )
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.white }}
    >
      {/* Header Title */}
      {renderHeader()}


      {/* Contents */}
      {renderContent()}

      {/* Footer Component */}
    </SafeAreaView>
  )

}

const embeddedStyles = StyleSheet.create({
  header: {
    fontSize: SIZES.h4,
    letterSpacing: 1.5,
    textAlign: 'center',
    lineHeight: SIZES.padding * 2,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  title: {
    color: COLORS.black,
    fontSize: SIZES.body3,
    marginTop: SIZES.base,
    fontWeight: 'bold'
  },
  description: {
    fontSize: SIZES.padding2,
    marginLeft: SIZES.base / 2,
    marginTop: SIZES.base / 2,
    lineHeight: SIZES.font
  }
})