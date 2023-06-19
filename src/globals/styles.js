import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.white2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    flexGrow: 1,
  },

  container_2: {
    flex: 1,
    width: '100%',
    padding: SIZES.padding,
    backgroundColor: COLORS.white2,
    justifyContent: 'center',
    height: '100%',
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  workContainer: {
    paddingTop: SIZES.padding * 1,
    paddingBottom: SIZES.padding * 1,
    flexDirection: 'column',
    flex: 1,
  },
  workDayWrapper: {
    borderColor: COLORS.darkgray,
    borderWidth: 1,
    borderRadius: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // height: 0,
    padding: 3,
  },
  uploadContainer: {
    margin: SIZES.padding2 * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIdContainer: {
    margin: SIZES.padding2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SectionStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
    tintColor: COLORS.primary,
  },

  // MAIN
  button: {
    backgroundColor: COLORS.primary,
    padding: SIZES.padding,
    height: 40,
    width: 200,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    ...FONTS.h4,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  headerContainer: {
    // height: 40,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  serviceContainer: {
    width: '100%',
    marginTop: SIZES.padding * 1,
    paddingBottom: SIZES.padding * 2,
    flex: 1,
  },
  serviceHeader: {
    flexDirection: 'row',
    marginTop: SIZES.padding * 2,
  },
  serviceList: {
    flexDirection: 'row',
    marginTop: SIZES.padding * 2,
  },
  listItem: {
    marginTop: SIZES.padding * 2,
    flexDirection: 'row',
    // height: 50,
  },
  checkbox: {
    color: COLORS.primary,
    fontSize: 20,
  },
  checkboxWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: SIZES.padding, marginRight: SIZES.padding,
    // marginLeft: SIZES.padding, marginRight: SIZES.padding,
  },

  // Default Text Input Field
  textInput: {
    color: COLORS.black,
    fontSize: SIZES.h3,
    lineHeight: SIZES.h2,
  },

});
