import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


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

export const authHeader = async () => {
  const accessToken = await getToken();
  console.log(accessToken);
  if (accessToken) {
    return { Authorization: 'Bearer ' + accessToken };
  } else {
    return {};
  }
};
