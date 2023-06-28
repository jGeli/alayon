/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES, icons, images } from '../../constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LineDivider, TextButton, TextIconButton } from '../../components';



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

export default function OrderStatus({navigation}) {
  const [currentPage, setCurrentPage] = React.useState<number>(0);

  const onStepPress = (position: number) => {
  
    setCurrentPage(position > 6 ? 6 : position < 0 ? 0 : position);
  };
  
  function renderHeader() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.padding,
          height: 40,
          marginTop: 20
        }}>
        <Text
          style={{
            ...FONTS.h4,
            color: COLORS.black,
            textAlign: 'center'
            // fontWeight: 'bold',
          }}>
        DELIVERY STATUS
        </Text>

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
    console.log(params)
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
    label: string;
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
        {label}
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
            <Text style={{ ...FONTS.body3, color: COLORS.gray}}>NY012345</Text>
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
          currentPosition={currentPage}
          onPress={onStepPress}
          direction="vertical"
          renderLabel={renderLabel}
          stepCount={6}
          renderStepIndicator={renderStepIndicator}
          labels={[
            'CUSTOMER ORDER CONFIRMED',
            'RIDER PICKED UP ORDER',
            'SHOP RECEIVE AND PROCESS ORDER',
            'OUT FOR DELIVERY',
            'ORDER COMPLETED',
            'RATE US'
          ]}
        />
      </View>
      </View>
        
        </View>
    )
  }

  console.log(currentPage)

  function renderFooter() {
    return (
        <View
            style={{marginTop: SIZES.radius, marginBottom: SIZES.padding}}
        >
        <View
            style={{flexDirection: 'row', height: 55}}
        >
        {
        currentPage < 2 ?
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
        onPress={() => onStepPress(currentPage - 1)}
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
    onPress={() => onStepPress(currentPage - 1)}
    />
        }
       {currentPage < 4 
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
            onPress={() => onStepPress(currentPage + 1)}

        />
        :
        currentPage === 4 ?
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
        onPress={() => onStepPress(currentPage + 1)}

    />
    :
    currentPage === 5 ?
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
        onPress={() => onStepPress(currentPage + 1)}

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
    onPress={() => onStepPress(currentPage + 1)}

/>
       }
        
        
        </View>
        </View>
    )
  
  }


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
    height: '100%',
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.padding

    // flexDirection: 'row',
  },

  stepIndicator: {
    height: '100%',
    backgroundColor: COLORS.white3
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