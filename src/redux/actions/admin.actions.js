import axios from 'axios';
import {constants} from '../../constants';
import {
  SET_ERROR,
  SET_LAUNDRY_SHOPS,
  SET_MERCHANT_PROFILE,
  SET_USER,
} from './type';
import {authHeader, getData} from '../auth-header';
import {getCloths, getServices} from './data.actions';

const varEnv = constants.varEnv;

export const createService = (data, navigation) => dispatch => {
  axios
    .post(`${varEnv.apiUrl}/admin/services`, data, {
      headers: {Authorization: 'Bearer ' + data.token},
    })
    .then(res => {})
    .catch(err => {
      console.log('ERROR');
      console.log(err.response);
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    });
};

export const deleteService = id => dispatch => {
  axios
    .delete(`${varEnv.apiUrl}/admin/services/${id}`, {
      headers: {Authorization: 'Bearer ' + data.token},
    })
    .then(res => {
      dispatch(getServices());
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

export const createClothType = data => dispatch => {
  axios
    .post(`${varEnv.apiUrl}/admin/cloths`, data, {
      headers: {Authorization: 'Bearer ' + data.token},
    })
    .then(res => {
      // navigation.navigate('MainMerchant', res.data);
      dispatch(getCloths());
    })
    .catch(err => {
      console.log(JSON.stringify(err));
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    });
};

export const deleteCloths = id => dispatch => {
  axios
    .delete(`${varEnv.apiUrl}/admin/cloths/${id}`)
    .then(res => {
      dispatch(getCloths());
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
