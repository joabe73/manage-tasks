import React from 'react';
import {FlatList} from 'react-native';
import {useGlobalSelector} from '../contexts/GlobalContext';
import { useTranslation } from 'react-i18next';
import {TaskView} from '../components/TaskView';
import {useGlobalActorRef} from '../contexts/GlobalContext';
import { handleAlert } from '../utils'

export const History = () => {
  const { t } = useTranslation();
  const {send} = useGlobalActorRef();
  let currentTasks = useGlobalSelector(state => state.context.currentTasks);

  const completedTasks = currentTasks.filter(item => item.completed);

  const handleCheckTask = (task: any, remove?: boolean): void => {
    handleAlert({
      title: t('confirmation'), 
      description: `${remove ? t('askDeletTask') : t('askRemoveCompleted')}`,
      pressCancel: () => {},
      pressConfirm: () => {
        const itemIndex = currentTasks.findIndex(it => it.id === task.id);
          if (itemIndex > -1) {
            if (remove) {
              currentTasks.splice(itemIndex, 1);
            } else {
              currentTasks[itemIndex].completed = false;
            }
          }
          send({type: 'UPDATE_LIST', data: currentTasks});
      }
    });
  };

  return (
    <FlatList
      data={completedTasks}
      keyExtractor={item => item.id}
      renderItem={({item}) => 
        <TaskView 
          handleCheck={(task, remove) => handleCheckTask(task, remove)} 
          task={item} 
          />
        }
    />
  );
};