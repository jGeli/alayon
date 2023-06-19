import { CLEAR_USER, SET_AUTHENTICATED, SET_TOKEN, SET_UNAUTHENTICATED, SET_USER, SET_USERTYPE } from '../actions/type';

const initialState = {
  isAuthenticated: false,
  user: {
    locations: []
  },
  userType: 'customer',
  token: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false,
      };
    case SET_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    case CLEAR_USER:
      return {
        isAuthenticated: false,
        user: {
          locations: []
        },
        userType: null,
        token: null,
      };

    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    case SET_USERTYPE:
      return {
        ...state,
        userType: action.payload,
      };
    default:
      return state;
  }
};
