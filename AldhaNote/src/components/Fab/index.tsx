import React from 'react';
import {Pressable} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {styles} from './styles';

const Fab = ({icon, onPress, isBottom = true, iconColor = 'black'}) => {
  const style = isBottom
    ? {...styles.fab, ...styles.bottom}
    : {...styles.fab, ...styles.top};
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => ({
        opacity: pressed ? 0.5 : 1,
        ...style,
      })}>
      <FontAwesomeIcon size={25} icon={icon} color={iconColor} />
    </Pressable>
  );
};

export default Fab;
