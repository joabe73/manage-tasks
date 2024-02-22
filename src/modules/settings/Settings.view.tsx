import React from 'react';
import { useTranslation } from 'react-i18next';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {languages, colors, mockData} from '../../utils'
import ProfileView from '../../components/ProfileView';

export const Settings = ({ controllers }: any) => {
  const { t } = useTranslation();
  const { selected, handleChangeLanguage } = controllers;

  const handleLanguages = (selected: string) => {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.languageTitle}>{t('language')}</Text>
        {languages.map((lan, ix) => {
          return (
            <View key={ix}>
              <View style={styles.languageItem}>
                <Text style={styles.languageTxt}>{lan.name}</Text>
                <TouchableOpacity onPress={() => handleChangeLanguage(lan.code)}>
                  <Icon name={`${lan.code === selected ? 'check-circle' : 'circle-o'}`} color={colors.blue001} size={30} />
                </TouchableOpacity>
              </View>
              <View style={styles.line} />
            </View>
          )
        })}
      </View>
    );
  };

  return(
    <View>
      <ProfileView 
        image={mockData.image}
        name={mockData.name}
        nickname={mockData.nickname}
      />
      {handleLanguages(selected)}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    borderRadius: 8
  },
  line: {
    borderWidth: 0.5,
    borderColor: colors.gray001
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 8
  },
  languageTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black
  },
  languageTxt: {
    fontWeight: '500',
    color: colors.gray
  }
})
