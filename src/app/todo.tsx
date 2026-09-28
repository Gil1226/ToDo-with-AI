import { ScrollView, View } from 'react-native';
import Category from '@/components/todo/Category';
import TodayTodo from '@/components/todo/Today';
import UpcomingTodo from '@/components/todo/Upcoming';
import CreateTasksBtn from '@/components/todo/CreateTaskBtn';
import { commonStyles } from '@/styles/common';
import { CreateTaskForm } from '@/components/taskWork/CreateTaskForm';

export default function todo() {
  return (
    <View style={commonStyles.container}>
      <ScrollView >
            <Category/>
            <TodayTodo/>
            <UpcomingTodo/>
      </ScrollView>
      <CreateTasksBtn/>
      <CreateTaskForm/>

    </View>
  );
}
