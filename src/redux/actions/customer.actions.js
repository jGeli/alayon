import axios from 'axios';
import { constants } from '../../constants';
import {
  CLEAR_CUSTOMER_BASKETS,
  SET_CUSTOMER_BASKET,
  SET_CUSTOMER_BASKETS,
  SET_CUSTOMER_DATA,
  SET_ERROR,
  SET_LOADING,
  STOP_LOADING,
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
      console.log(res.data, "RES INE GET CUSTOMER SHOPID")
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
      console.log('RESS ORDER', res.data)
      // return dispatch(getCust omerShopBaskets(shop._id));
      dispatch(getCustomerData());
      return res.data
    })
    .catch(err => {
      console.log('RESS ERROR', err.response)
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
      return null;
    });
};

export const getOrders = () => dispatch => {
  return axios
    .get(`${varEnv.apiUrl}/customers/orders`)
    .then(res => {
      // return dispatch(getCustomerShopBaskets(shop._id));
      dispatch(getCustomerData());
      return res.data
    })
    .catch(err => {
      console.log(err.response, 'res error get orders')
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
      return null;
    });
};

export const cancelOrder = data => dispatch => {
  console.log(data, "DATA NATAWAWASS")

  let { cancelReason, _id} = data
  // const {cancelReason, id} = data;
  console.log(cancelReason, _id, "CANCEL ORDER IN ACTIONS")
  return axios
    .put(`${varEnv.apiUrl}/customer/orders/${_id}`, cancelReason)
    .then(res => {
      console.log(res, "Success Cancel")
      return res.data
    })
    .catch(err => {
      console.log(err.response, 'ERR IN CANCEL')
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    })
}

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
      console.log(err.response, 'res error get order by Id')
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
  // let {otherUser} = data;
  // console.log(otherUser, "ID SA GET CONVO")

  return axios.get(`${varEnv.apiUrl}/chats/view/${id}`)
    .then(res => {
      console.log(res, "CONSOLE INE NI CONVO!!!")
      return res.data
    })
    .catch(err => {
      console.log('ERR ERROR VIEW MESSAGE DPOTA', err)
      return null;
    });
};


export const getChatLists = id => dispatch => {
  return axios.get(`${varEnv.apiUrl}/chats`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      // console.log('ERR ORDERS', err.response)
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
      console.log(err, 'RES ERROR in create review')
      return null;
    });
};

export const getShopReviews = (id) => dispatch => {
  return axios.get(`${varEnv.apiUrl}/customers/reviews/${id}`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err, 'RES ERROR in get review')
      return [];
    });
};

export const sendLikeReact = (data) => dispatch => {
  return axios.post(`${varEnv.apiUrl}/customers/reviews/like`, data)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err, 'RES ERROR in send like react')
      return null;
    });
};

export const receiveOrder = (id) => dispatch => {
  console.log(id, "ID HA AXIOS")
  dispatch({ type: SET_LOADING })

  return axios.get(`${varEnv.apiUrl}/customers/complete/${id}`)
    .then(res => {
      console.log(res.data, 'RESSS DATA')
      dispatch({ type: STOP_LOADING })
      return res.data
    })
    .catch(err => {
      console.log(err, 'ERRORRR')
      dispatch({ type: STOP_LOADING })
      console.log('ERR ACCEPTING ORDER', err.response)
      return null;
    });
};


export const markReviewed = (id) => dispatch => {
  console.log(id, "ID HA AXIOS")
  dispatch({ type: SET_LOADING })

  return axios.get(`${varEnv.apiUrl}/customers/completeReview/${id}`)
    .then(res => {
      console.log(res.data, 'RESSS DATA')
      dispatch({ type: STOP_LOADING })
      return res.data
    })
    .catch(err => {
      console.log(err, 'ERRORRR')
      dispatch({ type: STOP_LOADING })
      console.log('ERR ACCEPTING ORDER', err.response)
      return null;
    });
};

export const getCurrentRiderLocation = (id) => dispatch => {
  // console.log(id, "ID HA AXIOS")
  // dispatch({ type: SET_LOADING })

  return axios.get(`${varEnv.apiUrl}/customers/riderLocation/${id}`)
    .then(res => {
      console.log(res.data, 'RESSS Rider Location')
      // dispatch({ type: STOP_LOADING })
      return res.data
    })
    .catch(err => {
      console.log(err, 'ERRORRR')
      // dispatch({ type: STOP_LOADING })
      console.log('ERR ACCEPTING ORDER', err.response)
      return null;
    });
};

export const getRecentSearches = () => dispatch => {
  // console.log(id, "ID HA AXIOS")
  // dispatch({ type: SET_LOADING })

  return axios.get(`${varEnv.apiUrl}/customers/recentSearches`)
    .then(res => {
      // dispatch({ type: STOP_LOADING })
      return res.data
    })
    .catch(err => {
      console.log('ERR ACCEPTING ORDER', err.response)
      return null;
    });
};

export const addSearches = (shopId) => dispatch => {
  // console.log(id, "ID HA AXIOS")
  // dispatch({ type: SET_LOADING })

  return axios.post(`${varEnv.apiUrl}/customers/recentSearches/${shopId}`)
    .then(res => {
      // dispatch({ type: STOP_LOADING })
      return res.data
    })
    .catch(err => {
      console.log('ERR ACCEPTING ORDER', err.response)
      return null;
    });
};