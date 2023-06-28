import axios from 'axios';
import {constants} from '../../constants';
import {
  SET_ERROR,
  SET_LAUNDRY_CLOTH,
  SET_LAUNDRY_SERVICES,
  SET_LAUNDRY_SHOPS,
  SET_MERCHANT_PROFILE,
  SET_USER,
  SET_CONVERSATION,
  SET_CONVERSATIONS,
  CLEAR_CONVERSATIONS,
} from './type';
import {authHeader, getData} from '../auth-header';

const varEnv = constants.varEnv;

export const createShopProfile = (data, navigation) => dispatch => {
  console.log('TOKEN');
  console.log(data.token);
  axios
    .post(`${varEnv.apiUrl}/merchants`, data, {
      headers: {Authorization: 'Bearer ' + data.token},
    })
    .then(res => {
      dispatch({type: SET_MERCHANT_PROFILE, payload: res.data.d});
      navigation.navigate('LaundryService', res.data);
    })
    .catch(err => {
      console.log(JSON.stringify(err));
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    });
};

export const getShops = (data, navigation) => dispatch => {
  axios
    .get(`${varEnv.apiUrl}/alayon/shops`, data)
    .then(res => {
      dispatch({type: SET_LAUNDRY_SHOPS, payload: res.data});
    })
    .catch(err => {
      console.log(JSON.stringify(err));
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    });
};

export const getServices = () => dispatch => {
  axios
    .get(`${varEnv.apiUrl}/alayon/services`)
    .then(res => {
      dispatch({type: SET_LAUNDRY_SERVICES, payload: res.data});
    })
    .catch(err => {
      console.log(JSON.stringify(err));
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    });
};

export const getCloths = () => dispatch => {
  axios
    .get(`${varEnv.apiUrl}/alayon/cloths`)
    .then(res => {
      console.log('CLOTHS');
      console.log(res.data);
      dispatch({type: SET_LAUNDRY_CLOTH, payload: res.data});
    })
    .catch(err => {
      console.log(JSON.stringify(err));
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    });
};

export const uploadFileImage = data => {
  console.log(data);
  return axios
    .post(`${varEnv.apiUrl}/merchants/upload`, data, {
      headers: {'Content-Type': 'multipart/form-data'},
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err.response);
    });
};

export const getConversation = () => dispatch => {
  axios
    .get(`${varEnv.apiUrl}/support`)
    .then(res => {
      console.log('MESSAGE');
      console.log(res.data);
      dispatch({type: SET_CONVERSATION, payload: res.data});
    })
    .catch(err => {
      console.log(JSON.stringify(err));
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    });
};