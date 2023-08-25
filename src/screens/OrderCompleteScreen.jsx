import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import { TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";

const OrderCompleteScreen = ({ navigation, route }) => {
  const { order } = route.params;
  const [isDone, setIsDone] = useState(false);


  useEffect(() => {
    setTimeout(() => {
      setIsDone(true)
      navigation.push('TestScreen', {order})
    }, 5000)
  }, [])
  return (
    <SafeAreaView
      style={{ flex: 1 }}
    >
      <View
        style={{ flexGrow: 1 }}
      >
        <LottieView
          source={require("../assets/thumbs.json")}
          style={{
            height: 360,
            width: 300,
            alignSelf: "center",
            marginTop: 40,
            justifyContent: "center",
          }}
          autoPlay
          loop={false}
          speed={0.7}
        />

        <Text
          style={{
            marginTop: 40,
            fontSize: 19,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Your order has been placed
        </Text>

        <LottieView
          source={require("../assets/sparkle.json")}
          style={{
            height: 300,
            position: "absolute",
            top: 100,
            width: 300,
            alignSelf: "center",
          }}
          autoPlay
          loop={false}
          speed={0.7}
        /></View>

      {isDone &&
        <View style={{ justifyContent: 'center', alignItems: 'center', margin: SIZES.padding }}>
          <TouchableOpacity
            style={{
              width: '90%',
              borderRadius: SIZES.semiRadius,
              backgroundColor: COLORS.primary,
              justifyContent: 'center',
              alignItems: 'center',
              height: 40
            }}
            onPress={() => 
            navigation.navigate('TestScreen', {order, navType: 'track'})
            }
          >
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.white
              }}
            >
             Live Track
            </Text>
          </TouchableOpacity>

        </View>}
    </SafeAreaView>
  );
};

export default OrderCompleteScreen;

const styles = StyleSheet.create({});
