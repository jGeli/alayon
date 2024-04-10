import axios from 'axios';
import { constants } from '../../constants';
import {
  CLEAR_CUSTOMER_BASKETS,
  CLEAR_CUSTOMER_DATA,
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
  storeToken,
} from '../auth-header';
import { getCustomerData } from './customer.actions';

const varEnv = constants.varEnv;


export const requestSignin = (data, navigation, params) => dispatch => {
  axios
    .post(`${varEnv.apiUrl}/auth/request`, data)
    .then(res => {
      let { user, redirection } = res.data;
      if (redirection && params.redirection !== 'OrderSummary') {
        params.redirection = redirection;
      }
      console.log(res.data, 'REQUEST SIGNIN')
      navigation && navigation.navigate('Otp', { ...res.data, ...params, user: { ...user, ...data } });
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
      let { token } = res.data;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      AsyncStorage.setItem('token', token)
      dispatch({ type: SET_AUTHENTICATED })
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
      const { user } = res.data;
      dispatch({ type: SET_USER, payload: user });
      dispatch({ type: SET_AUTHENTICATED });
      if (user.type === 'customer') {
        dispatch(getCustomerData())
      }
      return res.data
      // navigation && navigation.navigate(screen, {});
    })
    .catch(err => {
      console.log('Auth Error');
      let error = err?.response?.data;
      console.log(err)
      if (error && error.text === 'Unauthorized') {
        dispatch(logoutUser())
      }

    });
};


export const updateAuthUser = data => dispatch => {
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
  AsyncStorage.removeItem('token');
  axios.defaults.headers.common['Authorization'] = null;
  dispatch({ type: CLEAR_USER });
  dispatch({ type: CLEAR_CUSTOMER_DATA });
  dispatch({ type: CLEAR_CUSTOMER_BASKETS });
  dispatch({ type: SET_UNAUTHENTICATED });
  dispatch({ type: CLEAR_MERCHANT_PROFILE });
  navigation && navigation.navigate('CustomerHome', {});
};

export const requestOTP = ( data ) => dispatch => {
  return axios
  .post(`${varEnv.apiUrl}/auth/sendOtp`, data)
    .then((res) => {
      console.log("Request Sent:", res)
      let userType = res.data.providerType;
      let user = res.data.user;
      console.log(user, userType)
      dispatch({ type: SET_USER, payload: { ...user, ...data } });
      dispatch({ type: SET_USERTYPE, payload: userType });
    })
    .catch((err) => {
      console.log("Request Error:", err.response)
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    })
}
