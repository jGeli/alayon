import { selectedShop } from '../../globals/data';
import {
  CLEAR_CUSTOMER_BASKET,
  CLEAR_CUSTOMER_DATA,
  CLEAR_CUSTOMER_ORDER,
  CLEAR_SELECTED_SHOP,
  SET_CUSTOMER_BASKET,
  SET_CUSTOMER_DATA,
  SET_CUSTOMER_ORDER,
  SET_SELECTED_SHOP,
  SET_USER,
} from '../actions/type';

const initialOrder = {
  qty: 1,
  totalServices: 0,
  totalAddons: 0,
  pricing: 'Piece',
  service: null,
  shop: null,
  cloths: [],
  addons: [],
  hasAddons: false,
};

const initialState = {
  shop: {
    services: [],
    addons: [],
  },
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
    totalServices: 0,
    totalAddons: 0,
    pricing: 'Piece',
    service: null,
    shop: null,
    cloths: [],
    addons: [],
    hasAddons: false,
  },
  basket: {
    orders: [],
    pickupAddress: null,
    returnLocation: null
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
          pickupAddress: null,
          returnLocation: null
        },
      }
    case SET_CUSTOMER_BASKET:
      return {
        ...state,
        basket: { ...state.basket, ...action.payload },
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
    case SET_SELECTED_SHOP:
      return {
        ...state,
        shop: action.payload,
      };
    case CLEAR_SELECTED_SHOP:
      return {
        ...state,
        shop: {},
      };
    default:
      return state;
  }
};
