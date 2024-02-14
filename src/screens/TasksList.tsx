import React, {useEffect, useState, useRef} from 'react';
import {FlatList, View, TextInput, StyleSheet, Task} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';
import {useGlobalSelector} from '../contexts/GlobalContext';
import {TaskView} from '../components/TaskView';
import {useGlobalActorRef} from '../contexts/GlobalContext';
import { colors, handleAlert } from '../utils'

export const TasksList = () => {
  const { t } = useTranslation();
  const inputRef = useRef<TextInput | null>(null);
  const [search, setSearch] = useState('');
  const [filterdList, setFilterdList] = useState<Task[]>();
  let {currentTasks} = useGlobalSelector(state => state.context);
  const {send} = useGlobalActorRef();

  const uncompletedTasks = currentTasks.filter(item => !item.completed);

  const handleItem = (item: any): void => {
    send({type: 'SHOW_EDITOR', task: item});
  };

  useEffect(() => {
    handleSearch(search);
  }, [search]);
  
  const handleSearch = (search: string) => {
    if (search.length === 0) {
      send({type: 'UPDATE_LIST', data: currentTasks });
    } else {
      const filterdList = uncompletedTasks.filter(it => it.title.toLowerCase().includes(search.toLowerCase()) && !it.completed)
      setFilterdList(filterdList as []);
    }
  };

  const handleCheckTask = (task: any): void => {
    handleAlert({
      title: t('confirmation'),
      description: t('askCheckTaskCompleted'),
      pressCancel: () => {},
      pressConfirm: () => {
        const itemIndex = currentTasks.findIndex(it => it.id === task.id);
        if (itemIndex > -1) {
          currentTasks[itemIndex].completed = true;
        }
        send({type: 'UPDATE_LIST', data: currentTasks});
        if (search.length >= 1) {
          setSearch('');
          setTimeout(() => {
            handleSearch(' ');
          }, 200);
        }
      }
    });
  };

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

