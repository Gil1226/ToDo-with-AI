
import { ScrollView, Text, Pressable } from "react-native";
import { commonStyles } from "@/styles/common";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProgressCard from "@/components/dashboard/ProgressCard"
import TodayTask from "@/components/dashboard/TodayTask";
import UpcomingTask from "@/components/dashboard/UpcomingTask";
import { useTasks } from "@/context/taskContext";


export default function DashboardScreen() {
    const {tasks} = useTasks();
    return (
        <ScrollView style={commonStyles.container}>
          <DashboardHeader/>
          <ProgressCard tasks={tasks}/>
          <TodayTask/>
          <UpcomingTask/>
        </ScrollView> 
    );
}

