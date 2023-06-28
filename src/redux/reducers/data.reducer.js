import { selectedShop } from '../../globals/data';
import {
  CLEAR_MAP_LOCATION,
  CLEAR_SELECTED_SHOP,
  SET_ERROR,
  SET_LAUNDRY_CLOTH,
  SET_LAUNDRY_SERVICES,
  SET_LAUNDRY_SHOPS,
  SET_MAP_LOCATION,
  SET_SELECTED_LAUNDRY_SERVICE,
  SET_SELECTED_SHOP,
  SET_USER,
} from '../actions/type';

const initialState = {
  shops: [],
  services: [],
  cloths: [],
  location: {
    lat: 0,
    lng: 0,
    address: '',
  },
  selectedShop: {},
  selectedService: {
    services: [],
    addons: [],
  },
  error: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case SET_SELECTED_SHOP:
      return {
        ...state,
        selectedShop: { ...state.selectedShop, ...action.payload },
      };
    case CLEAR_SELECTED_SHOP:
      return {
        ...state,
        selectedShop: {
          services: [],
          addons: [],
        },
      };



    case SET_MAP_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case SET_LAUNDRY_SHOPS:
      return {
        ...state,
        shops: action.payload,
      };
    case SET_LAUNDRY_SERVICES:
      return {
        ...state,
        services: action.payload,
      };

    case SET_SELECTED_LAUNDRY_SERVICE:
      return {
        ...state,
        selectedService: action.payload,
      };

    case SET_LAUNDRY_CLOTH:
      return {
        ...state,
        cloths: action.payload,
      };

    case CLEAR_MAP_LOCATION:
      return {
        ...state,
        location: {},
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
