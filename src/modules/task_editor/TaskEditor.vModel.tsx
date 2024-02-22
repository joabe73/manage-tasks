import React, {useEffect, useState} from 'react';
import {useGlobalActorRef, useGlobalSelector} from '../../contexts/GlobalContext';
import {Task} from '../../models/Task';
import {TaskEditor} from './TaskEditor.view';

const TaskEditorViewModel = ({route, navigation}: any) => {
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
  const controllers = {
    currentTask,
    fieldError,
    handleCancel,
    handleEditTitle,
    handleEditDescription,
    handleSave
  };

  return <TaskEditor controllers={controllers} />;
};

export default TaskEditorViewModel;
