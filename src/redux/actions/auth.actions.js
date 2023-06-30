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

      if (redirection) {
        params.redirection = redirection;
      }

      navigation.navigate('Otp', { ...res.data, ...params, user: { ...user, ...data } });
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
      storeToken(token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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
      console.log(user)
      dispatch({ type: SET_USER, payload: user });
      dispatch({ type: SET_AUTHENTICATED });
      if (user.type === 'customer') {
        dispatch(getCustomerData())
      }
      console.log('AUTH USER')
      console.log(res.data)

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
  axios.defaults.headers.common['Authorization'] = null;
  dispatch({ type: CLEAR_USER });
  dispatch({ type: CLEAR_CUSTOMER_DATA });
  dispatch({ type: CLEAR_CUSTOMER_BASKETS });
  dispatch({ type: SET_UNAUTHENTICATED });
  dispatch({ type: CLEAR_MERCHANT_PROFILE });
  navigation && navigation.navigate('CustomerHome', {});
};
