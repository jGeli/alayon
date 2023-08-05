import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ImageBackground, Image, Animated, useWindowDimensions } from 'react-native';

import { constants, images, FONTS, SIZES, COLORS } from '../../constants';
import { TextButton } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnBoarding = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current
  const flatListRef = useRef();
  const [isDone, setIsDone] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);


  const onViewChangeRef = useRef(({ viewableItems, changed }) => {
    setIsDone(false)
    setCurrentIndex(viewableItems[0].index);
  });


  const handleBack = () => {
      let ind = currentIndex - 1;
    setIsDone(false)
  setCurrentIndex(ind)
  flatListRef?.current?.scrollToIndex({
    index: ind,
    Animated: true,
  });
    
  }

  const handleGetStarted = async () => {
    await AsyncStorage.setItem('onBoarded', 'onboarded')
    navigation.replace('MainCustomer')
  }
  

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
          const dotColor = dotPosition.interpolate({

            inputRange: [index - 1, index, index + 1,  index + 2, index + 3],
            // inputRange: [
            //   windowWidth * (index - 1), 
            //   windowWidth * index, 
            //   windowWidth * (index + 1)],
            outputRange: [
              COLORS.white,
              COLORS.primary,
              COLORS.primary,
              COLORS.primary,
              COLORS.primary

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
        {(currentIndex < constants.onboarding_screens.length - 1 && !isDone)  && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: "center",
              paddingHorizontal: SIZES.padding,
              marginVertical: SIZES.padding,
              borderColor: COLORS.lightGray3
            }}>
            {currentIndex !== 0 ? (
            <TextButton
              label="Back"
              labelStyle={{
                color: COLORS.darkGray2,
                ...FONTS.body2,
                textAlign: 'center'
              }}
              buttonContainerStyle={{
                height: 50,
                width: 150,
                backgroundColor: null,
                // borderRadius: SIZES.radius,
                marginTop: SIZES.base
              }}
              onPress={handleBack}
            />) : (<TextButton
              label="Skip"
              labelStyle={{
                color: COLORS.darkGray2,
                ...FONTS.body2,
                textAlign: 'center'
              }}
              buttonContainerStyle={{
                height: 50,
                width: 150,
                backgroundColor: null,
                // borderRadius: SIZES.radius,
                marginTop: SIZES.base
              }}
              onPress={() =>  handleGetStarted()}
            />)}
  
            
            <TextButton
              label="Next"
              labelStyle={{
                color: COLORS.white,
                fontWeight: 'bold'
              }}
              buttonContainerStyle={{
                height: 50,
                width: 150,
                borderRadius: SIZES.radius,
                marginTop: SIZES.base
              }}
              onPress={() => {
              let ind = currentIndex + 1;
              if(ind === constants.onboarding_screens.length - 1){
                    setIsDone(true)
              }
                setCurrentIndex(ind)
                flatListRef?.current?.scrollToIndex({
                  index: currentIndex + 1,
                  Animated: true,
                });
                
              }}
            />
          </View>)}
         {(currentIndex == constants.onboarding_screens.length - 1 || isDone)  && (
          <View
            style={{
              paddingHorizontal: SIZES.padding * 2,
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
        // height: '100%',
        flex: 1,
        flexGrow: 1,
        width: SIZES.width,
        backgroundColor: COLORS.white,
      }}
    // style={styles.container}
    >
      {/* {renderHeaderLogo()} */}

      <Animated.FlatList
        ref={flatListRef}
        horizontal={true}
        // pagingEnabled
        onEndReached={() => {
        setCurrentIndex(constants.onboarding_screens.length - 1)
        setIsDone(true)
        }}
        onScrollEndDrag={(e) => {
        if(currentIndex <= constants.onboarding_screens.length - 1){
          setIsDone(false)
        }
        }}
        data={constants.onboarding_screens}
        scrollEventThrottle={1}
        snapToAlignment='center'
        showsHorizontalScrollIndicator={false}
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
                flex: 3,
                // flexGrow: 1,
                // width: SIZES.width,
                width: SIZES.width,
                bottom: 100,
                height: SIZES.height,

              }}>
              {/* Header */}
              <View
                style={{
                // flex: 1,
                // flexGrow: 1,
                bottom: 300,
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                width: '100%', 
                height: SIZES.height,
                paddingTop: index % 2 == 1 ? 174 : 0,
                // paddingBottom: index % 2 == 1 ? 0 : 174
                }}
              >
                <ImageBackground
                  resizeMode='contain'
                  source={item.backgroundImage}
                  style={{
                  flex: 1,
                  // flexGrow: 1,
                  // marginTop: -50,
                  // marginBottom: 100,
                  // bottom: 200,
                  // backgroundColor: COLORS.black,
                    height: '100%',
                    width: '100%'
                }}>
                            
        
                           
                </ImageBackground>
                </View>

              {/* Details */}
              <View
                style={{
                    height: SIZES.height,
                    flexGrow: 1,
                    width: SIZES.width,
                  //  alignItems: 'center',
                  // justifyContent: 'center',
                  paddingHorizontal: SIZES.radius,
                  top: index % 2 == 1 ? -SIZES.height * .75 : -SIZES.height * .55
                }}>
                <Text style={{
                  ...FONTS.h1, fontSize: 30,
                  textAlign: 'center', textShadowRadius: 2, fontWeight: 'bold', color: (item.id === 2 || item.id === 4) ? COLORS.white : COLORS.black
                }}>
                  {item.title}
                </Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  width: SIZES.width,
                  // justifyContent: 'flex-end',
                  bottom: 120,
                  paddingHorizontal: SIZES.radius,
                  // paddingLeft: SIZES.radius * 5,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start'
                }}
              >
                <Image
                  source={item.backgroundIcon}
                  resizeMode="contain"
                  style={{
                    height: 150,
                    width: 125,
                  }}
                />
              </View>
            
            </View>
          );
        }}
      />
      <View style={{paddingHorizontal: SIZES.padding}}>
      {renderFooter()}
      </View>
    </View>
  );
};

export default OnBoarding;
