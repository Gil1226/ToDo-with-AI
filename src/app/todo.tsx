import { ScrollView, View } from 'react-native';
import CategoryFilter from '@/components/taskWork/CategoryFilter';
import TodayTodo from '@/components/todo/TodayTodo';
import UpcomingTodo from '@/components/todo/UpcomingTodo';
import CreateTasksBtn from '@/components/todo/CreateTaskBtn';
import SegmentControl from '@/components/todo/SegmentControl';
import HistoryTodo from '@/components/todo/HistoryTodo';
import AIChatbotModal from "@/components/todo/AIChatbotModal";
import AIChatbotBtn from '@/components/todo/AIChatbotBtn';
import {Task} from '@/types/taskType';
import { commonStyles } from '@/styles/common';
import { CreateTaskForm } from '@/components/taskWork/CreateTaskForm';
import { useState } from 'react';
import { distinctCategory } from "@/database/taskFunction"
import {UpdateTaskForm} from '@/components/taskWork/UpdateTaskForm';


export default function todo() {
  const [showCreateTaskForm, setShowCreateTaskForm] = useState(false);
  const [showAIChatbot, setShowAIChatbot] = useState(false);
  const [segment, setSegment] = useState<"active" | "history">("active")
  const [activeCategory, setActiveCategory] = useState("All");
  const [task, setTask] = useState<Task | null>(null);
  
  const [showUpdateTaskForm, setShowUpdateTaskForm] = useState(false);

  return (
    <View style={commonStyles.container}>
      
        {segment == "active" ?
          <ScrollView >
            <SegmentControl segment={segment} setSegment={setSegment}/>
            <CategoryFilter fetchedCategories={distinctCategory()} onSelectCategory={setActiveCategory}/>
            <TodayTodo activeCategory={activeCategory} setShowUpdateTaskForm={setShowUpdateTaskForm} setTask={setTask}/>
            <UpcomingTodo setShowUpdateTaskForm={setShowUpdateTaskForm} setTask={setTask}/>
          </ScrollView>
          :
          <ScrollView>
            <SegmentControl segment={segment} setSegment={setSegment}/>
            <HistoryTodo setShowUpdateTaskForm={setShowUpdateTaskForm} setTask={setTask}/>
          </ScrollView>
        }
            
      
      {!showCreateTaskForm ?
        <CreateTasksBtn setShowCreateTaskForm={setShowCreateTaskForm}/>
      : 
        <CreateTaskForm setShowCreateTaskForm={setShowCreateTaskForm}/>
      }
      
      {showUpdateTaskForm && (
        <UpdateTaskForm setShowUpdateTaskForm={setShowUpdateTaskForm} task={task}/>
      )}
      
      <AIChatbotBtn onPress={() => setShowAIChatbot(true)}/>
      <AIChatbotModal visible={showAIChatbot} onClose={() => setShowAIChatbot(false)}/>
    </View>
  );
}
