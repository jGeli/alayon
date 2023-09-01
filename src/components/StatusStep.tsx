import * as React from 'react';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { COLORS, SIZES, icons } from '../constants';
import { SafeAreaView } from 'react-native';


const stepIndicatorStyles = {
    stepIndicatorSize: 20,
    currentStepIndicatorSize: 20,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 5,
    stepStrokeCurrentColor: COLORS.primary,
    separatorFinishedColor: COLORS.primary,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: COLORS.primary,
    stepIndicatorUnFinishedColor: '#aaaaaa',
    stepIndicatorCurrentColor: COLORS.primary,
    stepIndicatorLabelFontSize: 10,
    currentStepIndicatorLabelFontSize: 10,
    stepIndicatorLabelCurrentColor: '#000000',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
    labelColor: '#666666',
    labelSize: 5,
    currentStepLabelColor: COLORS.primary,
};



export default function StatusStep({currentPage, stepInput, handleStepInput}) {

          const renderStepIndicator = (params: any) => (
            <View
              style={{
                flex: 1,
                // width: 400,
                // marginLeft: SIZES.padding,
                  height: 10,
                justifyContent: 'center',
                backgroundColor: COLORS.gray
              }}
            ></View>
          )
            
            
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
                  // flexGrow: 1,
                  width: 200,
                  // margin: SIZES.padding,
                  paddingLeft: SIZES.padding * 2,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  paddingHorizontal: SIZES.padding
                //   backgroundColor: COLORS.darkGray
                  }}
              >
                
                <Text
                  style={
                    position === currentPosition
                      ? styles.stepLabelSelected
                      :  position < currentPosition ? styles.stepLabelDone :  styles.stepLabel
                  }
                >
                  {label}
                </Text>
                </View>
              );
            };
          
          

    return (
            <SafeAreaView style={styles.stepIndicator}>
                <StepIndicator
                    customStyles={stepIndicatorStyles}
                    stepCount={stepInput.length}
                    direction="horizontal"
                    // onPress={onStepPress}
                    currentPosition={currentPage}
                    renderLabel={renderLabel}
                    renderStepIndicator={renderStepIndicator}
                    labels={stepInput}
                />
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    stepIndicator: {
        alignSelf: 'center',
        width: 500,
        // flex: 1,
        // flexGrow: 1
        // margin: SIZES.padding * 3,
        // padding: SIZES.padding * 3,
        // backgroundColor: COLORS.white,
        // height: 200,
        // paddingHorizontal: 20,
    },
    rowItem: {
        flex: 3,
        paddingVertical: 20,
    },
    title: {
        flex: 1,
        fontSize: 20,
        color: '#333333',
        paddingVertical: 16,
        fontWeight: '600',
    },
    body: {
        flex: 1,
        fontSize: 15,
        color: '#606060',
        lineHeight: 24,
        marginRight: 8,
    },
   
      stepDescription: {
        fontSize: 10,
        textAlign: 'left',
        color: COLORS.transparentBlack1,
      },
      stepDescriptionSelected: {
        fontSize: 10,
        textAlign: 'left',
        color: COLORS.black,
      },
      stepDescriptionDone: {
        fontSize: 10,
        textAlign: 'left',
        color: COLORS.darkGray1,
      },
      stepLabel: {
        fontSize: 12,
        textAlign: 'center',
        // fontWeight: '500',
        color: '#999999',
      },
      stepLabelDone: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
        color: COLORS.black,
      },
      stepLabelSelected: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
        color: COLORS.blue,
      },
});