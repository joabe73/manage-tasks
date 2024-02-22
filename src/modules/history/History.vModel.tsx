import React from 'react';
import { useTranslation } from 'react-i18next';

import {useGlobalSelector} from '../../contexts/GlobalContext';
import {useGlobalActorRef} from '../../contexts/GlobalContext';
import { handleAlert } from '../../utils';
import { History } from './History.view';

const HistoryEditorModel = () => {
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

  const controllers = {
    completedTasks, 
    handleCheckTask
  };

  return <History controllers={controllers} />;
};

export default HistoryEditorModel;
