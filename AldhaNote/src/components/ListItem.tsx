import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {windowWidth} from '../utils/dimensions.utils';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faPenToSquare,
  faTrashCan,
  faNoteSticky,
  faImage,
} from '@fortawesome/free-solid-svg-icons';

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

const styles = StyleSheet.create({
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
