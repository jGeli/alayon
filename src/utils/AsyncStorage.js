import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export const clearData = async key => {
    try {
        await AsyncStorage.removeItem('locations');
        await AsyncStorage.removeItem('basket');
        await AsyncStorage.removeItem('baskets');
        await AsyncStorage.removeItem('token');
        return;
    } catch (e) {
        console.log(e);
        // error reading value
    }
};

export const getData = async key => {
    try {
        const val = await AsyncStorage.getItem(`@${key}`);
        if (val !== null) {
            // val previously stored
            return val;
        }
    } catch (e) {
        console.log(e);
        // error reading value
    }
};

export const storeData = async (key, value) => {
    let val = '';
    try {
        if (typeof value !== 'string') {
            val = JSON.stringify(value);
        } else {
            val = value;
        }

        await AsyncStorage.setItem(`@${key}`, val);
    } catch (e) {
        console.log(e);
        // saving error
    }
};

export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);

    } catch (e) {
        console.log(e);
        // saving error
    }
};

export const storeUser = async value => {
    try {
        await AsyncStorage.setItem('user', JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
};


// getting data
export const getUserData = async () => {
    try {
        const userData = JSON.parse(await AsyncStorage.getItem('user'));
        const userToken = JSON.parse(await AsyncStorage.getItem('token'));
        console.log(userData);
        console.log(userToken);
    } catch (error) {
        console.log(error);
    }
};




// set customer basket
export const setCustomerBasket = async (data) => {
    try {


        let initBasket = {
            pickupAddress: null,
            returnLocation: null,
            orders: []
        };
        const oldBasket = await getCustomerBasket();

        if (oldBasket) {

            await AsyncStorage.setItem(`basket`, JSON.stringify({ ...oldBasket, ...data }))
        } else {
            await AsyncStorage.setItem(`basket`, JSON.stringify({ ...initBasket, ...data }))
        }


    } catch (error) {
        console.log(error);
        return null
    }
};

export const setCustomerBaskets = async (data) => {
    try {

        const oldBaskets = await getCustomerBaskets();
        const newBaskets = [...oldBaskets, { ...data }];
        await AsyncStorage.setItem('baskets', JSON.stringify(newBaskets))

        return newBaskets;
    } catch (error) {
        console.log(error);
        return null
    }
};

export const getCustomerBaskets = async () => {
    try {


        const baskets = JSON.parse(await AsyncStorage.getItem('baskets'));
        console.log('ASYN BASKET', baskets)
        if (baskets) {
            console.log('ASYN YES')
            return baskets
        } else {
            console.log('ASYN NON')
            return []
        }

    } catch (error) {
        console.log(error);
        return []
    }
};


// get customer basket
export const getCustomerBasket = async () => {
    try {
        const basket = JSON.parse(await AsyncStorage.getItem('basket'));
        if (basket) {
            return basket
        } else {
            return null
        }
    } catch (error) {
        console.log(error);
        return null
    }
};

export const setCustomerLocation = async (data) => {
    try {

        await AsyncStorage.setItem(`location`, JSON.stringify(data))
        return data
    } catch (error) {
        console.log(error);
        return null
    }
};

export const getCustomerLocation = async () => {
    try {
        const location = JSON.parse(await AsyncStorage.getItem('location'));
        if (location) {
            return location
        } else {
            return {}
        }
    } catch (error) {
        console.log(error);
        return []
    }
};


export const setCustomerLocations = async (data) => {
    try {

        await AsyncStorage.setItem(`locations`, JSON.stringify(data))
        return data
    } catch (error) {
        console.log(error);
        return null
    }
};

export const getCustomerLocations = async () => {
    try {
        const locations = JSON.parse(await AsyncStorage.getItem('locations'));
        if (locations) {
            return locations
        } else {
            return []
        }
    } catch (error) {
        console.log(error);
        return []
    }
};

export const deleteCustomerLocations = async (id) => {
    try {


        await AsyncStorage.setItem(`locations`, JSON.stringify(newLocations))
        return newLocations
    } catch (error) {
        console.log(error);
        return null
    }
};