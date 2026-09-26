import { View, Text } from "react-native";
import { todayTask, upcomingTask } from "@/utility/Task";
import {TaskCard} from "./TaskCard"
import { useTasks } from "@/context/taskContext";

type TaskListProp = {
    type: "today" | "upcoming",
}

export function TaskList({type} : TaskListProp){
    const {tasks} = useTasks()
    const filteredTask = type == "today" ? todayTask(tasks) : upcomingTask(tasks);

    if (filteredTask.length === 0 ) {
        return <Text>{type === "today" ? "No task today, Enjoy your rest!": "No more upcoming task"}</Text>;
    }

    return(
        <View>
            {filteredTask.map(task => (
                <TaskCard
                    key={task.id}
                    {...task}

                />
            ))}
        </View>
    )
}