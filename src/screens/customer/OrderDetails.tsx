//import liraries
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, FlatList, Switch, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES, icons, constants } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { SET_CUSTOMER_ORDER } from '../../redux/actions/type';
import { useEffect } from 'react';
import { TextInput } from 'react-native';


// create a component
export default function OrderDetails({ navigation, route }) {
    const dispatch = useDispatch()
    const { order } = useSelector(({ customer }) => customer);
    const { selectedShop } = useSelector(({ data }) => data);
    const [selectedAddon, setSelectedAddon] = useState(null);
    const [adds, setAdds] = useState(order.addons);
    const [noteFocus, setNoteFocus] = useState(false);
    const [rnd, setRnd] = useState(0);

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
                            ...FONTS.h3,
                            color: COLORS.white,
                            letterSpacing: 1,
                            marginTop: SIZES.base
                            // fontWeight: 'bold',
                        }}>
                        MORE DETAILS
                    </Text>
                </View>
                <View
                    style={{ margin: SIZES.padding, height: 20, width: 20 }}
                ></View>
            </View>
        );
    }

    const handleCounter = (item, type) => {
        let newAddOns = [];
        let orderAddOns = adds;
    
        newAddOns = orderAddOns;
    
        if (type === 'less') {
          let ind = orderAddOns
            .map(a => {
              return a.addOnsId;
            })
            .indexOf(item._id);
    
          if (ind >= 0) {
            let addons = orderAddOns[ind];
    
            if (addons.qty > 1) {
              orderAddOns[ind].qty--;
              newAddOns = orderAddOns;
            } else {
              newAddOns = orderAddOns.filter(a => a.addOnsId !== item._id);
            }
          }
        }
    
    
    
        if (type === 'add') {
          let { description, name, price, _id } = item;
          let addons = orderAddOns.find(a => a.addOnsId === item._id);
          if (!addons) {
            orderAddOns.push({
              addOnsId: _id,
              name, description, price,
              qty: 1,
            });
            newAddOns = orderAddOns;
          } else {
            newAddOns = orderAddOns.map(a => {
              if (a.addOnsId === item._id) {
                a.qty++;
                return a;
              }
              return a;
            });
          }
        }
        setAdds(newAddOns);
        setRnd(Math.random());

        
        dispatch({type: SET_CUSTOMER_ORDER, payload: {addons: newAddOns}});
      };


    const handleTip = (val) => {
        dispatch({type: SET_CUSTOMER_ORDER, payload: {tip: val === order.tip ? 0 : val}});
         
    }



    let selectedCount = adds.find(a => a.addOnsId === selectedAddon);
        
        

    const renderAddons = () => {
        return (
            <View
                style={{
                    flexDirection: 'column',
                    width: '100%',
                    // height: 75,
                    backgroundColor: COLORS.lightGray3,
                    // marginBottom: SIZES.padding,
                    paddingTop: SIZES.padding,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    borderBottomColor: COLORS.gray,
                    borderBottomWidth: 1,
                    elevation: 2,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: SIZES.base,
                        width: '100%',
                    }}>
                    <View
                        style={{
                            flexGrow: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}>
                         {/* <Image
                            source={icons.puzzle}
                            style={{ height: 25, width: 25, tintColor: COLORS.primary }}
                        /> */}
                        <View>
                        <Text
                            style={{
                                ...FONTS.body4,
                                color: COLORS.black,
                                marginLeft: 5,
                            }}>
                            Order add-ons
                        </Text>
                        <Text
                            style={{
                                ...FONTS.body5,
                                color: COLORS.darkGray,
                                marginLeft: 5,
                                paddingRight: SIZES.padding * 2,
                                lineHeight: 15
                            }}>
                           Added items on top of normal service.
                        </Text>
                        </View>
                    </View>
                    <Switch
                        trackColor={{ false: '#767577', true: COLORS.primary }}
                        thumbColor={'#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={order.hasAddons}
                        disabled={selectedShop.addons && selectedShop.addons.length === 0}
                    />
                </View>
                {order.hasAddons && selectedShop.addons.map(a =>{
                    let qty = adds.find(ab => ab.addOnsId === a._id);
                    return (
                        <TouchableOpacity
                            key={a._id}
                        onPress={() => setSelectedAddon(a._id) }
                        style={{
                            // flexDirection: 'row',
                            // justifyContent: 'space-between',
                            // alignItems: 'center',
                            // // width: '100%',
                            // paddingVertical: SIZES.base,
                            // marginHorizontal: SIZES.padding,
                            // borderTopColor: COLORS.gray3,
                            // borderTopWidth: 1,
                            backgroundColor: selectedAddon === a._id ? 'rgba(135,206,250, 0.3)' : 'transparent',
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                // width: '100%',
                                paddingVertical: SIZES.base,
                                marginHorizontal: SIZES.padding,
                                borderTopColor: COLORS.gray3,
                                borderTopWidth: 1,
                            }}
                        >
                        <View
                            style={{
                                width: '75%',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                paddingRight: SIZES.padding * 2
                            }}
                        >
                        <Text
                            style={{
                                ...FONTS.body4,
                                color: COLORS.black,
                                fontWeight: 'bold',
                                marginLeft: SIZES.padding,
                            }}>
                          {a.name}
                        </Text>
                        <Text
                            style={{
                                ...FONTS.body5,
                                color: COLORS.transparentBlack7,
                                lineHeight: 15,
                                // fontWeight: 'bold',
                                marginLeft: SIZES.padding * 2,
                            }}>
                          {a.description}
                        </Text>
                        </View>
                        <View
                            style={{
                                width: '25%',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                        <View
                            style={{
                                // backgroundColor: COLORS.darkGray,
                                // flexGrow: 1,
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                        {/* <View
                            style={styles.counterPrice}
                        >
                        
                        </View> */}
                        <Text
                            style={{
                                ...FONTS.body4,
                                color: COLORS.black,
                                textAlign: 'center',
                            }}>
                          ₱{a.price}
                        </Text>
             
                        </View>
                        {selectedAddon === a._id ? 
                
                        <View style={{ ...styles.counterContainer }}>
                                <TouchableOpacity
                                  style={{ ...styles.counterButton }}
                                  onPress={() => handleCounter(a, 'less')}>
                                  <Image
                                    source={icons.minus1}
                                    resizeMode="contain"
                                    style={{ height: 15, width: 15, tintColor: COLORS.white }}
                                  />
                                </TouchableOpacity>
                                <Text style={{ ...FONTS.body4, textAlign: 'center' }}>
                                {selectedCount ? selectedCount.qty : 0}
                                </Text>
                                <TouchableOpacity
                                  style={{ ...styles.counterButton }}
                                  onPress={() => handleCounter(a, 'add')}>
                                  <Image
                                    source={icons.plus}
                                    resizeMode="contain"
                                    style={{ height: 15, width: 15, tintColor: COLORS.white }}
                                  />
                                </TouchableOpacity>
                              </View>
                                      :
                                      <Text style={{ ...FONTS.body4, textAlign: 'center' }}>
                                      x {qty ? qty.qty : 0}
                                      </Text>
                                      }
                        </View>
                        </View>
                    </TouchableOpacity>      
                    )
                })}
            </View>
        );
    }

    const renderTip = () => {
        return (
            <View
                style={{
                    flexDirection: 'column',
                    width: '100%',
                    // height: 75,
                    backgroundColor: COLORS.lightGray3,
                    // marginBottom: SIZES.padding,
                    paddingTop: SIZES.padding,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    borderBottomColor: COLORS.gray,
                    borderBottomWidth: 1,
                    elevation: 2,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: SIZES.base,
                        width: '100%',
                        marginBottom: 5,
                    }}>
                    <View
                        style={{
                            flexGrow: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}>
                         {/* <Image
                            source={icons.puzzle}
                            style={{ height: 25, width: 25, tintColor: COLORS.primary }}
                        /> */}
                        <View>
                        <Text
                            style={{
                                ...FONTS.body4,
                                color: COLORS.black,
                                marginLeft: 5,
                            }}>
                           Tip
                        </Text>
                        <Text
                            style={{
                                ...FONTS.body5,
                                color: COLORS.darkGray,
                                marginLeft: 5,
                                paddingRight: SIZES.padding * 2,
                                lineHeight: 15
                            }}>
                           Added amount on top of order total.
                        </Text>
                        </View>
                    </View>
                    <Switch
                        trackColor={{ false: '#767577', true: COLORS.primary }}
                        thumbColor={'#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchTip}
                        value={order.hasTip}
                        // disabled={selectedShop.addons && selectedShop.addons.length === 0}
                    />
                </View>
                {order.hasTip && 
                <View
                    style={{
                        borderTopColor: COLORS.darkGray,
                        borderTopWidth: 1,
                        width: '100%'
                    }}
                >
                    <FlatList
                    horizontal
                    style={{
                        marginVertical: SIZES.padding,
                        paddingHorizontal: SIZES.padding
                    }}
                    data={[10, 20, 30, 40, 50]}
                    renderItem={({item}) => {
                    return(
                    <TouchableOpacity
                        key={item}
                    onPress={() => handleTip(item) }
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: SIZES.padding,
                        paddingVertical: 5,
                        marginHorizontal: SIZES.padding,
                        backgroundColor: order.tip === item ? COLORS.primary : COLORS.white,
                        borderRadius: SIZES.radius,
                        borderWidth: 1,
                        borderColor: COLORS.darkGray
                    
                    }}
                    >
                    <Text
                     style={{
                        color: order.tip === item ? COLORS.white : COLORS.black
                        }}
                    >+</Text>
                  <Text
                    style={{
                    ...FONTS.body4,
                    fontWeight: 'bold',
                    color: order.tip === item ? COLORS.white : COLORS.black
                    }}
                  >₱{item}</Text>
                </TouchableOpacity>)
                    }}
                    keyExtractor={(item) => item}
                    />
                    </View>
                }
            </View>
        );
    }
    
    const renderNote = () => {
        return (
        <View
            style={{
                width: '100%',
                height: 100,
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: SIZES.padding * 2,
                backgroundColor: COLORS.lightGray2
            }}
        >
        <View
            style={{
                width: '100%',
                paddingHorizontal: SIZES.padding 
            }}
        >
        <Text
            style={{
            ...FONTS.body4,
            color: COLORS.black,
            marginVertical: SIZES.base
            }}
        >
        Note
        </Text>
        </View>
         <View
      style={{
      width: '95%',
        backgroundColor: COLORS.lightGray3,
        borderColor: noteFocus ? COLORS.primary : COLORS.transparentBlack7,
        borderWidth: 2,
        borderRadius: SIZES.semiRadius,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}>
      <Image
        source={icons.edit_order2}
        style={{height: 25, width: 25, margin: SIZES.base, tintColor: COLORS.darkGray1}}
      />
      <TextInput
        editable
        multiline
        numberOfLines={1}
        maxLength={120}
        placeholder='Enter note...'
        onChangeText={text => dispatch({type: SET_CUSTOMER_ORDER, payload: { note: text }})}
        value={order.note}
        onFocus={() => setNoteFocus(true)}
        onEndEditing={() => setNoteFocus(false)}
        style={{ width: '85%'}}
      />
    </View>
            </View>
        )
    }

    const toggleSwitch = () => {
            dispatch({type: SET_CUSTOMER_ORDER, payload: {hasAddons: !order.hasAddons  }})
    };
    
    const toggleSwitchTip = () => {
        dispatch({type: SET_CUSTOMER_ORDER, payload: {hasTip: !order.hasTip, tip: !order.hasTip ? 0 : order.tip   }})
    };
    
    const handleSave = () => {
        let hasAddns = false;
        
        adds.forEach(a => {
            if(a.qty > 0){
                hasAddns = true
            }
        })
    
        dispatch({type: SET_CUSTOMER_ORDER, payload: { hasTip: order.tip ? true : false, hasAddons: hasAddns }})
        navigation.goBack();
    }
    


    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            <ScrollView 
                style={styles.contentContainer}
            >
                {renderAddons()}
                {renderTip()}
                {renderNote()}
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
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        // flexGrow: 1,
        flex: 1,
        backgroundColor: COLORS.lightGray3,
        // paddingBottom: SIZES.padding * 3,
        // alignItems: 'center'
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
    contentContainer: {
        width: '100%',
        paddingVertical: SIZES.padding,
    },
    counterContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      counterButton: {
        borderRadius: 30,
        margin: SIZES.padding,
        height: 25,
        width: 25,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
      },
      counterPrice: {
        margin: SIZES.padding,
        // height: 20,
        width: 15,
        alignItems: 'center',
        justifyContent: 'center',
      },
});

