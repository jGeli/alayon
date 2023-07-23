import axios from 'axios';
import { constants } from '../../constants';
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
      return null;
    });
};


