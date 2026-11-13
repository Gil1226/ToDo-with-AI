
import { ScrollView, Text, Pressable, View } from "react-native";
import { commonStyles } from "@/styles/common";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProgressCard from "@/components/dashboard/ProgressCard"
import TodayTask from "@/components/dashboard/TodayTask";
import UpcomingTask from "@/components/dashboard/UpcomingTask";
import { useTodayTasks, useUpcomingTasks } from "@/context/taskContext";
import { useState } from "react";
import { UpdateTaskForm } from "@/components/taskWork/UpdateTaskForm";
import { Task } from "@/types/taskType";


export default function DashboardScreen() {
    const [showUpdateTaskForm, setShowUpdateTaskForm] = useState(false);
    const [task, setTask] = useState<Task | null>(null);   
    const {todayTasks} = useTodayTasks();
    const {upcomingTasks} = useUpcomingTasks();

    return (
        <>
            <ScrollView style={commonStyles.container}>
                <DashboardHeader/>
                <ProgressCard todayTasks={todayTasks} upcomingTasks={upcomingTasks}/>
                <TodayTask setShowUpdateTaskForm={setShowUpdateTaskForm} setTask={setTask}/>
                <UpcomingTask setShowUpdateTaskForm={setShowUpdateTaskForm} setTask={setTask}/>
            </ScrollView> 
            {showUpdateTaskForm && (
                <UpdateTaskForm setShowUpdateTaskForm={setShowUpdateTaskForm} task={task}/>
            )}
        </>
        
    );
}

