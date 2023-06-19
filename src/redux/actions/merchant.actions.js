import axios from 'axios';
import {constants} from '../../constants';
import {
  CLOSE_MODALS,
  SET_ERROR,
  SET_LAUNDRY_SHOPS,
  SET_MERCHANT_PROFILE,
  SET_USER,
} from './type';
import {authHeader, getData} from '../auth-header';
import {getAuthMerchant} from './auth.actions';

const varEnv = constants.varEnv;

export const createShopProfile = (data, navigation) => dispatch => {
  axios
    .post(`${varEnv.apiUrl}/merchants`, data, {
      headers: authHeader(),
    })
    .then(res => {
      dispatch(getAuthMerchant());
      // dispatch({type: SET_MERCHANT_PROFILE, payload: res.data});
      navigation.navigate('LaundryService', {});
    })
    .catch(err => {
      console.log(JSON.stringify(err));
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    });
};

export const updateShopProfile = (data, navigation) => dispatch => {
  axios
    .put(`${varEnv.apiUrl}/merchants/update`, data)
    .then(res => {
      dispatch({type: SET_MERCHANT_PROFILE, payload: res.data});
      navigation.goBack();
    })
    .catch(err => {
      console.log(JSON.stringify(err));
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    });
};

export const createShopService = (data, navigation) => dispatch => {
  axios
    .post(`${varEnv.apiUrl}/merchants/services`, data, {
      headers: authHeader(),
    })
    .then(res => {
      console.log('SERVICES DATA');
      dispatch({type: SET_MERCHANT_PROFILE, payload: {services: res.data}});
      dispatch(getAuthMerchant());
      navigation && navigation.navigate('TypePricing', res.data);
    })
    .catch(err => {
      console.log('ERROR');
      console.log(err.response);
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    });
};

export const createShopServiceClothType = (data, navigation) => dispatch => {
  axios
    .post(`${varEnv.apiUrl}/merchants/services/cloths`, data)
    .then(res => {
      console.log(res.data);
      dispatch(getAuthMerchant());
    })
    .catch(err => {
      console.log(JSON.stringify(err));
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    });
};

export const updateServiceClothPricing = (data, navigation) => dispatch => {
  axios
    .put(`${varEnv.apiUrl}/merchants/services/cloths/${data._id}`, data)
    .then(res => {
      console.log(res.data);
      dispatch(getAuthMerchant());
      dispatch({type: CLOSE_MODALS});
    })
    .catch(err => {
      console.log(JSON.stringify(err));
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    });
};

export const getMerchantServices = () => dispatch => {
  axios
    .get(`${varEnv.apiUrl}/merchants/services`)
    .then(res => {
      dispatch({type: SET_MERCHANT_PROFILE, payload: {services: res.data}});
      navigation.navigate('TypePricing', res.data);
    })
    .catch(err => {
      console.log('ERROR');
      console.log(err.response);
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    });
};

export const createShopAddOns = data => dispatch => {
  return axios
    .post(`${varEnv.apiUrl}/merchants/addons/`, data)
    .then(res => {
      console.log('ADDONS CREATE');
      console.log(res.data);
      dispatch(getAuthMerchant());
      dispatch({type: CLOSE_MODALS});
    })
    .catch(err => {
      console.log('ERROR');
      console.log(err.response);
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
      return {};
    });
};

export const getShopById = id => dispatch => {
  return axios.get(`${varEnv.apiUrl}/merchants/${id}`).catch(err => {
    dispatch({
      type: SET_ERROR,
      payload: err,
    });
    return null;
  });
};
