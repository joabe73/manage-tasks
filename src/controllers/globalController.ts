import {InterpreterFrom, MachineOptions, assign, createMachine} from 'xstate';
import {NavigationProp} from '@react-navigation/native';
import {Task} from '../models/Task';
import {RootStackParamList} from '../navigation/Navigation';

export type GlobalService = InterpreterFrom<typeof globalController>;

type GlobalContext = {
  currentTasks: Task[];
  completedTasks: [Task];
  currentTask?: Task;
  selected?: Task;
  navigationController: NavigationProp<RootStackParamList>;
};

type GlobalEvents =
  | {type: 'SHOW_EDITOR'; task?: Task}
  | {type: 'SAVE'; update?: boolean; taskID: string}
  | {type: 'CANCEL'}
  | {type: 'UPDATE_LIST'; data: Task[]}
  | {type: 'RESET_SELECTED'}
  | {type: 'EDIT'; data: Partial<Task>};

const actions: MachineOptions<GlobalContext, GlobalEvents>['actions'] = {
  openTaskEditor: (ctx, _) =>
    ctx.navigationController.navigate('TaskEditor' as any, { ..._ }),
  editTask: assign((ctx, e) => {
    if (e.type !== 'EDIT') {
      return {};
    }
    const currentTask = {
      ...(ctx.currentTask ?? {}),
      ...e.data,
    } as Task;
    return {
      currentTask,
    };
  }),
  resetSelected: assign((ctx, e) => {
    if (e.type === 'RESET_SELECTED') {
      return {currentTask: undefined};
    }
    return {
      currentTask: undefined,
    };
  }),
  updateTaskList: assign((ctx, e) => {
    if (e.type !== 'UPDATE_LIST') {
      return {};
    }
    const updatedTasks = [...e.data];
    return {
      currentTasks: updatedTasks as Task[],
      currentTask: undefined,
    };
  }),
  saveNewTask: assign((ctx, e) => {
    if (e.type !== 'SAVE') {
      return {};
    }
    if (ctx.currentTask && e.update) {
      const itemIndex = ctx.currentTasks.findIndex(it => it.id === e.taskID);
      if (itemIndex > -1) {
        ctx.currentTasks[itemIndex].title = ctx.currentTask.title
        ctx.currentTasks[itemIndex].description = ctx.currentTask.description 
      }
      const updatedTasks = [...ctx.currentTasks];
      return {
        currentTasks: updatedTasks as Task[],
        currentTask: undefined,
      };
    }
    if (ctx.currentTask) {
      const newTask: Task = {
        id: e.taskID,
        title: ctx.currentTask.title,
        description: ctx.currentTask.description,
        completed: false,
      };
      const updatedTasks = [...ctx.currentTasks, newTask];
      return {
        currentTasks: updatedTasks as Task[],
        currentTask: undefined,
      };
    }
    // Add code here...
    return {};
  }),
  dismissTaskEditor: (ctx, _) =>
    ctx.navigationController.canGoBack() && ctx.navigationController.goBack(),
};

export const globalController = createMachine(
  {
    schema: {
      context: {} as GlobalContext,
      events: {} as GlobalEvents,
    },
    predictableActionArguments: true,
    initial: 'idle',
    states: {
      idle: {
        on: {
          SHOW_EDITOR: {
            target: 'editing',
            actions: 'openTaskEditor',
          },
          UPDATE_LIST: {
            target: 'idle',
            actions: 'updateTaskList'
          },
        },
      },
      editing: {
        on: {
          RESET_SELECTED: {
            actions: 'resetSelected'
          },
          EDIT: {
            actions: 'editTask',
          },
          SAVE: {
            actions: 'saveNewTask',
            target: 'idle',
          },
          CANCEL: {
            target: 'idle',
            actions: 'dismissTaskEditor',
          },
        },
      },
    },
  },
  {
    actions,
  },
);
