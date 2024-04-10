import React, { useEffect, useState } from 'react'
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image
} from 'react-native'
import { COLORS, FONTS, SIZES, icons, images } from '../../constants';
import StatusStep from '../StatusStep';
import moment from 'moment';
import { SET_CUSTOMER_BASKET, SET_SELECTED_SHOP } from '../../redux/actions/type';
import { useDispatch } from 'react-redux';
import { statusIndexing } from '../../utils/helpers';
import { getOrders } from '../../redux/actions/customer.actions';

const CustomerOrders = ({ navigation, order }) => {
	const dispatch = useDispatch()
	let { shop } = order;
	const { activeStatus } = order;
	let orderStatus = order.order_status[statusIndexing(order.activeStatus)]?.index.name;
	
	// Test only
	/* const [myOrders, setMyOrders] = useState([]);
	const handleActiveOrders = async () => {
		setMyOrders([])
		dispatch(getOrders())
		.then(res => {
			console.log(res, "Success Response")
			setMyOrders(res)
			return res
		})
		.catch(err => {
			console.log(err, "Error Response")
			return err.m
		})
	} */
	
	
	/* useEffect(() => {
		handleActiveOrders()

	},[shop]) */
	
	console.log(order, "WEWEWEW")
	

	return (
		/*  {
				 order.length == 0 ?
				 
				 <View>
						 <Text>
								 No active orders found
						 </Text>
				 </View>
				 : */
		<View
			style={{ ...styles.cardContainer, backgroundColor: COLORS.white, elevation: 5 }}
		>

			{/* HEADER */}
			<View style={styles.headerContainer}>
				<View style={{ flexGrow: 1, padding: SIZES.semiRadius, flexDirection: 'row' }}>
					<Image source={{ uri: shop.bannerUrl }} style={styles.profileImage} />
					<View style={{ marginLeft: SIZES.padding }}>
						<Text style={{ ...FONTS.h4, color: COLORS.darkBlue }}>{shop.shop_name}</Text>
						<Text style={{ ...FONTS.body4 }}>
							{order.transaction_id}
						</Text>

					</View>
				</View>
				<TouchableOpacity
					// style={{padding: SIZES.semiRadius}}
					onPress={() => navigation.navigate('TestScreen', { order, navType: 'track' })}
					// disabled={activeStatus == 'rejected' || activeStatus == 'completed' ? true : false}
				>
					<Image source={icons.send} 
						style={{ 
							...styles.sendIcon, 
							// tintColor: activeStatus == 'rejected' || activeStatus == 'completed' ? COLORS.black : COLORS.primary 
							tintColor: COLORS.primary
						}}/>
				</TouchableOpacity>
				{/* <TouchableOpacity
                // style={{padding: SIZES.semiRadius}}
                onPress={() => navigation.navigate('OrderStatus', {order, navType: 'track'})}
            >
            <Image source={icons.send} style={styles.sendIcon}/>
            </TouchableOpacity> */}
			</View>

			{/* STEPPER */}
			<View style={{ marginTop: SIZES.padding * 2, justifyContent: 'center', alignItems: 'center', }}>
				<StatusStep
					currentPage={order.activeStatus === 'completed' ? 1 : order.activeStatus == 'rejected' ? 1 : 0}
					stepInput={[order.activeStatus === 'completed' ? '' : order.activeStatus === 'pending' ? 'WAITING FOR SHOP\n CONFIRMATION' : order.activeStatus == 'rejected' ? "" : order.activeStatus == 'rider_confirmed' ? `RIDER HEADING FOR\n LAUNDRY PICKUP` : order.activeStatus == 'ready_pickup' ? 'LAUNDRY IS OUT FOR\n DELIVERY' : order.activeStatus == 'shop_processing' ? 'IN PROGRESS' : orderStatus, order.activeStatus == 'rejected' ? 'DECLINED' : 'Delivered']}
					handleStepInput={order.activeStatus}
				/>
			</View>
			{/* BUTTON */}
			<View style={styles.btnContainer}>
				<TouchableOpacity style={styles.button}
					onPress={() => {
						console.log("PRESS INE")
						dispatch({
							type: SET_SELECTED_SHOP,
							payload: shop,
						});
						dispatch({
							type: SET_CUSTOMER_BASKET,
							payload: order,
						});
						if(order.activeStatus === 'shop_processing' || order.activeStatus === 'completed') {

							return navigation.navigate("OrderStatus", { order, shopId: shop._id })
						}
						navigation.navigate("OrderSummary", { orderId: order._id, shopId: shop._id })
					}}

				>
					<Text style={{ ...FONTS.body4, fontWeight: 'bold' }}
					>Order Details</Text>
				</TouchableOpacity>
			</View>

		</View >
		// }
	)
}

// define your styles
const styles = StyleSheet.create({
	cardContainer: {
		minHeight: 200,
		width: '100%',
		flexGrow: 1,
		flex: 1,
		borderRadius: SIZES.semiRadius,
		padding: SIZES.padding,
		borderWidth: .5,
		borderColor: COLORS.lightGray3,
		backgroundColor: COLORS.lightGray3,
		marginBottom: SIZES.padding * 2,
		elevation: 2
		//   alignItems: 'center'
	},
	headerContainer: {
		width: '100%',
		flexDirection: 'row',
	},
	profileImage: {
		height: 50,
		width: 50,
		borderRadius: 50
	},
	sendIcon: {
		height: 35,
		width: 35,
	},
	btnContainer: {
		marginTop: SIZES.padding,
		height: 60,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	button: {
		width: 180,
		borderWidth: 1,
		height: 40,
		borderRadius: SIZES.radius,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default CustomerOrders;

