import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import { useTranslation } from 'react-i18next';

import ButtonView from '../../components/ButtonView';
import {colors} from '../../utils';

export const TaskEditor = ({controllers}: any) => {
  const { t } = useTranslation();
  const { 
    currentTask,
    fieldError,
    handleCancel,
    handleEditTitle,
    handleEditDescription,
    handleSave
  } = controllers;
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={t('title')}
        value={currentTask?.title}
        maxLength={40}
        onChangeText={handleEditTitle}
      />
      {fieldError && <Text style={styles.textError}>You can't save without a title.</Text>}
      <View style={styles.description}>
        <TextInput
          style={[styles.textInput, styles.description]}
          multiline
          placeholder={t('description')}
          value={currentTask?.description ?? ''}
          onChangeText={handleEditDescription}
        />
      </View>
      <View>
        <ButtonView mgBottom={10} label={t('save')}  press={handleSave} />
        <ButtonView bgColor={colors.blue002} label={t('cancel')} press={handleCancel} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: 15,
    height: '75%',
    padding: 4,
  },
  textError: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.red001
  },
  textInput: {
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: colors.blue001,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    padding: 2,
  },
  description: {
    flex: 2,
  },
});
