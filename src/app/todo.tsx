import { ScrollView, View } from 'react-native';
import CategoryFilter from '@/components/todo/CategoryFilter';
import TodayTodo from '@/components/todo/Today';
import UpcomingTodo from '@/components/todo/Upcoming';
import CreateTasksBtn from '@/components/todo/CreateTaskBtn';
import SegmentControl from '@/components/todo/SegmentControl';
import { commonStyles } from '@/styles/common';
import { CreateTaskForm } from '@/components/taskWork/CreateTaskForm';
import { useState } from 'react';


export default function todo() {
  const [showCreateTaskForm, setShowCreateTaskForm] = useState(false);
  const [segment, setSegment] = useState<"active" | "history">("active")
  return (
    <View style={commonStyles.container}>
      
        {segment == "active" ?
          <ScrollView >
            <SegmentControl segment={segment} setSegment={setSegment}/>
            <CategoryFilter/>
            <TodayTodo/>
            <UpcomingTodo/>
          </ScrollView>
          :
          <ScrollView>
            <SegmentControl segment={segment} setSegment={setSegment}/>
          </ScrollView>
        }
            
      
      {!showCreateTaskForm ? 
        <CreateTasksBtn setShowCreateTaskForm={setShowCreateTaskForm}/>
      : 
        <CreateTaskForm setShowCreateTaskForm={setShowCreateTaskForm}/>
      }
    </View>
  );
}
