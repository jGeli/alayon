import { isBetween8AMand10PM } from '../../utils/helpers';
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
import momentTimezone from 'moment-timezone';
import moment from 'moment';


const initialOrder = {
  qty: 1,
  totalService: 0,
  totalAddons: 0,
  pricing: 'Piece',
  cloths: [],
  addons: [],
  hasAddons: false,
  hasTip: false,
  note: '',
  deliveryOption: 1,
  tip: 0,
  pickupDate: !isBetween8AMand10PM(new Date()) ? moment().add(1, 'day') : momentTimezone().tz('Asia/Manila'),
  deliveryDate: momentTimezone().tz('Asia/Manila')
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
    hasTip: false,
    tip: 0,
    note: '',
    deliveryOption: 1,
    pickupDate: isBetween8AMand10PM(new Date()) ? moment().tz('Asia/Manila').add('day', 1) : moment().tz('Asia/Manila'),
    deliveryDate: moment().tz('Asia/Manila')
  },
  baskets: [],
  basket: {
    orders: [],
    pickupDelivery: null,
    returnDelivery: null,
    shop: {
      services: []
    }
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
          ...state.order,
          ...initialOrder,
          cloths: []
          // addons: state.order.addons,
          // service: state.shop.services[0].service,
          // hasAddons: state.order.addons.length !== 0,
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
