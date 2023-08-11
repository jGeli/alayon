import axios from 'axios';
import { constants } from '../../constants';
import {
  CLEAR_CUSTOMER_BASKETS,
  SET_CUSTOMER_BASKET,
  SET_CUSTOMER_BASKETS,
  SET_CUSTOMER_DATA,
  SET_ERROR,
} from './type';
import { removeData } from '../../utils/AsyncStorage';

const varEnv = constants.varEnv;

export const getCustomerData = navigation => dispatch => {
  return axios
    .get(`${varEnv.apiUrl}/customers`)
    .then(res => {
      let { baskets } = res.data;
      if (baskets.length !== 0) {
        dispatch({ type: SET_CUSTOMER_BASKETS, payload: baskets });
      }
      dispatch({ type: SET_CUSTOMER_DATA, payload: res.data });
      removeData('baskets');
      // navigation && navigation.navigate(screen, {});

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

export const createOrder = data => dispatch => {
  return axios
    .post(`${varEnv.apiUrl}/customers/orders`, data)
    .then(res => {
      // return dispatch(getCustomerShopBaskets(shop._id));
      dispatch(getCustomerData());
      return res.data
    })
    .catch(err => {
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
      return null;
    });
};

export const getOrders = id => dispatch => {
  return axios
    .get(`${varEnv.apiUrl}/customers/orders`)
    .then(res => {
      // return dispatch(getCustomerShopBaskets(shop._id));
      // dispatch(getCustomerData());
      return res.data
    })
    .catch(err => {
      console.log(err.response, 'res error')
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
      return null;
    });
};


export const getOrderById = id => dispatch => {
  console.log(`${varEnv.apiUrl}/customers/orders/${id}`)
  return axios
    .get(`${varEnv.apiUrl}/customers/orders/${id}`)
    .then(res => {
      // return dispatch(getCustomerShopBaskets(shop._id));
      // dispatch(getOrders());
      return res.data
    })
    .catch(err => {
      console.log(err.response, 'res error')
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
      return dispatch(getCustomerShopBaskets(shop._id));
    })
    .catch(err => {
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
      return null;
    });
};

export const createBulkBasket = data => dispatch => {
  return axios
    .post(`${varEnv.apiUrl}/customers/baskets/bulk`, data)
    .then(res => {
      dispatch(getCustomerData())
      return res.data;
    })
    .catch(err => {
      console.log(err.response)
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
  dispatch({ type: CLEAR_CUSTOMER_BASKETS });
  return axios
    .get(`${varEnv.apiUrl}/customers/shops/baskets/${id}`)
    .then(res => {
      dispatch({ type: SET_CUSTOMER_BASKETS, payload: res.data });
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


export const getCustomerBaskets = () => dispatch => {
  return axios
    .get(`${varEnv.apiUrl}/customers/baskets`)
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

export const getConversation = id => dispatch => {

  return axios.get(`${varEnv.apiUrl}/chats/${id}`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log('ERR ORDERS', err)
      return null;
    });
};


export const getChatLists = id => dispatch => {
  return axios.get(`${varEnv.apiUrl}/chats`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log('ERR ORDERS', err.response)
      return null;
    });
};


export const createChat = (id, data) => dispatch => {
  return axios.post(`${varEnv.apiUrl}/chats/${id}`, data)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log('ERR ORDERS', err)
      return null;
    });
};


export const createShopReview = (id, data) => dispatch => {
  return axios.post(`${varEnv.apiUrl}/customers/reviews/${id}`, data)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err, 'RES ERROR')
      return null;
    });
};

export const getShopReviews = (id) => dispatch => {
  return axios.get(`${varEnv.apiUrl}/customers/reviews/${id}`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err, 'RES ERROR')
      return [];
    });
};

export const sendLikeReact = (data) => dispatch => {
  return axios.post(`${varEnv.apiUrl}/customers/reviews/like`, data)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err, 'RES ERROR')
      return null;
    });
};