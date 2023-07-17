import axios from 'axios';
import { constants } from '../../constants';
import {
  CLOSE_MODALS,
  SET_ERROR,
  SET_LAUNDRY_SHOPS,
  SET_MERCHANT_PROFILE,
  SET_USER,
} from './type';
import { authHeader, getData } from '../auth-header';
import { getAuthUser } from './auth.actions';

const varEnv = constants.varEnv;

export const updateUserById = (id, data) => dispatch => {
  return axios
    .put(`${varEnv.apiUrl}/users/${id}`, data)
    .then(res => {
      dispatch(getAuthUser());
      return res.data;
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
      return null;
    });
};


