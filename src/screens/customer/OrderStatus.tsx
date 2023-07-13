/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES, icons, images } from '../../constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LineDivider, TextButton, TextIconButton } from '../../components';
import { useDispatch } from 'react-redux';
import { getOrderById } from '../../redux/actions/customer.actions';
import { statusIndexing } from '../../utils/helpers';



const secondIndicatorStyles = {
  stepIndicatorSize: 40,
  currentStepIndicatorSize: 50,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: COLORS.primary,
  stepStrokeWidth: 3,
  separatorStrokeFinishedWidth: 4,
  stepStrokeFinishedColor: COLORS.primary,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: COLORS.primary,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: COLORS.primary,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 25,
  currentStepIndicatorLabelFontSize: 25,
  stepIndicatorLabelCurrentColor: COLORS.primary,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 15,
  currentStepLabelColor: COLORS.primary,
};



const getStepIndicatorIconConfig = ({
  position,
  stepStatus,
}: {

  position: number;
  stepStatus: string;
}) => {
  const iconConfig = {
    resizeMode: 'contain',
    source: icons.order_confirmed,
    style: {height: stepStatus === 'current' ? 35 : 20, width:  stepStatus === 'current' ? 35 : 20, tintColor: stepStatus === 'finished' ? COLORS.white : stepStatus === 'current' ? COLORS.primary : COLORS.black }
  };
  switch (position) {
    case 0: {
      iconConfig.source = icons.laundryBasket;
      break;
    }
    case 1: {
      iconConfig.source = icons.pickup;
      break;
    }
    case 2: {
      iconConfig.source = icons.rateus;
      break;
    }
    case 3: {
      iconConfig.source = icons.delivery4;
      break;
    }
    case 4: {
      iconConfig.source = icons.order_confirmed;
      break;
    }
    case 5: {
        iconConfig.source = icons.rateus1;
        break;
      }
    default: {
      break;
    }
  }
  return iconConfig;
};

