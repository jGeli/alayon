import React from 'react';
import { View, Text } from 'react-native';
import StepIndicator from 'react-native-step-indicator';

const OrderStepStatus = () => {
  // Define step labels
  const stepLabels = [
    { name: 'Pending', description: '' },
    { name: 'Shop Confirmed', description: '' },
    { name: "Rider on it's way", description: '' },
    { name: 'Shop processing laundry', description: '' },
    { name: 'Ready for pickup', description: '' },
    { name: 'Completed/Rejected', description: '' }
  ];

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={0} // Set initial current position
        stepCount={6} // Set total number of steps
        labels={stepLabels} // Pass step labels
        renderLabel={({ position, label, currentPosition }) => (
          <View>
            <Text style={{ fontWeight: position === currentPosition ? 'bold' : 'normal', color: '#ffffff' }}>{label.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

// Custom styles for StepIndicator
const customStyles = {
  stepIndicatorSize: 20,
  currentStepIndicatorSize: 25,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013'
};

export default OrderStepStatus;