import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export const clearData = async key => {
  try {
    await AsyncStorage.clear();
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

export const storeUser = async value => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const storeToken = async value => {
  try {
    await AsyncStorage.setItem('token', JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

// getting data
export const getToken = async () => {
  try {
    const userToken = JSON.parse(await AsyncStorage.getItem('token'));
    console.log('TOKEND');
    console.log(userToken);
    if (userToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
    } else {
      axios.defaults.headers.common['Authorization'] = null;
    }
    return userToken;
  } catch (error) {
    console.log(error);
    return null;
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

export const authHeader = async () => {
  const accessToken = await getToken();
  console.log(accessToken);
  if (accessToken) {
    return {Authorization: 'Bearer ' + accessToken};
  } else {
    return {};
  }
};
