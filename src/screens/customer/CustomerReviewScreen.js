import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import { COLORS, FONTS, SIZES, icons } from '../../constants'
import { nearbyList } from '../../globals/data'
import { cutString } from '../../utils/helpers'
import { userData, userData2, myAccount, userData4 } from '../../globals/data'


export default function RateUs({navigation}) {
  const [text, onChangeText] = React.useState();

    function renderHeader() {
        return (
        <View style={{ ...FONTS.h4, color: COLORS.black, fontWeight: 'bold',}}> 
          <View
          style={{
              alignItems: "center",
              justifyContent: 'center',
              flexDirection: 'row',
              width: '100%'
          }}
      >
  <Text style={{ ...FONTS.h3, color: COLORS.black, fontWeight: 'bold',}}>Rate Us</Text>
 
      </View>
    <View style={{marginLeft: SIZES.padding * 1, alignItems:'center', marginVertical: SIZES.padding * 1}}>
    <Text
    style={{ ...FONTS.h5, color: COLORS.black, fontWeight: '600',}}
    >
    Thank you for giving us a change to serve you

    </Text>
    </View>
    <View style={{marginLeft: SIZES.padding * 1, alignItems:'center', marginVertical: SIZES.padding * 1}}>
    <Text
    style={{ ...FONTS.h5, color: COLORS.black, fontWeight: '600'}}
    >
    Kindly rate your laundry exprience so that we 
    </Text>
    <Text
    style={{ ...FONTS.h5, color: COLORS.black, fontWeight: '600'}}
    >
   can imporove our quality services
    </Text>
    </View>
    </View>

        )
    }
      function renderProfile() {
    
      }
  

  return (
    <SafeAreaView style={styles.container}>
        {/* HEADER */}
        {renderHeader()}
        
        {renderProfile()}
        <View style={{alignItems: 'center', justifyContent: 'flex-start', marginVertical: SIZES.padding *4}}>
        <Image
        source={userData4.imageUrl}
         resizeMode="contain"
        style={{
         height: 100,
         width: 100,
         borderRadius: 200,
         borderWidth: 10
       }}
        />
        <Text  style={{
          fontSize: SIZES.base * 4,
          fontWeight: 'bold',
          color: COLORS.black
        }} 
        >
         {userData4.name
         }
         </Text>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'flex-start', marginVertical: SIZES.padding *1}}>
      <Text  style={{
        fontSize: SIZES.base * 2,
        fontWeight: 'bold',
        color: COLORS.black
      }} 
      >
       Rate for Pick Up Driver
       </Text>      
      </View>
      <TextInput
      value={text}
      maxLength={200}
      onChangeText={onChangeText}
      placeholder="Write your comments...."
      placeholderTextColor={'gray'}
      style={{
        fontSize: 18,
        borderWidthColor: 'black',
        borderRadius:20,
        borderWidth: 1,
        width: '100%',
        height:'10%',
        color: COLORS.darkGray,
      }}
     
    />
    <View style={{justifyContent: 'center', alignItems: 'center',marginVertical: SIZES.padding*4}}>
    <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate("Home", {})}
            >
              <Text style={styles.buttonText}>Back To Home</Text>
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
        justifyContent: 'flex-start'
    },
    searchContainer: {
        marginVertical: SIZES.padding * 1
    },
    searchListContainer: {
        marginVertical: SIZES.padding * 1
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: "gray",
        borderWidth: 1,
    },
    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    cardConatiner: {
        width: '100%',
        flex: 1,
        padding: SIZES.padding * 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
      
      },
      rateBadge: {
        top: 10,
        right: 10,
        height: 20,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: '#317A49',
        borderRadius: 5
      },
      locationRange: {
        flexDirection: 'row',
        bottom: -10,
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
      },
      button: {
        backgroundColor: COLORS.primary,
        padding: SIZES.padding,
        height: 40,
        width: 200,
        borderRadius: SIZES.radius,
        justifyContent: 'center',
        alignItems: 'center'
      },
      buttonText: {
        ...FONTS.h4,
        color: COLORS.white,
        fontWeight: 'bold',
      },
  })