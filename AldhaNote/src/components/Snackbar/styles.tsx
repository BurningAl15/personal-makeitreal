import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  snackbar: {
    position: 'absolute',
    top: 45,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  animated: {
    margin: 10,
    marginBottom: 5,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6,
  },
  backgroundStyle: {},
  button: {
    marginBottom: 16,
  },
});
