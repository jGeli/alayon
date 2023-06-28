import axios from 'axios';
import { constants } from '../../constants';
import {
  SET_CUSTOMER_BASKETS,
  SET_CUSTOMER_DATA,
  SET_ERROR,
} from './type';

const varEnv = constants.varEnv;

export const getCustomerData = navigation => dispatch => {
  return axios
    .get(`${varEnv.apiUrl}/customers`)
    .then(res => {
      let { customer, screen } = res.data;
      dispatch({ type: SET_CUSTOMER_DATA, payload: res.data });
      navigation && navigation.navigate(screen, {});

    })
    .catch(err => {
      console.log("GETTING ERROR", err)
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
      return null;
    });
};

export const getCustomerShopById = id => dispatch => {
  return axios
    .get(`${varEnv.apiUrl}/alayon/shops/${id}`)
    .then(res => {

      return res.data;
    })
    .catch(err => {
      console.log("GETTING ERROR", err)
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
      return null;
    });
};

export const createBasket = data => dispatch => {
  let { shop } = data;
  return axios
    .post(`${varEnv.apiUrl}/customers/baskets`, data)
    .then(res => {
      console.log('CREATE BASKETS', res.data)
      dispatch(getCustomerShopBaskets(shop._id))
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

export const createLocation = data => dispatch => {
  return axios
    .post(`${varEnv.apiUrl}/customers/locations`, data)
    .then(res => {
      dispatch(getLocations())
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

export const updateLocation = data => dispatch => {
  return axios
    .post(`${varEnv.apiUrl}/customers/locations/${data._id}`, data)
    .then(res => {
      dispatch(getLocations())
    })
    .catch(err => {
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
      return null;
    });
};

export const deleteLocation = id => dispatch => {
  return axios
    .delete(`${varEnv.apiUrl}/customers/locations/${id}`)
    .then(res => {
      dispatch(getLocations())
      // return res.data;
    })
    .catch(err => {
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
      return null;
    });
};

export const getLocations = () => dispatch => {
  return axios
    .get(`${varEnv.apiUrl}/customers/locations`)
    .then(res => {
      dispatch({ type: SET_CUSTOMER_DATA, payload: { locations: res.data } })
    })
    .catch(err => {
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
      return null;
    });
};



export const getCustomerShopBaskets = (id) => dispatch => {
  return axios
    .get(`${varEnv.apiUrl}/customers/shops/baskets/${id}`)
    .then(res => {
      dispatch({ type: SET_CUSTOMER_BASKETS, payload: res.data })
    })
    .catch(err => {
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
      return null;
    });
};


export const getCustomerBaskets = () => dispatch => {
  return axios
    .get(`${varEnv.apiUrl}/customers/baskets`)
    .then(res => {
      console.log('GET BASKETS', res.data)
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
