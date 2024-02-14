import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../utils';

interface ButtonViewType {
  press: () => void;
  label: string;
  mgBottom?: number;
  bgColor?: string;
}

const ButtonView = ({press, label, mgBottom, bgColor}: ButtonViewType) => {
  return (
    <TouchableOpacity 
      onPress={press}
      style={[
        styles.btn, 
        mgBottom ? { marginBottom: mgBottom } : { },
        bgColor ? { backgroundColor: bgColor } : { },
      ]}
    >
        <Text style={styles.txtBtn}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  txtBtn: {
    color: colors.white,
    fontWeight: '600'
  },
  btn: {
    borderRadius: 6,
    backgroundColor: colors.blue001,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 4
  }
});

export default ButtonView;
