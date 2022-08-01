import {StyleSheet, Dimensions} from 'react-native';
export const COLORS = {primary: '#282534', white: '#fff'};
export const {width, height} = Dimensions.get('window');

export const loginStyles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export const profileStyles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  blankSpace: {
    marginBottom: 16,
  },
  screenPage: {
    textAlign: 'center',
    fontSize: 20,
  },
  bg: {
    flex: 1,
    position: 'relative',
    marginTop: 20,
  },
  title: {
    marginRight: 16,
    marginLeft: 16,
    fontSize: 16,
  },
  titleName: {
    fontWeight: 'bold',
    marginRight: 16,
    marginLeft: 16,
    fontSize: 30,
  },
  titleEmail: {
    marginRight: 16,
    marginLeft: 16,
    fontSize: 25,
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarProfile: {
    borderRadius: 50,
    width: 45,
    height: 45,
  },
  avatarContainerProfile: {
    borderRadius: 50,
    width: 50,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 2,
    padding: 2.5,
  },
  avatar: {
    borderRadius: 100,
    width: 145,
    height: 145,
  },
  avatarContainer: {
    borderRadius: 100,
    width: 150,
    height: 150,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 2,
    padding: 2.5,
    marginBottom: 20,
  },
  profile: {
    display: 'flex',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 10,
    minWidth: 150,
    minHeight: 150,
  },
  imageContainer: {
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 2,
    padding: 10,
  },
  button: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 20,
    width: '90%',
    marginHorizontal: 16,
    borderRadius: 10,
  },
  icon: {},
});

export const noteStyles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  blank: {
    flex: 1,
  },
  blankSpace: {
    marginBottom: 16,
  },
  screenPage: {
    textAlign: 'center',
    fontSize: 20,
  },
  view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  container: {
    alignItems: 'center',
    marginBottom: 10,
  },
  noteTile: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '90%',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  noteText: {
    fontSize: 20,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    marginRight: 16,
    marginLeft: 16,
    marginTop: 16,
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleName: {
    marginRight: 16,
    marginLeft: 16,
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  titleEmail: {
    marginRight: 16,
    marginLeft: 16,
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  bg: {
    flex: 1,
    position: 'relative',
    marginTop: 20,
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewHome: {
    alignItems: 'center',
  },
  scrollViewHorizontalHome: {
    alignItems: 'flex-start',
  },
  oldAvatar: {
    width: 200,
    height: 200,
  },
  avatar: {
    width: 300,
    height: 300,
  },
  avatarContainer: {
    borderRadius: 100,
    width: 150,
    height: 150,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: 20,
  },
  profile: {
    display: 'flex',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    marginLeft: 5,
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  unselected: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#A6A6A6',
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  selected: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#575757',
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  image: {
    borderRadius: 10,
    minWidth: 150,
    minHeight: 150,
  },
  imageContainer: {
    maxWidth: '80%',
    marginHorizontal: 20,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 2,
    padding: 10,
  },
});

export const onBoardingStyles = StyleSheet.create({
  subtitle: {
    color: COLORS.white,
    fontSize: 13,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  indicatorActive: {
    backgroundColor: COLORS.white,
    width: 25,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
    width: '100%',
  },
  slideContainer: {
    alignItems: 'center',
    width: width,
    marginTop: 10,
    justifyContent: 'center',
  },
  slideImage: {height: '50%', width, resizeMode: 'contain'},
  footerContainer: {
    height: height * 0.25,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  footerIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerRenderContainer: {marginBottom: 20},
  nextBtnTxt: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  skipBtn: {
    borderColor: COLORS.white,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  skipBtnTxt: {
    fontWeight: 'bold',
    fontSize: 15,
    color: COLORS.white,
  },
});
