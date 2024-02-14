import React, {useEffect, useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import { useTranslation } from 'react-i18next';
import {useGlobalActorRef, useGlobalSelector} from '../contexts/GlobalContext';
import {Task} from '../models/Task';
import ButtonView from '../components/ButtonView';
import {colors} from '../utils'

export const TaskEditor = ({route, navigation}: any) => {
  const { t } = useTranslation();
  const payload = route.params;
  const id = payload?.task?.id || undefined
  const {send} = useGlobalActorRef();
  let {currentTask} = useGlobalSelector(state => state.context);
  const [fieldError, setFieldError] = useState(false);

  useEffect(() => {
    teste()
    if (currentTask) {
      if (currentTask?.title !== undefined) {
        if (currentTask.title.length > 1) {
          setFieldError(false);
        }
      };
    };
  }, [currentTask]);

  const handleEditTitle = (text: string) =>
  send({type: 'EDIT', data: {title: text}});
  const handleEditDescription = (text: string) =>
  send({type: 'EDIT', data: {description: text}});

  const handleValidateFields = (): boolean => {
    if (
        currentTask === undefined ||
        currentTask.title === undefined ||
        currentTask.title === ''
      )
      return true;
    return false;
  };
  
  const handleSave = () => {
    try {
      if (handleValidateFields())
        return setFieldError(true);

      if (id) {
        send({type: 'SAVE', update: true, taskID: id});
        return;
      };
  
      const randomId = Math.floor(Math.random() * 90000);
      send({type: 'SAVE', taskID: `${randomId}`});
    } catch (error) {
      // handle error
    } finally {
      if (!handleValidateFields())
        navigation.goBack();
    };
  };

  const teste = () => {
    if (!currentTask && id) {
      currentTask = payload.task as Task;
      handleEditTitle(currentTask?.title);
      handleEditDescription(currentTask?.description as string);
    }
  }

  const handleCancel = () => {
    send({type: 'RESET_SELECTED'});
    send({type: 'CANCEL'});
  };

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
