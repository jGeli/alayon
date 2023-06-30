import {
  CLEAR_ERROR,
  CLOSE_ALLOW_LOCATION_MODAL,
  CLOSE_MODALS,
  OPEN_ADDONS_MODAL,
  OPEN_ADD_CLOTHTYPE_MODAL,
  OPEN_BASKET_MODAL,
  OPEN_CUSTOMER_ADDONS_MODAL,
  OPEN_PRICING_MODAL,
  OPEN_SERVICE_PRICING_MODAL,
  SET_ALLOW_LOCATION_MODAL,
  SET_ERROR,
  SET_LOADING,
  STOP_LOADING,
} from '../actions/type';

const initialState = {
  loading: true,
  errors: {},
  addClothTypeModal: false,
  pricingModal: null,
  servicesModal: null,
  customerAddOns: false,
  basketModal: null,
  servicePricingModal: false,
  allowLocation: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };

    case SET_ERROR:
      return {
        ...state,
        errors: action.payload,
      };

    case SET_ALLOW_LOCATION_MODAL:
      return {
        ...state,
        allowLocation: true,
      };

    case CLOSE_ALLOW_LOCATION_MODAL:
      return {
        ...state,
        allowLocation: false,
      };

    case OPEN_ADD_CLOTHTYPE_MODAL:
      return {
        ...state,
        addClothTypeModal: true,
      };

    case OPEN_BASKET_MODAL:
      return {
        ...state,
        basketModal: action.payload,
      };

    case OPEN_PRICING_MODAL:
      return {
        ...state,
        pricingModal: action.payload,
      };

    case OPEN_SERVICE_PRICING_MODAL:
      return {
        ...state,
        servicePricingModal: action.payload,
      };

    case OPEN_ADDONS_MODAL:
      return {
        ...state,
        servicesModal: action.payload,
      };

    case OPEN_CUSTOMER_ADDONS_MODAL:
      return {
        ...state,
        customerAddOns: true,
      };

    case CLOSE_MODALS:
      return {
        ...state,
        addClothTypeModal: false,
        pricingModal: null,
        servicesModal: null,
        customerAddOns: false,
        basketModal: null,
        servicePricingModal: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        errors: {},
      };
    default:
      return state;
  }
};
