import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { colors } from '../utils';

interface ProfileViewType {
  image: string;
  name: string;
  nickname: string;
}

const ProfileView = ({image, name, nickname}: ProfileViewType) => {
  return (
    <View style={styles.wrapper}>
      <Image
        style={styles.img}
        resizeMethod='resize'
        borderRadius={40}
        source={{
          uri: image,
        }}
      />
      <View style={styles.profile}>
        <Text style={styles.txtName}>{name}</Text>
        <Text style={[styles.txtName, styles.txtNickname]}>{nickname}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 8,
    marginBottom: 8,
    backgroundColor: colors.white,
    elevation: 5,
    shadowColor: colors.blue001,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  profile: {
    marginLeft: 20
  },
  txtName: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.black
  },
  txtNickname: {
    fontSize: 14,
    color: colors.gray
  },
  img: {
    width: 80,
    height: 80
  }
});

export default ProfileView;

