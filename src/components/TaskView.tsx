import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Task} from '../models/Task';
import {colors} from '../utils'
import {View, Text, StyleSheet, TouchableOpacity, GestureResponderEvent} from 'react-native';
interface TaskListProps {
  task: Task;
  handleItem?: (item: GestureResponderEvent) => void;
  handleCheck: (task: Task, remove?: boolean) => void;
}
export const TaskView = ({ handleItem, handleCheck, task }: TaskListProps) => (
  <View
    style={styles.container}
  >
    <TouchableOpacity disabled={task.completed} onPress={handleItem} style={styles.pressItem}>
      <View style={styles.mainSection}>
        <Text style={styles.title}>{task.title}</Text>
      </View>
      <Text>{task.description}</Text>
    </TouchableOpacity>
    <View>
      <TouchableOpacity onPress={() => handleCheck(task)}>
        <Icon name={`${task.completed ? 'check-square' : 'square-o'}`} color={colors.blue001} size={30} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleCheck(task, true)}>
        {task.completed && <Icon name='trash' color={colors.red001} size={30} />}
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 3,
    padding: 4,
    margin: 4,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: colors.blue001,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  pressItem: {
    width: '85%',
  },
  mainSection: {
    paddingBottom: 8,
    marginBottom: 8,
    borderBottomColor: colors.gray001, 
    borderBottomWidth: 0.5,
    padding: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  check: {
    marginBottom: 6,
    fontSize: 24,
  },
  delete: {
    color: 'red',
    fontSize: 24,
  },
});
