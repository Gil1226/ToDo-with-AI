import { ScrollView, View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { Task } from "@/types/taskType";
import SearchBar from "./HistoryTodoComponent/SearchBar";
import CategoryFilter from "../taskWork/CategoryFilter";
import { TaskList } from "../taskWork/TaskList";
import { useTasks } from "@/context/taskContext";
import { useState } from "react";

export default function HistoryTodo() {
    const { historyTasks } = useTasks()
    const [activeCategory, setActiveCategory] = useState("All");

    const fetchedCategories = [...new Set(historyTasks.map((task) => task.category))];
    
    const filteredTasks = 
        activeCategory === "All"
        ? historyTasks
        : historyTasks.filter(
            (task) => task.category === activeCategory
            );

    return(
        <ScrollView>
            <SearchBar/>
            <CategoryFilter fetchedCategories={fetchedCategories} onSelectCategory={setActiveCategory}/>
            <TaskList emptyMessage={"You don't have past Task"} allTask={filteredTasks}/>
        </ScrollView>
    );
}

