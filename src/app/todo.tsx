import { ScrollView } from 'react-native';
import Category from '@/components/todo/Category';
import TodayTodo from '@/components/todo/Today';
import UpcomingTodo from '@/components/todo/Upcoming';
import CreateTasksBtn from '@/components/todo/CreateTaskBtn';
import { commonStyles } from '@/styles/common';

export default function todo() {
  return (
      <ScrollView style={commonStyles.container}>
            <Category/>
            <TodayTodo/>
            <UpcomingTodo/>
            <CreateTasksBtn/>
      </ScrollView>
  );
}
