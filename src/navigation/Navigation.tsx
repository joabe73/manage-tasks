import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';
import History from '../modules/history/History.vModel';
import TaskEditor from '../modules/task_editor/TaskEditor.vModel';
import TasksList from '../modules/tasks_list/TasksList.vModel';
import Settings from '../modules/settings/Settings.vModel';
import {useGlobalActorRef} from '../contexts/GlobalContext';
import ButtonView from '../components/ButtonView';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      sceneContainerStyle={{margin: 12}}>
      <Tab.Screen
        name={t('settings')}
        component={Settings}
        options={{tabBarIcon: () => <Icon name="cubes" color="#1872dd" size={24} />}}
      />
      <Tab.Screen
        name={t('list')}
        component={TasksList}
        options={{
          tabBarIcon: () => <Icon name="th-list" color="#1872dd" size={24} />,
        }}
      />
      <Tab.Screen
        name={t('history')}
        component={History}
        options={{tabBarIcon: () => <Icon name="random" color="#1872dd" size={24} />}}
      />
    </Tab.Navigator>
  )
};

const AddNewTask = () => {
  const { t } = useTranslation();
  const {send} = useGlobalActorRef();

  return (
    <ButtonView
      press={() => send({type: 'SHOW_EDITOR', task: undefined})}
      label={t('addNewTask')}
    />
  );
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RenderIcon = () =>  <Icon name="list-alt" color="#1872dd" size={30} />

export const MainNavigation = () => (
  <RootStack.Navigator
    screenOptions={{
      headerTitle:  RenderIcon,
    }}>
    <RootStack.Group
      screenOptions={{
        headerRight: AddNewTask,
      }}>
      <RootStack.Screen name="Tabs" component={Tabs} />
    </RootStack.Group>

    <RootStack.Group screenOptions={{presentation: 'modal'}}>
      <Tab.Screen name="TaskEditor" component={TaskEditor} />
    </RootStack.Group>
  </RootStack.Navigator>
);

export type RootStackParamList = {
  TaskEditor: {};
  Tabs: {};
};
