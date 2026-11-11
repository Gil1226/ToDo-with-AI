
import { ScrollView, Text, Pressable, View } from "react-native";
import { commonStyles } from "@/styles/common";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProgressCard from "@/components/dashboard/ProgressCard"
import TodayTask from "@/components/dashboard/TodayTask";
import UpcomingTask from "@/components/dashboard/UpcomingTask";
import { useTodayTasks, useUpcomingTasks } from "@/context/taskContext";
import { useState } from "react";
import { UpdateTaskForm } from "@/components/taskWork/UpdateTaskForm";


export default function DashboardScreen() {
    const [showUpdateTaskForm, setShowUpdateTaskForm] = useState(false);
    const [taskId, setTaskId] = useState<number>(0);   
    const {todayTasks} = useTodayTasks();
    const {upcomingTasks} = useUpcomingTasks();

    return (
        <>
            <ScrollView style={commonStyles.container}>
                <DashboardHeader/>
                <ProgressCard todayTasks={todayTasks} upcomingTasks={upcomingTasks}/>
                <TodayTask setShowUpdateTaskForm={setShowUpdateTaskForm} setTaskId={setTaskId}/>
                <UpcomingTask setShowUpdateTaskForm={setShowUpdateTaskForm} setTaskId={setTaskId}/>
            </ScrollView> 
            {showUpdateTaskForm && (
                <UpdateTaskForm setShowUpdateTaskForm={setShowUpdateTaskForm} taskId={taskId}/>
            )}
        </>
        
    );
}

