import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {FAB} from 'react-native-paper';
import {loginRoute} from '../utils/route.utils';

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
  },
  fab: {
    // position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

const Counter = ({navigation}) => {
  const [count, setCount] = useState<number>(0);

  return (
    <View>
      <View style={styles.view}>
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => setCount(count + 1)}
        />
        <Text>{count}</Text>
        <FAB
          style={styles.fab}
          small
          icon="minus"
          onPress={() => setCount(count - 1)}
        />
      </View>
      <Button
        onPress={() => navigation.navigate(loginRoute)}
        title="Go back home"
      />
    </View>
  );
};

export default Counter;
