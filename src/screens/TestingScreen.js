import { StyleSheet, Text, View, Animated, FlatList, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'

export default TestingScreen = () => {
	const flatListRef = useRef(null); // Reference for FlatList
  const scrollY = useRef(new Animated.Value(0)).current; // 
	// const flatListRef = useRef(null); // Reference for FlatList
	// const flatListRef = useRef(null); // Reference for FlatList
  const [scrollOffset, setScrollOffset] = useState(0); // State to track scroll offset
	const data = [
		{ id: '1', title: 'Card 1', description: 'Description for Card 1' },
		{ id: '2', title: 'Card 2', description: 'Description for Card 2' },
		{ id: '3', title: 'Card 3', description: 'Description for Card 3' },
		{ id: '4', title: 'Card 4', description: 'Description for Card 4' },
		{ id: '5', title: 'Card 5', description: 'Description for Card 5' },
		{ id: '6', title: 'Card 6', description: 'Description for Card 6' },
		{ id: '7', title: 'Card 7', description: 'Description for Card 7' },
		{ id: '8', title: 'Card 8', description: 'Description for Card 8' },
		{ id: '9', title: 'Card 9', description: 'Description for Card 9' },
		{ id: '10', title: 'Card 10', description: 'Description for Card 10' },
		{ id: '11', title: 'Card 11', description: 'Description for Card 11' },
		{ id: '12', title: 'Card 12', description: 'Description for Card 12' },
		{ id: '13', title: 'Card 13', description: 'Description for Card 13' },
		{ id: '14', title: 'Card 14', description: 'Description for Card 14' },

	];

	// Render item function for FlatList
  const renderItem = ({ item, index }) => {
    // Calculate the translateY and scale based on scroll position
    const inputRange = [-1, 0, 50 * index, 50 * (index + 2)];
    const translateY = scrollY.interpolate({
      inputRange,
      outputRange: [0, 0, -50 * index, -50 * (index + 1)],
      extrapolate: 'clamp',
    });
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0.8],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.card, { transform: [{ translateY }, { scale }] }]}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef} // Set reference for FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16} // Adjust as needed for smoother animation
        inverted // Invert the FlatList to display items in reverse order
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: 'lightblue',
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
  },
});