export default function OrderStatus({navigation, route}) {
  const { order, navType } = route.params;
  const dispatch = useDispatch();
  const [orderData, setOrderData] = React.useState<Object>({})

  const handleGetOrder = async () => {
    let myOrder = await dispatch(getOrderById(order._id));
    if(myOrder){
      setOrderData({...myOrder, statusIndex: statusIndexing(myOrder.activeStatus)})
    }
  }

  console.log("order", orderData.shop)
  const onStepPress = (position: number) => {
  
    setOrderData({ ...orderData, statusIndex: position > 6 ? 6 : position < 0 ? 0 : position});
  };
  
  
  function renderHeader() {
    return (
        <View
            style={styles.header}>
            <TouchableOpacity
                style={{  padding: SIZES.padding}}
                onPress={() => navigation.navigate(navType == 'track' ? 'CustomerOrders': 'CustomerHome', {})}>
                <Image
                    source={navType === 'track' ? icons.back : icons.home}
                    style={{ height: 20, width: 20, tintColor: COLORS.primary }}
                />
            </TouchableOpacity>
            <Text
                style={{
                    ...FONTS.body2,
                    color: COLORS.black,
                    fontWeight: 'bold',
                }}>
              DELIVERY STATUS
            </Text>

            <View
              style={{ height: 20, width: 20, margin: SIZES.padding, tintColor: COLORS.primary }}
              ></View>
        </View>
    );
}


  function renderInfo() {
    return (
      <View
        style={{
          height: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          marginVertical: SIZES.padding * 2
        }}>
        <Text
          style={{
            ...FONTS.body4,
            color: COLORS.gray,
            textAlign: 'center'
            // fontWeight: 'bold',
          }}>
       Estimated Delivery
        </Text>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.black,
            textAlign: 'center'
            // fontWeight: 'bold',
          }}>
          21 Sept 2021 / 12:30PM
        </Text>
      </View>
    );
  }    


  const renderStepIndicator = (params: any) => {
  return(
    <Image {...getStepIndicatorIconConfig(params)} />
  );
  }
  
  
  const renderLabel
  = ({
    position,
    label,
    currentPosition,
  }: {
    position: number;
    stepStatus: string;
    label: object;
    currentPosition: number;
  }) => {
    return (
    <View
        style={{ 
        width: 250,
        marginLeft: SIZES.padding,
        minHeight: 50,
        justifyContent: 'center'
        }}
    >
      <Text
        style={
          position === currentPosition
            ? styles.stepLabelSelected
            : styles.stepLabel
        }
      >
        {label.name}
      </Text>
            <Text
        style={
          position === currentPosition
            ? styles.stepDescriptionSelected
            : styles.stepDescription
        }
      >
        {label.description}
      </Text>
      </View>
    );
  };
  
  
  const renderTrackOrder = () => {
  
  
    return (
        <View
            style={{
                marginTop: SIZES.padding,
                padding: SIZES.padding,
                borderRadius: SIZES.radius,
                borderWidth: 2,
                borderColor: COLORS.lightGray2,
                backgroundColor: COLORS.white2
            }}
        >
        <View
            style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
            marginTop: 10,
            marginBottom: 20, paddingHorizontal: SIZES.padding}}
        >
            <Text style={{...FONTS.h3, color: COLORS.transparentBlack7}}>Track Order</Text>
            <Text style={{ ...FONTS.body3, color: COLORS.gray}}>{orderData.transaction_id}</Text>
        </View>
        <LineDivider
            lineStyle={{
                backgroundColor: COLORS.lightGray2
            }}
        />
            
        <View
            style={{
                height: 400,
                marginTop: SIZES.padding,
                paddingHorizontal: SIZES.padding
            }}
        >
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={secondIndicatorStyles}
          currentPosition={orderData.statusIndex}
          onPress={onStepPress}
          direction="vertical"
          renderLabel={renderLabel}
          stepCount={6}
          renderStepIndicator={renderStepIndicator}
          labels={orderData.order_status}
        />
      </View>
      </View>
        
        </View>
    )
  }


  function renderFooter() {
    return (
        <View
            style={{paddingVertical: SIZES.padding, width: '100%', paddingHorizontal: SIZES.padding * 2}}
        >
        <View
            style={{flexDirection: 'row', height: 55}}
        >
        {
        orderData.statusIndex < 2 ?
        <TextButton
        buttonContainerStyle={{
            width: '40%',
            borderRadius: SIZES.base,
            backgroundColor: COLORS.lightGray2
        }} 
        label="Cancel"
        labelStyle={{
        color: COLORS.primary
        }}
        onPress={() => onStepPress(orderData.statusIndex - 1)}
    />  : 
    
    <TextButton
    buttonContainerStyle={{
        width: '40%',
        borderRadius: SIZES.base,
        backgroundColor: COLORS.lightGray2
    }} 
    label="Back"
    labelStyle={{
    color: COLORS.primary
    }}
    onPress={() => onStepPress(orderData.statusIndex - 1)}
    />
        }
       {orderData.statusIndex < 4 
       ?
        <TextIconButton
            containerStyle={{
                flex: 1,
                marginLeft: SIZES.radius,
                borderRadius: SIZES.base,
                backgroundColor: COLORS.primary
            }}
            label="Live Track"
            labelStyle={{
                ...FONTS.h3,
                color: COLORS.white,
            }}
            icon={icons.myLiveTracking}
            iconPosition="LEFT"
            iconStyle={{
                width: 25,
                height: 25,
                marginRight: SIZES.padding,
                tintColor: COLORS.white
            }}
            onPress={() => onStepPress(orderData.statusIndex + 1)}

        />
        :
        orderData.statusIndex === 4 ?
        <TextIconButton
        containerStyle={{
            flex: 1,
            marginLeft: SIZES.radius,
            borderRadius: SIZES.base,
            backgroundColor: COLORS.primary
        }}
        label="Receive Order"
        labelStyle={{
            ...FONTS.h3,
            color: COLORS.white,
        }}
        icon={icons.order_receive}
        iconPosition="LEFT"
        iconStyle={{
            width: 25,
            height: 25,
            marginRight: SIZES.padding,
            tintColor: COLORS.white
        }}
        onPress={() => onStepPress(orderData.statusIndex + 1)}

    />
    :
    orderData.statusIndex === 5 ?
        <TextIconButton
        containerStyle={{
            flex: 1,
            marginLeft: SIZES.radius,
            borderRadius: SIZES.base,
            backgroundColor: COLORS.primary
        }}
        label="Review us!"
        labelStyle={{
            ...FONTS.h3,
            color: COLORS.white,
        }}
        icon={icons.star}
        iconPosition="LEFT"
        iconStyle={{
            width: 25,
            height: 25,
            marginRight: SIZES.padding,
            tintColor: COLORS.gold
        }}
        onPress={() => {onStepPress(orderData.statusIndex + 1), navigation.navigate("CustomerReview",{shop: order})}}

    />:
    <TextIconButton
    containerStyle={{
        flex: 1,
        marginLeft: SIZES.radius,
        borderRadius: SIZES.base,
        backgroundColor: COLORS.primary
    }}
    label="Re-order"
    labelStyle={{
        ...FONTS.h3,
        color: COLORS.white,
    }}
    icon={icons.reorder}
    iconPosition="LEFT"
    iconStyle={{
        width: 30,
        height: 30,
        marginRight: SIZES.padding,
        tintColor: COLORS.white
    }}
    onPress={() => onStepPress(orderData.statusIndex + 1)}

/>
       }
        
        
        </View>
        </View>
    )
  
  }

  React.useEffect(() => {
    handleGetOrder();
    
    console.log(order, 'ORDER SS')
    Object.keys(order).map(a => {
      console.log(a, 'ORDER DATA')
    });
  }, [order])
  

  
  return (
    <SafeAreaView style={styles.container}>
        {renderHeader()}
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
        {renderInfo()}
        
    
        
        {renderTrackOrder()}
   
      </ScrollView>
        {renderFooter()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
      container: {
        flexGrow: 1,
        flex: 1,
        backgroundColor: COLORS.lightGray3,
        paddingBottom: SIZES.padding,
        alignItems: 'center'
    },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    elevation: 5,
    width: '100%'
},
  stepIndicator: {
    height: '100%',
    backgroundColor: COLORS.white3
},
  stepDescription: {
    fontSize: 10,
    textAlign: 'left',
    color: COLORS.transparentBlack7,
  },
  stepDescriptionSelected: {
    fontSize: 10,
    textAlign: 'left',
    color: COLORS.black,
  },

  stepLabel: {
    fontSize: 12,
    textAlign: 'left',
    fontWeight: '500',
    color: '#999999',
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: 'left',
    fontWeight: '500',
    color: '#4aae4f',
  },
});