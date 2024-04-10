//import liraries
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../constants';
import { Image } from 'react-native';
import { cutString } from '../utils/helpers';
import { FlatList } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAreaLocations } from '../redux/actions/data.actions';
import { CLEAR_MAP_LOCATION, SET_MAP_LOCATION } from '../redux/actions/type';

// create a component
const AreaLocations = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const { user } = useSelector(({ auth }) => auth);
	const [list, setList] = useState([]);

	const handleGetAreaLocations = async () => {
		let areas = await dispatch(getAreaLocations());
		console.log('AREAS', areas)
		if (areas) {
			setList(areas)
		}
	}

	function renderHeader() {
		return (
			<View style={{ ...styles.headerContainer, justifyContent: 'space-between' }}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={{
						marginHorizontal: SIZES.padding,
						justifyContent: 'flex-end',
						alignItems: 'flex-end'
					}}>
					<Image
						source={icons.back}
						resizeMode="contain"
						style={{
							width: 20,
							height: 20,
							tintColor: COLORS.white
						}}
					/>
				</TouchableOpacity>
				<Text
					style={{ fontSize: 17, color: COLORS.secondary, fontWeight: 'bold', marginHorizontal: SIZES.padding * 2 }}
				>
					Philippines
				</Text>
			</View>
		);
	}

	function renderItem({ item, index }) {

		return (
			<View style={{ flex: 1, flexDirection: 'column' }}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						// margin: SIZES.base,
					}}
				>


				</View>
				<TouchableOpacity
					key={item._id}
					style={{
						...styles.listItem,
						backgroundColor: item.hasRider == false || item.hasShop == false ? COLORS.gray300 : COLORS.white2

					}}
					disabled={item.hasRider == false || item.hasShop == false ? true : false}
					onPress={() => {
						dispatch({ type: SET_MAP_LOCATION, payload: item })
						navigation.goBack()
					}}
				>
					<View>
						<Text
							style={{ ...FONTS.body3, color: COLORS.black }}
						>{item.cityMun}</Text>
						<Text
							style={{ ...FONTS.body4, color: COLORS.darkGray }}
						>Province of {item.province}</Text>
					</View>
					{(!item.hasRider || !item.hasShop) &&
						<Text
							style={{ ...FONTS.body3, color: COLORS.red }}
						>Comming Soon!</Text>
					}
				</TouchableOpacity>
			</View>

		)

	}

	useEffect(() => {
		handleGetAreaLocations()
	}, [])

	return (
		<View style={styles.container}>
			{renderHeader()}
			<View style={{ padding: 10, flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
				<Text
					style={{ fontSize: 14, color: COLORS.primary }}
				>
					Select City
				</Text>
				<TouchableOpacity
					onPress={() => { dispatch({ type: CLEAR_MAP_LOCATION }), navigation.goBack() }}
				>
					<Text
						style={{
							fontSize: 14,
							color: COLORS.secondary,


						}}
					>
						Select Default
					</Text>
				</TouchableOpacity>

			</View>

			<FlatList
				keyExtractor={(item) => item._id}
				data={list}
				renderItem={renderItem}

			/>
		</View>
	);
};

// define your styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
	},
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingVertical: SIZES.base,
		backgroundColor: COLORS.primary,
		elevation: 5,
		width: '100%'
		// paddingVertical: SIZES.padding
	},
	listItem: {
		padding: SIZES.padding,
		paddingHorizontal: SIZES.padding * 2,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomColor: COLORS.darkGray,
		borderTopColor: COLORS.darkGray,
		borderWidth: .5
	}
});

//make this component available to the app
export default AreaLocations;
