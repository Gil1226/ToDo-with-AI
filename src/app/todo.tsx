import { ScrollView, View } from 'react-native';
import Category from '@/components/todo/Category';
import TodayTodo from '@/components/todo/Today';
import UpcomingTodo from '@/components/todo/Upcoming';
import CreateTasksBtn from '@/components/todo/CreateTaskBtn';
import { commonStyles } from '@/styles/common';
import { CreateTaskForm } from '@/components/taskWork/CreateTaskForm';
import { useTasks } from '@/context/taskContext';
import { useState } from 'react';

export default function todo() {
  const { setTasks } = useTasks();
  const [showCreateTaskForm, setShowCreateTaskForm] = useState(false);
  return (
    <View style={commonStyles.container}>
      <ScrollView >
            <Category/>
            <TodayTodo/>
            <UpcomingTodo/>
      </ScrollView>
      <CreateTasksBtn setShowCreateTaskForm={setShowCreateTaskForm}/>
      {showCreateTaskForm && (
        <CreateTaskForm setTasks={setTasks} setShowCreateTaskForm={setShowCreateTaskForm}/>
      )}
      

    </View>
  );
}
