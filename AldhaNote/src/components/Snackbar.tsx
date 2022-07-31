import React, { useEffect, useRef } from 'react';

import { Animated, StyleSheet, Text, View } from 'react-native';

// const getRandomMessage = () => {
//     const number = Math.trunc(Math.random() * 10000);
//     return 'Random message ' + number;
// };


const Message = (props) => {
    const opacity = useRef(new Animated.Value(0))
      .current;

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
        }}
      >
        <Text>{props.message}</Text>
      </Animated.View>
    );
};

const Snackbar = ({messages, setMessages}) => {
    return (
        <View
          style={styles.snackbar}
        >
          {messages.map((message) => (
            <Message
              key={message}
              message={message}
              onHide={() => {
                setMessages((messages) =>
                  messages.filter(
                    (currentMessage) =>
                      currentMessage !== message
                  )
                );
              }}
            />
          ))}
        </View>
    );
};

const styles = StyleSheet.create({
    snackbar: {
        position: 'absolute',
        top: 45,
        left: 0,
        right: 0,
        zIndex:10,
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


export default Snackbar;
