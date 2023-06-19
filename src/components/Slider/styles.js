import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export default StyleSheet.create({
  root: {
    alignItems: 'stretch',
    padding: 4,
    flex: 1,
    // backgroundColor: '#555',
  },
  slider: {
  },
  button: {
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 5,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  valueText: {
    // width: 50,
    color: COLORS.primary,
    fontSize: 18,
  },
});