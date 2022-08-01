import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  view: {
    position: 'relative',
  },
  fullScreen: {
    width: '90%',
    margin: 'auto',
  },
  input: {
    marginBottom: 40,
  },
  error: {
    position: 'absolute',
    color: 'red',
    bottom: 10,
    textAlign: 'center',
    fontSize: 10,
    marginLeft: 10,
  },
  message: {
    position: 'absolute',
    color: 'black',
    bottom: 10,
    textAlign: 'center',
    fontSize: 10,
    marginLeft: 10,
  },
});
