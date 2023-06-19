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

const varEnv = constants.varEnv;

export const getCustomerShopById = id => dispatch => {
  return axios
    .get(`${varEnv.apiUrl}/alayon/shops/${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
      return null;
    });
};
