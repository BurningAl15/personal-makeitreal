import React, {useRef} from 'react';
import {
  SafeAreaView,
  Image,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {width, height, onBoardingStyles, COLORS} from '../styles';
import {homeRoute} from '../../utils/route.utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const slides = [
  {
    id: '1',
    image: require('../../images/onboarding/onboard1.png'),
    title: 'Welcome!',
    subtitle:
      'Take a quick tour to learn more about what you can achieve with AldhaNote',
  },
  {
    id: '2',
    image: require('../../images/onboarding/onboard2.png'),
    title: 'Achieve Your Goals',
    subtitle: 'Create different notes as images, text and lists',
  },
  {
    id: '3',
    image: require('../../images/onboarding/onboard3.png'),
    title: 'Increase Your Value',
    subtitle: 'List your notes by filtering them by category',
  },
];

const Slide = ({item}) => {
  return (
    <View style={onBoardingStyles.slideContainer}>
      <Image source={item?.image} style={onBoardingStyles.slideImage} />
      <View>
        <Text style={onBoardingStyles.title}>{item?.title}</Text>
        <Text style={onBoardingStyles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const OnboardingScreen = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = useRef();

  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  const onPress = async () => {
    navigation.replace(homeRoute);
    const onBoardingToken = JSON.stringify({isActive: true});
    await AsyncStorage.setItem('@onBoarding', onBoardingToken);
  };

  const Footer = () => {
    return (
      <View style={onBoardingStyles.footerContainer}>
        {/* Indicator container */}
        <View style={onBoardingStyles.footerIndicatorContainer}>
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                onBoardingStyles.indicator,
                currentSlideIndex === index && onBoardingStyles.indicatorActive,
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={onBoardingStyles.footerRenderContainer}>
          {currentSlideIndex === slides.length - 1 ? (
            <View style={{height: 50}}>
              <TouchableOpacity
                style={onBoardingStyles.btn}
                onPress={async () => {
                  await onPress();
                }}>
                <Text style={{fontWeight: 'bold', fontSize: 15}}>
                  GET STARTED
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[onBoardingStyles.btn, onBoardingStyles.skipBtn]}
                onPress={skip}>
                <Text style={onBoardingStyles.skipBtnTxt}>SKIP</Text>
              </TouchableOpacity>
              <View style={{width: 15}} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={onBoardingStyles.btn}>
                <Text style={onBoardingStyles.nextBtnTxt}>NEXT</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={onBoardingStyles.safeArea}>
      <StatusBar backgroundColor={COLORS.primary} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{height: height * 0.75}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

export default OnboardingScreen;
