import React, {useEffect, useState, useRef} from 'react';
import {TextInput} from 'react-native';
import {TasksList} from './TasksList.view'
import { useTranslation } from 'react-i18next';
import {useGlobalSelector} from '../../contexts/GlobalContext';
import {useGlobalActorRef} from '../../contexts/GlobalContext';
import { handleAlert } from '../../utils'
import { Task } from '../../models/Task';

const TasksListViewModel = () => {
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

  const controllers = {
    inputRef,
    search, 
    filterdList, 
    uncompletedTasks,
    setSearch, 
    handleItem,
    handleCheckTask
  };

  return <TasksList controllers={controllers} />
};

export default TasksListViewModel;
