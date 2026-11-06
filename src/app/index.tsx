
import { ScrollView, Text, Pressable } from "react-native";
import { commonStyles } from "@/styles/common";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProgressCard from "@/components/dashboard/ProgressCard"
import TodayTask from "@/components/dashboard/TodayTask";
import UpcomingTask from "@/components/dashboard/UpcomingTask";
import { useTodayTasks, useUpcomingTasks } from "@/context/taskContext";


export default function DashboardScreen() {
    const {todayTasks} = useTodayTasks();
    const {upcomingTasks} = useUpcomingTasks();
    return (
        <ScrollView style={commonStyles.container}>
          <DashboardHeader/>
          <ProgressCard todayTasks={todayTasks} upcomingTasks={upcomingTasks}/>
          <TodayTask/>
          <UpcomingTask/>
        </ScrollView> 
    );
}

