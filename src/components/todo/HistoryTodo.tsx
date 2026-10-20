import { ScrollView, View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { fetchHistory } from "@/database/taskFunction";
import { Task } from "@/types/taskType";
import SearchBar from "./HistoryTodoComponent/SearchBar";
import CategoryFilter from "../taskWork/CategoryFilter";
import { TaskList } from "../taskWork/TaskList";

export default function HistoryTodo() {
    const history: Task[] = fetchHistory();
    const fetchedCategories = [...new Set(history.map((task) => task.category))];

    return(
        <ScrollView>
            <SearchBar/>
            <CategoryFilter fetchedCategories={fetchedCategories}/>
            <TaskList emptyMessage={"You don't have past Task"} allTask={history}/>
        </ScrollView>
    );
}

