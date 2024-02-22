import React from 'react';
import {FlatList, View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';

import {TaskView} from '../../components/TaskView';
import { colors } from '../../utils';

export const TasksList = ({controllers}: any) => {
  const { t } = useTranslation();
  const {
    inputRef,
    search, 
    filterdList, 
    uncompletedTasks,
    setSearch, 
    handleItem,
    handleCheckTask
  } = controllers;

  return (
    <View>
      <View style={styles.inputArea}>
        <TextInput
          ref={inputRef}
          value={search}
          onChangeText={setSearch}
          style={styles.input} 
          placeholder={t('search')} />
        <Icon name={`search`} color={colors.blue001} size={20} />
      </View>
      <FlatList
        data={(filterdList as unknown as undefined) || uncompletedTasks}
        keyExtractor={item => item.id}
        renderItem={({item}) => 
          <TaskView 
            handleItem={() => handleItem(item)}
            handleCheck={(task) => handleCheckTask(task)}
            task={item} 
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputArea: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    flexDirection: 'row',
    marginHorizontal: 4,
    borderRadius: 6,
    marginBottom: 10,
    shadowColor: colors.blue001,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  input: {
    flex: 1,
    height: 30,
  }
});

