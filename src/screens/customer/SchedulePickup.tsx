import React, { useEffect, useState, useRef  } from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Animated, Easing, Image, TextInput, Button } from 'react-native'
import { icons, SIZES, COLORS, FONTS } from '../../constants'
import DatePicker from "react-native-date-picker";
import { useDispatch, useSelector } from "react-redux";
import { SET_CUSTOMER_ORDER } from "../../redux/actions/type";
import moment from "moment-timezone";
import { ScrollView } from "react-native";
import { generateChronologicalDates, generateNext7Days, generateTimeRange, isBetween8AMand10PM } from "../../utils/helpers";
import { FlatList } from "react-native";
import { shopAvailability } from "../../redux/actions/customer.actions";


export default function SchedulePickup({ navigation, route }) {
  const dispatch = useDispatch()
  const {shopId} = route.params;
  const { order } = useSelector(({ customer }) => customer);
  const [deliveryOption, setDeliveryOption] = useState(order.deliveryOption)
  const [pickupDate, setPickupDate] = useState(order.pickupDate)
  const [deliveryDate, setDeliveryDate] = useState(order.deliveryDate)
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [availability, setAvailability] = useState([]);
  
  // CHANGE STARTS HERE
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedItem, setSelectedItem] = useState(false)
  const [schedule, setSchedule] = useState([]);
  const daysInMonth = moment().daysInMonth();
  const firstDayOfMonth = moment().startOf('month');
  // const [startDate, setStartDate] = useState(moment());
  const currentDate = moment();
  const [startDate, setStartDate] = useState(moment().startOf('week'));
  // const animation = useRef(new Animated.Value(0)).current;
  const animation = useRef(new Animated.Value(0)).current;
  
  const handleNextWeek = () => {
    setStartDate(prevStartDate => prevStartDate.clone().add(3, 'days'));
  };
  
  const handlePreviousWeek = () => {
    setStartDate(prevStartDate => prevStartDate.clone().subtract(3, 'days'));
  };
  
  const generateSchedule = (startDate) => {
    // const data = [{"date": "Mon", "endTime": "21:30 PM", "id": "64d3169385b9d32362e4a22d", "isOpen": true, "startTime": "08:30 AM"}, {"date": "Tue", "endTime": "21:30 PM", "id": "64d3169385b9d32362e4a22e", "isOpen": true, "startTime": "08:30 AM"}, {"date": "Wed", "endTime": "21:30 PM", "id": "64d3169385b9d32362e4a22f", "isOpen": true, "startTime": "08:30 AM"}, {"date": "Thu", "endTime": "21:30 PM", "id": "64d3169385b9d32362e4a230", "isOpen": true, "startTime": "08:30 AM"}, {"date": "Fri", "endTime": "21:30 PM", "id": "64d3169385b9d32362e4a231", "isOpen": true, "startTime": "08:30 AM"}, {"date": "Sat", "endTime": "21:30 PM", "id": "64d3169385b9d32362e4a232", "isOpen": false, "startTime": "08:30 AM"}, {"date": "Sun", "endTime": "21:30 PM", "id": "64d3169385b9d32362e4a233", "isOpen": false, "startTime": "08:30 AM"}];
    const list = [];
    for (let i = 0; i < 5; i++) {
      const date = startDate.clone().add(i, 'days');
      const dayData = availability.find(item => item.date === date.format('ddd'));
      list.push({
        date: date,
        isOpen: dayData ? dayData.isOpen : false,
      });
    }
    setSchedule(list);
  };
  
  useEffect(() => {
    generateSchedule(startDate);
  }, [startDate]);

  const handleSelectDate = (data) => {
    setSelectedItem(data.isOpen)
    setSelectedDate(data.date);
    // Add your logic for handling the selected date
    if (data.isOpen === false) {

    // Start the animation
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: -1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
    ]).start();
    }
  };
  
  const rotateZ = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '15deg'], // Change the final value based on the desired maximum rotation angle
  }); 
  
  function pickupDatesRow() {
    return (
      <>
      <Text
        style={{ ...FONTS.body4, color: COLORS.black, fontWeight: 'bold' }}
      >
        Pick Up Date
      </Text>
      <View
        style={{ flexDirection: 'row', width: '100%', borderBottomWidth: .6, paddingBottom: 10}}
      >
      {/* <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '10%'
        }}
      >
      <TouchableOpacity onPress={() => setOpen(true)}>
            <Image
              source={icons.calendar}
              style={styles.ImageStyle}
            />
          </TouchableOpacity>
      </View> */}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 16,
          width: '85%'
          
        }}
      >
      {schedule.map(item => (
        <TouchableOpacity 
          key={item.date} 
          onPress={() => handleSelectDate(item)} 
          style={[
            styles.dateButton, 
            { backgroundColor: selectedDate.isSame(item.date, 'day') && !selectedItem ? COLORS.redTransparent : selectedDate.isSame(item.date, 'day') ? COLORS.primary : COLORS.gray3, elevation: 5, borderRadius: SIZES.semiRadius,  }, 
          ]}
          disabled={moment(item.date).isSameOrBefore(currentDate) ? true : false}
        >
        {/* <Text>
          {item.date.format('MMM')}
        </Text> */}
          <Text
            style={{
              color: selectedDate.isSame(item.date, 'day') && !selectedItem.isOpen ? COLORS.white : COLORS.black,
              fontSize: 14,
              // fontWeight: '400'
            }}
          >{selectedDate.isSame(item.date, 'day') && selectedItem ? item.date.format('dddd, MMM D') : selectedDate.isSame(item.date, 'day') && !selectedItem ? `${item.date.format('dddd')}` : item.date.format('D')}</Text>
          {
            (!item.isOpen && selectedDate.isSame(item.date, 'day'))
            &&
          <View
            style={{ flex: 1, position: 'absolute', top: 23, opacity: .8}}
          >
           <Animated.View
         style={{
          transform: [{ rotateZ }],
        }}
      >
          <Image
            source={icons.closeSign}
            style={{height: 35, width: 40}}
          />
      </Animated.View>
          
          </View>
          }
          
        </TouchableOpacity>

      ))}
    </View>
    <View
        style={{
          flexDirection: 'column',
          // margin: 10,
          alignItems: 'center',
          justifyContent: 'space-around',
          width: '15%',
          // paddingLeft: 10
        }}
      >
        <TouchableOpacity
          onPress={handlePreviousWeek}
          style={{
            paddingVertical: 2
          }}
        >
          <Image 
            source={icons.moveUp}
            style={{height: 25, width: 25}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNextWeek}
          style={{
            paddingVertical: 2
          }}
        >
          <Image 
            source={icons.moveDown}
            style={{height: 25, width: 25}}
          />
        </TouchableOpacity>
      </View>
    </View>
    </>
    
    
    )
    
  }
  
  function renderDateDelivery() {
    let timeslots = generateNext7Days(selectedDate)
  return (
  
    <View style={{ paddingTop: SIZES.padding }}>
      <Text 
        style={{ ...FONTS.body4, color: COLORS.black, fontWeight: 'bold' }}
        >
        Delivery Day
      </Text>
      <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={timeslots}
          renderItem={({item, index}) => {
              let diff = moment(item).diff(pickupDate, 'd');
              let title = timeslots.length - 1 === index ? 'Next Week' : `${diff}-${diff + 1} Days`;
                return (
                  <TouchableOpacity
                    style={{
                      marginHorizontal: SIZES.padding,
                      justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: SIZES.padding,
                    marginVertical: SIZES.padding,
                    borderRadius: SIZES.semiRadius,
                    height: 35,
                    backgroundColor:
                    moment(deliveryDate).isSame(moment(item), 'day') ? COLORS.primary : COLORS.gray2
                    }}
                      onPress={() => {
                      let newDate =  moment(item).tz('Asia/Manila');
                        setDeliveryDate(newDate)
                        }
                      }
                    
                  >
                    <Text
                    style={{
                      ...FONTS.body4,
                    // fontWeight: 'bold',
                    color:  moment(deliveryDate).isSame(moment(item), 'day') ? COLORS.white : COLORS.transparentBlack7

                    }}
                    >
                    {title}
                    </Text>
                  </TouchableOpacity>
                )
          }}  
          keyExtractor={(item) => `${item}`}
        />
    </View>
  )
  }
  
  // CODE CHANGE ENDS HERE
  const handleSave = () => {
      dispatch({type: SET_CUSTOMER_ORDER, payload: { deliveryOption, pickupDate, deliveryDate }});
      navigation.goBack()
  }

  const handleDeliveryType = (val) => {
    setDeliveryOption(val)
  }

  function renderHeader() {
    return (
      <View
        style={styles.header}>
        <TouchableOpacity
          style={{ margin: SIZES.padding }}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            style={{ height: 20, width: 20, tintColor: COLORS.white }}
          />
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexGrow: 1
          }}
        >
          <Text
            style={{
              ...FONTS.body2,
              color: COLORS.white,
              letterSpacing: 0,
              marginTop: SIZES.base,
              // fontWeight: 'bold',
            }}>
            Delivery Schedule
          </Text>
        </View>
        <View
          style={{ margin: SIZES.padding, height: 20, width: 20 }}
        ></View>
      </View>
    );
  }
  
  function renderDeliveryType() {

    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View
          style={styles.deliveryTypeWrapper}
        >
          <TouchableOpacity
            style={{
              backgroundColor: deliveryOption === 1 ? COLORS.primary : 'transparent',
              // width: '100%',
              marginRight: -SIZES.padding,
              height: 40,
              flexGrow: 1,
              borderRadius: SIZES.radius,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => handleDeliveryType(1)}
          >
            <Text
              style={{
                ...FONTS.body4,
                color: deliveryOption === 1 ? COLORS.white : COLORS.darkGray
              }}
            >Standard (+₱20)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: deliveryOption === 2 ? COLORS.primary : 'transparent',
              marginLeft: -SIZES.padding,
              height: 40,
              flexGrow: 1,
              borderRadius: SIZES.radius,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => handleDeliveryType(2)}
          >
            <Text
              style={{
                ...FONTS.body4,
                color: deliveryOption === 2 ? COLORS.white : COLORS.transparentBlack1
              }}
            >Express (+₱50)</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  
  function renderPickUpDate() {
    const next5Days = generateChronologicalDates(new Date(moment(pickupDate).tz('Asia/Manila').format('YYYY-MM-DD')));
      return(
        <View style={{ paddingTop: SIZES.padding }}>
        <Text 
        style={{ ...FONTS.body4, color: COLORS.black, fontWeight: 'bold' }}
        >
          Pick Up Date
        </Text>
        <View style={styles.SectionStyle}>
          {next5Days.map((a, index) => {
          const now = moment(a).tz('Asia/Manila').format('YYYY-MM-DD');
          const dayOfMonth = moment(a).tz('Asia/Manila').date();
          const isAvailableToday = moment().isSame(now, 'day')
        && isBetween8AMand10PM(new Date())
              return (
                <TouchableOpacity
                  style={{
                    // padding: SIZES.padding,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: SIZES.padding,
                    marginVertical: SIZES.padding,
                    borderRadius: SIZES.semiRadius,
                    height: 35,
                    backgroundColor: moment(now).isSame(moment(pickupDate).tz('Asia/Manila').format('YYYY-MM-DD'), 'day')  ? COLORS.primary :  isAvailableToday ? COLORS.gray : COLORS.gray3
                  }}
                  disabled={isAvailableToday}
                  onPress={() => {
                    
                    setPickupDate(now)
                  }}
                  key={index}
                >
                <Text
                  style={{
                    ...FONTS.body4,
                    // fontWeight: 'bold',
                    color: moment(now).isSame(moment(pickupDate).tz('Asia/Manila').format('YYYY-MM-DD'))  ? COLORS.white : COLORS.transparentBlack7
                  }}
                >{moment(now).isSame(moment(pickupDate).tz('Asia/Manila').format('YYYY-MM-DD')) ? moment(now).format('dddd, MMM D') : dayOfMonth}</Text>
                </TouchableOpacity>
               )
          })}
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Image
              source={icons.calendar}
              style={styles.ImageStyle}
            />
          </TouchableOpacity>
        </View>

      </View>
      )
  }

  function renderPickUpTimeslot() {
  
  let timeslots = generateTimeRange(pickupDate)
  return (
  <>{timeslots.length !== 0 ? 
    <View style={{ paddingTop: SIZES.padding }}>
      <Text 
        style={{ ...FONTS.body4, color: COLORS.black, fontWeight: 'bold' }}
        >
        Pick Up Timeslot
      </Text>
      <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={timeslots}
          renderItem={({item, index}) => {

                return (
                  <TouchableOpacity
                    style={{
                      marginHorizontal: SIZES.padding,
                      justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: SIZES.padding,
                    marginVertical: SIZES.padding,
                    borderRadius: SIZES.semiRadius,
                    height: 35,
                    backgroundColor: 
                    (moment(pickupDate).set('hour', item).isSame(moment(pickupDate), 'hour')
                    ||  moment(pickupDate).set('hour', item).isSame(moment(pickupDate).add('hour', 1), 'hour'))
                    ? COLORS.primary : COLORS.gray2
                    }}
                      onPress={() => {
                      let newDate =  moment(pickupDate).tz('Asia/Manila').set('hour', item);
                        setPickupDate(newDate)
                        }
                      }
                    
                  >
                    <Text
                    style={{
                      ...FONTS.body4,
                    // fontWeight: 'bold',
                    color: (moment(pickupDate).set('hour', item).isSame(moment(pickupDate), 'hour') 
                    ||  moment(pickupDate).set('hour', item).isSame(moment(pickupDate).add('hour', 1), 'hour'))
                    ? COLORS.white : COLORS.transparentBlack7

                    }}
                    >{moment(pickupDate).set('hour', item).format('hh:00 A')}</Text>
                  </TouchableOpacity>
                )
          }}  
          keyExtractor={(item) => `${item}`}
        />
    </View> : <></>}
    </>
  )}

  function renderDeliveryDay() {
    let timeslots = generateNext7Days(selectedDate)
  return (
    <View style={{ paddingTop: SIZES.padding }}>
      <Text 
        style={{ ...FONTS.body4, color: COLORS.black, fontWeight: 'bold' }}
        >
        Delivery Day
      </Text>
      <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={timeslots}
          renderItem={({item, index}) => {
              let diff = moment(item).diff(pickupDate, 'd');
              let title = timeslots.length - 1 === index ? 'Next Week' : `${diff}-${diff + 1} Days`;
                return (
                  <TouchableOpacity
                    style={{
                      marginHorizontal: SIZES.padding,
                      justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: SIZES.padding,
                    marginVertical: SIZES.padding,
                    borderRadius: SIZES.semiRadius,
                    height: 35,
                    backgroundColor:
                    moment(deliveryDate).isSame(moment(item), 'day') ? COLORS.primary : COLORS.gray2
                    }}
                      onPress={() => {
                      let newDate =  moment(item).tz('Asia/Manila');
                        setDeliveryDate(newDate)
                        }
                      }
                    
                  >
                    <Text
                    style={{
                      ...FONTS.body4,
                    // fontWeight: 'bold',
                    color:  moment(deliveryDate).isSame(moment(item), 'day') ? COLORS.white : COLORS.transparentBlack7

                    }}
                    >
                    {title}
                    </Text>
                  </TouchableOpacity>
                )
          }}  
          keyExtractor={(item) => `${item}`}
        />
   
    </View>
  )}
  
  function renderExpressDeliveryTimeslot() {
    let timeslotsToday = generateTimeRange(pickupDate, moment().isSame(pickupDate, 'day') ? 3 : 1).map(a =>{return moment(pickupDate).set('hour', a)});
    let timeslotsTomorrow = generateTimeRange(moment(pickupDate).add('d', 1)).map(a =>{return moment(moment(pickupDate).add('d', 1)).set('hour', a)});
    let timeslots = [...timeslotsToday, ...timeslotsTomorrow];
  return (
  
    <View style={{ paddingTop: SIZES.padding }}>
      <Text 
        style={{ ...FONTS.body4, color: COLORS.black, fontWeight: 'bold' }}
        >
        Delivery Timeslot
      </Text>
      <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={timeslots}
          renderItem={({item, index}) => {
              let isToday = moment().isSame(item, 'day'); 
              let title = isToday ? `Today ${moment(item).format('hh:00 A')}` :`${moment(item).format('dddd, MMM D hh:00 A')}  `;
                return (
                  <TouchableOpacity
                    style={{
                      marginHorizontal: SIZES.padding,
                      justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: SIZES.padding,
                    marginVertical: SIZES.padding,
                    borderRadius: SIZES.semiRadius,
                    height: 35,
                    backgroundColor: 
                    (moment(item).isSame(moment(deliveryDate), 'hour')
                    ||  moment(item).isSame(moment(deliveryDate).add('hour', 2), 'hour') )
                    ? COLORS.primary : COLORS.gray2
                    }}
                      onPress={() => {
                        setDeliveryDate(item.tz('Asia/Manila'))
                        }
                      }
                    
                  >
                    <Text
                    style={{
                      ...FONTS.body4,
                    // fontWeight: 'bold',
                    color:   (moment(item).isSame(moment(deliveryDate), 'hour')
                    ||  moment(item).isSame(moment(deliveryDate).add('hour', 2), 'hour') )
                    ? COLORS.white : COLORS.transparentBlack7

                    }}
                    >{title}</Text>
                  </TouchableOpacity>
                )
          }}  
          keyExtractor={(item) => `${item}`}
        />
    </View>
  )}
  
  const handleWorkingHours = async () => {
    setAvailability([])
    let dates = await dispatch(shopAvailability(shopId))
    if (dates) {
      setAvailability(dates)
    }
    setLoading(false)
  }
  
  useEffect(() => {
    setLoading(true)
    handleWorkingHours()
  }, [shopId])

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView
      style={{
        // height: '100%'
      }}
    >
      {renderHeader()}
      {renderDeliveryType()}
   
      {/* PICKUP DATE */}
      {/* {renderPickUpDate()} */}
      <View
        style={{
          flex: 1,
          minHeight: '70%',
          padding: SIZES.padding,
          // flexGrow: 1
        }}
      >
            <DatePicker
              mode="date"
              minimumDate={new Date(moment().tz('Asia/Manila').format('YYYY-MM-DD'))}
              modal
              open={open}
              date={new Date(pickupDate)}
              onConfirm={(date) => {
                setOpen(false)
                setPickupDate(moment(date).tz('Asia/Manila'))

                // dispatch({type: SET_CUSTOMER_ORDER, payload: { pickupDate: moment(date).tz('Asia/Manila') }});
                // setDate(date)
              }}
              onCancel={() => {
                setOpen(false)
              }}
            />


{/* {pickupDatesRow()} */}
  
        {renderPickUpDate()}
        {renderPickUpTimeslot()}
        {deliveryOption === 1 ? renderDeliveryDay() : renderExpressDeliveryTimeslot()}
        {/* {renderDateDelivery()} */}
        
        
       
      </View>
             
      </ScrollView>
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
        onPress={() => handleSave()}
      >
        <Text
          style={{
            ...FONTS.body3,
            color: COLORS.white
          }}
        >
            DONE
        </Text>
      </TouchableOpacity>
      
        </View>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  dateButton: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    // padding: 5,
    backgroundColor: COLORS.lightGray4

  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    elevation: 5,
    width: '100%'
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderBottomColor: "gray",
    // borderBottomWidth: 1,



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

  deliveryTypeWrapper: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: SIZES.radius,
    width: '75%',
    height: 40,
    marginVertical: SIZES.padding * 2,
    backgroundColor: COLORS.lightGray3,
    elevation: 5
  }
})