import { selectedShop } from '../../globals/data';
import {
  CLEAR_CUSTOMER_BASKET,
  CLEAR_CUSTOMER_BASKETS,
  CLEAR_CUSTOMER_DATA,
  CLEAR_CUSTOMER_ORDER,
  SET_CUSTOMER_BASKET,
  SET_CUSTOMER_BASKETS,
  SET_CUSTOMER_DATA,
  SET_CUSTOMER_ORDER,
  SET_USER,
} from '../actions/type';

const initialOrder = {
  qty: 1,
  totalService: 0,
  totalAddons: 0,
  pricing: 'Piece',
  service: null,
  shop: null,
  cloths: [],
  addons: [],
  hasAddons: false,
};

const initialState = {
  customer: {
    name: null,
    imgUrl: null,
    locations: [],
    shop: {
      services: [],
      addons: [],
    },
  },
  order: {
    qty: 1,
    totalService: 0,
    totalAddons: 0,
    pricing: 'Piece',
    service: null,
    shop: null,
    cloths: [],
    addons: [],
    hasAddons: false,
    deliveryOption: null
  },
  baskets: [],
  basket: {
    orders: [],
    pickupDelivery: null,
    returnDelivery: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CUSTOMER_DATA:
      return {
        ...state,
        customer: { ...state.customer, ...action.payload },
      };

    case CLEAR_CUSTOMER_DATA:
      return {
        ...state,
        customer: {
          name: null,
          imgUrl: null,
          locations: [],

        },
      }
    case CLEAR_CUSTOMER_BASKET:
      return {
        ...state,
        basket: {
          orders: [],
          pickupDelivery: null,
          returnDelivery: null
        },
      }
    case SET_CUSTOMER_BASKET:
      return {
        ...state,
        basket: { ...state.basket, ...action.payload },
      };


    case CLEAR_CUSTOMER_BASKETS:
      return {
        ...state,
        baskets: [],
      }
    case SET_CUSTOMER_BASKETS:
      return {
        ...state,
        baskets: action.payload,
      };
    case SET_CUSTOMER_ORDER:
      return {
        ...state,
        order: { ...state.order, ...action.payload },
      };
    case CLEAR_CUSTOMER_ORDER:
      return {
        ...state,
        order: {
          ...initialOrder,
          cloths: [],
          addons: state.order.addons,
          service: state.shop.services[0].service,
          hasAddons: state.order.addons.length !== 0,
        },
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
