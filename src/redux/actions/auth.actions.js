import axios from 'axios';
import { constants } from '../../constants';
import {
  CLEAR_MERCHANT_PROFILE,
  CLEAR_USER,
  SET_AUTHENTICATED,
  SET_ERROR,
  SET_MERCHANT_PROFILE,
  SET_UNAUTHENTICATED,
  SET_USER,
  SET_USERTYPE,
} from './type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  authHeader,
  clearData,
  getData,
  storeData,
  storeToken,
  storeUser,
} from '../auth-header';

const varEnv = constants.varEnv;

const setAuthToken = async token => {
  await storeData('token', token);
};

export const requestSignin = (data, navigation, redirection) => dispatch => {
  axios
    .post(`${varEnv.apiUrl}/auth/request`, data)
    .then(res => {
      let { user, userType } = res.data;
      console.log(res.data);
      console.log(res.data, 'Text');
      console.log(res.data, 'RES DATA INE');
      storeData('user', user);
      dispatch({ type: SET_USER, payload: { ...user, ...data } });
      dispatch({ type: SET_USERTYPE, payload: userType });

      navigation.navigate('Otp', { ...res.data, redirection });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    });
};

export const verifyOTP = (user, navigation) => dispatch => {
  return axios
    .post(`${varEnv.apiUrl}/auth/verify`, user)
    .then(res => {
      let { token, user } = res.data;
      console.log(token);
      storeToken(token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log('token');
      console.log(token);
      dispatch(getAuthUser(navigation));
      return res.data
    })
    .catch(err => {
      let { m } = err?.response?.data;
      dispatch({ type: SET_ERROR, payload: { otp: m } });
    });
};

export const getAuthUser = navigation => dispatch => {
  axios
    .get(`${varEnv.apiUrl}/auth`)
    .then(res => {
      console.log('AUTH USER');
      console.log(res.data);
      const { screen, user } = res.data;
      if (user && user.type === 'merchant') {
        dispatch({ type: SET_MERCHANT_PROFILE, payload: { mobile: user.providerId } });
        dispatch(getAuthMerchant(navigation));
        navigation && navigation.navigate(screen, {});
        return;
      }

      storeUser(user);

      dispatch({ type: SET_USER, payload: user });
      dispatch({ type: SET_AUTHENTICATED });

      navigation && navigation.navigate(screen, {});
    })
    .catch(err => {
      console.log('Auth Error');
      let { m } = err?.response?.data;
      console.log(err.response.data);
    });
};

export const getAuthMerchant = navigation => dispatch => {
  console.log('GET AUTH MERCHANT');
  axios
    .get(`${varEnv.apiUrl}/auth/merchant`)
    .then(res => {
      console.log('MERCHANT DATA');
      let { merchant, screen } = res.data;
      console.log(res.data);
      dispatch({ type: SET_MERCHANT_PROFILE, payload: merchant });
      navigation && navigation.navigate(screen, {});
    })
    .catch(err => {
      console.log(err.response.data);
      navigation && navigation.navigate('LaundryProfile', {});
    });
};

export const updateAuthUser = data => dispatch => {
  console.log('Update Auth');
  axios
    .put(`${varEnv.apiUrl}/auth`, data)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err.response.data);
    });
};

export const logoutUser = navigation => dispatch => {
  clearData();
  axios.defaults.headers.common['Authorization'] = null;
  dispatch({ type: CLEAR_USER });
  dispatch({ type: SET_UNAUTHENTICATED });
  dispatch({ type: CLEAR_MERCHANT_PROFILE });
  navigation.navigate('Main', {});
};
