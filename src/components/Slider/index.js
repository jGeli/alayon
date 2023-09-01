import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Slider from 'rn-range-slider';

import Thumb from './Thumb';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Notch from './Notch';
import Label from './Label';

import styles from './styles';

const SliderScreen = ({ onStepChange, range, disabled }) => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(10);

  const renderThumb = useCallback(
    (name: 'high' | 'low') => <Thumb name={name} />,
    [],
  );
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);



  return (
    <View>

      <Slider
        style={styles.slider}
        min={min}
        max={max}
        step={0.5}
        high={range.high}
        low={range.low}
        disabled={disabled}
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        onValueChanged={(low, high) => onStepChange(low, high)}
      />
      <View style={styles.horizontalContainer}>
        <Text style={styles.valueText}>{range.low}km</Text>
        <Text style={styles.valueText}>{range.high}km</Text>
      </View>
    </View>
  );
};

export default SliderScreen;