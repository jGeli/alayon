import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ImageBackground, Image, Animated, useWindowDimensions } from 'react-native';

import { constants, images, FONTS, SIZES, COLORS } from '../../constants';
import { TextButton } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnBoarding = ({ navigation }) => {
  // const scrollX = new Animated.Value(0)
  // const scrollX = new Animated.Value(0);
  const scrollX = useRef(new Animated.Value(0)).current
  const { width: windowWidth } = useWindowDimensions();
  const flatListRef = useRef();

  const [currentIndex, setCurrentIndex] = useState(0);


  const onViewChangeRef = useRef(({ viewableItems, changed }) => {
    setCurrentIndex(viewableItems[0].index);
  });


  const handleBack = () => {
    navigation.replace('MainCustomer')
  }

  const handleGetStarted = async () => {
    await AsyncStorage.setItem('onBoarded', 'onboarded')
    navigation.replace('MainCustomer')
  }
  // const {width, height} = Dimensions.get('window');
  // let titleSize = Number(~~width)
  // console.log(titleSize)
  // let title = titleSize / 100;
  // console.log(Math.trunc(title * title))
  // console.log(title / 100 * 3)




  const Dots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {constants.onboarding_screens.map((item, index) => {
          console.log(index, item)
          const dotColor = dotPosition.interpolate({

            inputRange: [index - 1, index, index + 1],
            // inputRange: [
            //   windowWidth * (index - 1), 
            //   windowWidth * index, 
            //   windowWidth * (index + 1)],
            outputRange: [
              COLORS.white,
              COLORS.primary,
              COLORS.primary,

            ],
            extraPolate: 'clamp',
          });


          return (
            <Animated.View
              key={index}
              style={{
                // borderRadius: 5,
                // marginHorizontal: 6,
                // width: width,
                // height: 10,
                // backgroundColor: dotColor,
                height: 8,
                width: 8,
                borderRadius: 4,
                borderColor: COLORS.primary,
                borderWidth: .6,
                backgroundColor: dotColor,
                marginHorizontal: 4,
              }}
            >
            </Animated.View>
          );
        })}
      </View>
    );
  };


  function renderFooter() {
    return (
      <View
        style={{
          height: 160,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <View
            style={{
              flex: 1,
              position: 'absolute',
              bottom: 50

            }}
          >
            <Image
              source={images.hot_delivery_gif}
              resizeMode='contain'
              style={{
                height: 270,
                width: 270
              }}
            />
          </View>
          <Dots />
        </View>
        {/* Button */}
        {currentIndex < constants.onboarding_screens.length - 1 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: "center",
              paddingHorizontal: SIZES.padding,
              marginVertical: SIZES.padding,
              borderColor: COLORS.lightGray3
            }}>
            <TextButton
              label="Skip"
              labelStyle={{
                color: COLORS.darkGray2
              }}
              buttonContainerStyle={{
                backgroundColor: null,
              }}
              onPress={handleBack}
            />
            <TextButton
              label="Next"
              labelStyle={{
                color: COLORS.white,
                fontWeight: 'bold'
              }}
              buttonContainerStyle={{
                height: 50,
                width: 200,
                borderRadius: SIZES.radius,
                marginTop: SIZES.base
              }}
              onPress={() => {
                setCurrentIndex(currentIndex + 1)
                flatListRef?.current?.scrollToIndex({
                  index: currentIndex + 1,
                  Animated: true,
                });
              }}
            />
          </View>
        )}

        {currentIndex == constants.onboarding_screens.length - 1 && (
          <View
            style={{
              paddingHorizontal: SIZES.padding,
              marginVertical: SIZES.padding,
            }}>
            <TextButton
              label="Let's Get Started"
              labelStyle={{
                color: COLORS.white,
                fontWeight: 'bold'
              }}
              buttonContainerStyle={{
                height: 60,
                borderRadius: SIZES.radius,
              }}
              onPress={handleGetStarted}
            />
          </View>
        )}
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        width: SIZES.width,
        height: SIZES.height,
        flexGrow: 1,
        // alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: COLORS.white,
      }}
    // style={styles.container}
    >
      {/* {renderHeaderLogo()} */}

      <Animated.FlatList
        ref={flatListRef}
        horizontal={true}
        // pagingEnabled
        data={constants.onboarding_screens}
        scrollEventThrottle={1}
        snapToAlignment='center'
        showsHorizontalScrollIndicator={false}
        // onScroll={Animated.event(
        //   [{nativeEvent: {contentOffset: {x: scrollX}}}],
        //   {useNativeDriver: false},
        // )}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                x: scrollX,
              },
            },
          },
        ],
          { useNativeDriver: false })}
        onViewableItemsChanged={onViewChangeRef.current}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: SIZES.width,
              }}>
              {/* Header */}
              <View
                style={{
                  flex: 3,
                  // alignItems: 'flex-end'
                }}>
                <ImageBackground
                  source={item.backgroundImage}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    height: '100%',
                    width: SIZES.width,
                    // height: '100%',
                    bottom: 50,
                    opacity: .9,
                  }}>
                </ImageBackground>
              </View>

              {/* Details */}
              <View
                style={{
                  flex: 1,
                  marginTop: 30,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  paddingHorizontal: SIZES.padding2 * 6,
                  bottom: 300
                }}>
                <Text style={{
                  ...FONTS.h1, fontSize: 35,
                  textAlign: 'center', textShadowRadius: 2, fontWeight: 'bold', color: (item.id === 2 || item.id === 4) ? COLORS.white : COLORS.black
                }}>
                  {item.title}
                </Text>

              </View>
              <View
                style={{
                  flex: 1,
                  position: 'absolute',
                  width: SIZES.width,
                  // justifyContent: 'flex-end',
                  height: '160%',
                  paddingLeft: SIZES.radius * 3,
                  alignItems: 'center'

                }}
              >
                {/* <Image
                  source={item.backgroundIcon}
                  resizeMode="contain"
                  style={{
                    height: 125,
                    width: 125,
                    flex: 1,
                    marginBottom: -SIZES.padding,
                    opacity: .7
                  }}
                /> */}
              </View>
            </View>
          );
        }}
      />
      {renderFooter()}
    </View>
  );
};

export default OnBoarding;
