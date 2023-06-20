import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, TextInput, Button } from 'react-native'
import { icons, SIZES, COLORS, FONTS } from '../../constants'
import DatePicker from "react-native-date-picker";


export default function SchedulePickup({ navigation }) {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  function renderHeader() {
    return (

      <View style={styles.headerContainer}>
        <TouchableOpacity style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingRight: SIZES.padding * 1
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
            >
              <Image source={icons.back} style={{ height: 20, width: 20 }} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: "flex-start",
              justifyContent: 'center',
              flexDirection: 'row',
              width: '80%'
            }}
          >
            <Text style={{ ...FONTS.h3, color: COLORS.black, fontWeight: 'bold', }}>Schedule Pickup</Text>
          </View>
        </TouchableOpacity>

      </View>
    )
  }
  function renderPickUpDate() {
    <View style={{ paddingTop: SIZES.padding * 2 }}>
      <Text style={{ ...FONTS.h3, color: COLORS.black, fontWeight: 'bold', }}>
        PickUp Date
      </Text>
      <View style={styles.SectionStyle}>

        <TextInput
          style={{
            fontSize: 15,
            flexGrow: 1,
            color: COLORS.black
          }}
          placeholderTextColor={"black"}
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Image
            source={icons.calendar}
            style={styles.ImageStyle}
          />
          {/* <Button title="Open" onPress={() => setOpen(true)} /> */}

          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={(date) => {
              setOpen(false)
              setDate(date)
            }}
            onCancel={() => {
              setOpen(false)
            }}
          />
        </TouchableOpacity>
      </View>

    </View>
  }

  function renderPickUpTimeslot() {
    <View style={{ paddingTop: SIZES.padding * 2 }}>
      <Text style={{ ...FONTS.h3, color: COLORS.black, fontWeight: 'bold', }}>
        PickUp Timeslot
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
        <Button title="11:00 AM - 3:00 PM" />
        <Button title="11:00 AM - 3:00 PM" />
      </View>
      <View tyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button title="11:00 AM - 3:00 PM" />
        <Button title="11:00 AM - 3:00 PM" />
      </View>
    </View>


  }

  function renderDeliveryDate() {
    <View style={{ paddingTop: SIZES.padding }}>
      <Text style={{ ...FONTS.h3, color: COLORS.black, fontWeight: 'bold', }}>
        Delivery Date
      </Text>
      <View style={styles.SectionStyle}>
        <TextInput
          style={{
            fontSize: 10,
            flexGrow: 1,
            color: COLORS.darkGray
          }}
          placeholderTextColor={"gray"}
          underlineColorAndroid="transparent"
        />
        <Image
          source={icons.calendar}
          style={styles.ImageStyle}
        />
        <Button title="Open" onPress={() => setOpen(true)} />
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false)
            setDate(date)
          }}
          onCancel={() => {
            setOpen(false)
          }}
        />

      </View>

    </View>

  }
  function renderDeliveryTimeslot() {
    <View style={{ paddingTop: SIZES.padding }}>
      <Text style={{ ...FONTS.h3, color: COLORS.black, fontWeight: 'bold', }}>
        PickUp Date
      </Text>
      <View style={styles.SectionStyle}>

        <TextInput
          style={{
            fontSize: 10,
            flexGrow: 1,
            color: COLORS.darkGray
          }}
          placeholderTextColor={"gray"}
          underlineColorAndroid="transparent"


        />

        <Image
          source={icons.calendar}
          style={styles.ImageStyle}
        />
        <Button title="Open" onPress={() => setOpen(true)} />
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false)
            setDate(date)
          }}
          onCancel={() => {
            setOpen(false)
          }}
        />
      </View>

    </View>
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}

      {/* PICKUP DATE */}
      {renderPickUpDate()}
      <View style={{ paddingTop: SIZES.padding }}>
        <Text style={{ ...FONTS.h3, color: COLORS.black, fontWeight: 'bold', }}>
          PickUp Date
        </Text>
        <View style={styles.SectionStyle}>
          <TextInput
            style={{
              fontSize: 10,
              flexGrow: 1,
              color: COLORS.darkGray
            }}
            placeholderTextColor={"gray"}
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Image
              source={icons.calendar}
              style={styles.ImageStyle}
            />
            <DatePicker
              modal
              open={open}
              date={date}
              onConfirm={(date) => {
                setOpen(false)
                setDate(date)
              }}
              onCancel={() => {
                setOpen(false)
              }}
            />
          </TouchableOpacity>
        </View>

      </View>

      {/* PICK UP TIMESLOT */}
      {renderPickUpTimeslot()}
      <View style={{ paddingTop: SIZES.padding * 5 }}>
        <Text style={{ ...FONTS.h3, color: COLORS.black, fontWeight: 'bold', }}>
          PickUp Timeslot
        </Text>
        <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center', justifyContent: 'space-around', }}>
          <Button title="11:00 AM - 3:00 PM" />
          <Button title="11:00 AM - 3:00 PM" />
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center', justifyContent: 'space-around' }}>
        <Button title="11:00 AM - 3:00 PM" />
        <Button title="11:00 AM - 3:00 PM" />
      </View>

      {/* DELIVERY DATE */}
      {renderDeliveryDate()}
      <View style={{ paddingTop: SIZES.padding }}>
        <Text style={{ ...FONTS.h3, color: COLORS.black, fontWeight: 'bold', }}>
          Delivery Date
        </Text>
        <View style={styles.SectionStyle}>
          <TextInput
            style={{
              fontSize: 10,
              flexGrow: 1,
              color: COLORS.darkGray
            }}
            placeholderTextColor={"gray"}
            underlineColorAndroid="transparent"
            onChange={(value) => {

            }}
          />
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Image
              source={icons.calendar}
              style={styles.ImageStyle}
            />
            <DatePicker
              modal
              open={open}
              date={date}
              onConfirm={(date) => {
                setOpen(false)
                setDate(date)
              }}
              onCancel={() => {
                setOpen(false)
              }}


            />
          </TouchableOpacity>

        </View>

      </View>

      {renderDeliveryTimeslot()}
      <View style={{ paddingTop: SIZES.padding * 5 }}>
        <Text style={{ ...FONTS.h3, color: COLORS.black, fontWeight: 'bold', }}>
          Delivery Timeslot
        </Text>
        <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center', justifyContent: 'space-around' }}>
          <Button title="11:00 AM - 3:00 PM" />
          <Button title="11:00 AM - 3:00 PM" />
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center', justifyContent: 'space-around' }}>
        <Button title="11:00 AM - 3:00 PM" />
        <Button title="11:00 AM - 3:00 PM" />
      </View>
      <View style={{ paddingTop: SIZES.padding * 10 }}>

        <Button title="Continue"
          onPress={() => navigation.navigate("LaundryService", {})}

        />
      </View>

    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: COLORS.lightGray4

  },
  headerContainer: {
    flexDirection: 'row',
    margin: SIZES.radius,
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: "gray",
    borderBottomWidth: 1,



  },
  workContainer: {
    paddingTop: SIZES.padding * 1,
    paddingBottom: SIZES.padding * 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  ImageStyle: {
    padding: 5,
    margin: 5,
    height: 25,
    width: 25,
    flexDirection: 'row'
  },
})