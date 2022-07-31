import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faPenToSquare,
  faTrashCan,
  faNoteSticky,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import {windowWidth} from '../../utils/dimensions.utils';
import {styles} from './styles';

export default function ListItem({
  icon,
  title,
  subTitle,
  onPress_Open,
  onPress_Edit,
  onPress_Delete,
}) {
  const showIcon = (iconType: string) => {
    switch (iconType) {
      case 'note':
        return faNoteSticky;
      case 'image':
        return faImage;
      case 'delete':
        return faTrashCan;
      case 'edit':
      default:
        return faPenToSquare;
    }
  };

  return (
    <View style={styles.listItem}>
      <TouchableOpacity onPress={onPress_Open} style={styles.listView}>
        <FontAwesomeIcon
          icon={showIcon(icon)}
          style={styles.listIcon}
          size={25}
        />
        <View style={{width: windowWidth - 220}}>
          <Text numberOfLines={1} style={styles.listTitle}>
            {title}
          </Text>
          <Text style={styles.listSubTitle}>{subTitle}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPress_Edit} style={styles.touchable}>
        <FontAwesomeIcon icon={showIcon('edit')} size={20} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress_Delete} style={styles.touchable}>
        <FontAwesomeIcon icon={showIcon('delete')} size={20} />
      </TouchableOpacity>
    </View>
  );
}
