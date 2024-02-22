import React from 'react';
import {FlatList} from 'react-native';
import {TaskView} from '../../components/TaskView';

export const History = ({controllers}: any) => {
  const {completedTasks, handleCheckTask} = controllers;

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