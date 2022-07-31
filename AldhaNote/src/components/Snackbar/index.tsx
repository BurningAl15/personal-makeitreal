import React, {useEffect, useRef} from 'react';

import {Animated, Text, View} from 'react-native';
import {styles} from './styles';

const Message = props => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      props.onHide();
    });
  }, []);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          },
        ],
        ...styles.animated,
      }}>
      <Text>{props.message}</Text>
    </Animated.View>
  );
};

const Snackbar = ({messages, setMessages}) => {
  return (
    <View style={styles.snackbar}>
      {messages.map(message => (
        <Message
          key={message}
          message={message}
          onHide={() => {
            setMessages(messages =>
              messages.filter(currentMessage => currentMessage !== message),
            );
          }}
        />
      ))}
    </View>
  );
};

export default Snackbar;
