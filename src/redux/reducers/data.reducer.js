import { selectedShop } from '../../globals/data';
import {
  CLEAR_CHAT_LISTS,
  CLEAR_CONVERSATION,
  CLEAR_MAP_LOCATION,
  SET_CHAT_LISTS,
  SET_CONVERSATION,
  CLEAR_SELECTED_SHOP,
  SET_ALLOW_LOCATION,
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
  chats: [],
  conversation: [],
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
  isLocationAllow: false,
  error: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CHAT_LISTS:
      return {
        ...state,
        chats: action.payload
      };
    case SET_CONVERSATION:
      return {
        ...state,
        conversation: action.payload
      };


    case CLEAR_CONVERSATION:
      return {
        ...state,
        conversation: []
      };
    case CLEAR_CHAT_LISTS:
      return {
        ...state,
        chats: []
      };
    
    case SET_ALLOW_LOCATION:
      return {
        ...state,
        isLocationAllow: action.payload,
      };
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
