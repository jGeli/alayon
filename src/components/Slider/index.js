import React, {useCallback, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Slider from 'rn-range-slider';

import Thumb from './Thumb';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Notch from './Notch';
import Label from './Label';
import TextButton from './TextButton';

import styles from './styles';

const SliderScreen = () => {
  const [rangeDisabled, setRangeDisabled] = useState(false);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(8);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(10);
  const [floatingLabel, setFloatingLabel] = useState(true);

  const renderThumb = useCallback(
    (name: 'high' | 'low') => <Thumb name={name} />,
    [],
  );
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((lowValue, highValue) => {
    setLow(lowValue);
    setHigh(highValue);
  }, []);
  const toggleRangeEnabled = useCallback(
    () => setRangeDisabled(!rangeDisabled),
    [rangeDisabled],
  );
  const setMinTo50 = useCallback(() => setMin(1), []);
  const setMinTo0 = useCallback(() => setMin(0), []);
  const setMaxTo100 = useCallback(() => setMax(8), []);
  const setMaxTo500 = useCallback(() => setMax(10), []);
  const toggleFloatingLabel = useCallback(
    () => setFloatingLabel(!floatingLabel),
    [floatingLabel],
  );

  return (
    <ScrollView>
        
        <Slider
          style={styles.slider}
          min={min}
          max={max}
          step={0.5}
          disableRange={rangeDisabled}
          floatingLabel={floatingLabel}
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          renderLabel={renderLabel}
          renderNotch={renderNotch}
          onValueChanged={handleValueChange}
        />
        <View style={styles.horizontalContainer}>
          <Text style={styles.valueText}>{low}km</Text>
          <Text style={styles.valueText}>{high}km</Text>
        </View>
    </ScrollView>
  );
};

export default SliderScreen;