import {StyleSheet} from 'react-native';
import {windowWidth} from '../../utils/dimensions.utils';

export const styles = StyleSheet.create({
  listIcon: {
    marginRight: 15,
  },
  listItem: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: windowWidth - 30,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#171717',
    elevation: 10,
  },
  listView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  listSubTitle: {
    color: '#333',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
  },
  listTitle: {
    color: '#333',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  touchable: {
    width: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
  },
});
