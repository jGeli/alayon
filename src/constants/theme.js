import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  // base colors
  primary: '#1699F2', // orange
  primaryTransparent: '#1699f280',
  transparentBlue: 'rgb(240,248,255)',
  primaryDisabled: '#1699f280',
  primaryColor: '#1E90FF',
  secondary: '#003580', // gray
  warning: '#ffe79a',
  danger: '#ffa952',
  // colors
  black: '#1E1F20',
  white: '#FFFFFF',
  white3: '#FCFCFF',

  gold: '#FFD700',

  lightOrange: '#FFA133',

  lightOrange2: '#FDDED4',
  lightOrange3: '#FFD9AD',
  lightGray: '#F5F5F6',
  lightGray2: '#F6F6F7',
  textButton: '#FFFAFA',
  lightGray3: '#EFEFF1',
  lightGray4: '#F8F8F9',
  lightGray1: '#EFEFEF',

  transparent: 'transparent',
  darkGray: '#898C95',
  darkGray2: '#757D85',

  green: '#27AE60',
  red: '#FF1717',
  redTransparent: '#FF171780',
  blue: '#0064C0',
  lightBlue: '#F2F6FA',
  darkBlue: '#111A2C',
  gray: '#898B9A',
  gray2: '#BBBDC1',
  gray3: '#CFD0D7',
  white2: '#FBFBFB',

  transparent: 'transparent',
  transparentBlack1: 'rgba(0, 0, 0, 0.2)',
  transparentBlack7: 'rgba(0, 0, 0, 0.7)',
};

export const SIZES = {
  // global sizes
  base: 8,
  title: 20,
  font: 14,
  radius: 30,
  radius2: 12,
  semiRadius: 10,
  padding: 10,
  padding2: 12,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {
    fontFamily: 'Roboto-regular',
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: {
    fontFamily: 'Roboto-Black',
    fontSize: SIZES.h1,
    lineHeight: 36,
    color: COLORS.darkGray,
  },
  h2: {
    fontFamily: 'Roboto-Bold',
    fontSize: SIZES.h2,
    lineHeight: 30,
    color: COLORS.darkGray,
  },
  h3: {
    fontFamily: 'Roboto-Bold',
    fontSize: SIZES.h3,
    lineHeight: 22,
    color: COLORS.darkGray,
  },
  h4: {
    fontFamily: 'Roboto-Bold',
    fontSize: SIZES.h4,
    lineHeight: 22,
    color: COLORS.darkGray,
  },
  body1: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body1,
    lineHeight: 36,
    color: COLORS.darkGray,
  },
  body2: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body2,
    lineHeight: 30,
    color: COLORS.darkGray,
  },
  body3: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body3,
    lineHeight: 22,
    color: COLORS.darkGray,
  },
  body4: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body4,
    lineHeight: 22,
    color: COLORS.darkGray,
  },
  body5: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body5,
    lineHeight: 22,
    color: COLORS.darkGray,
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
