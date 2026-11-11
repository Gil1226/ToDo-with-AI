import { View, Text } from "react-native";
import {TaskCard} from "./TaskCard"
import { Task } from "@/types/taskType";
import TaskActionMenu from "./TaskActionMenu";

type TaskListProp = {
    emptyMessage: string;
    allTask: Task[];
    onEditTask: (taskId: number) => void;
    onDeleteTask: (taskId: number) => void;
}

export function TaskList({emptyMessage, allTask, onEditTask, onDeleteTask} : TaskListProp){

    if (allTask.length === 0 ) {
        return <Text>{emptyMessage}</Text>;
    }

    return(
        
            <View>
                <View>
                    {allTask.map(task => (
                        <TaskActionMenu
                            key={task.id}
                            onEdit={() => onEditTask(task.id)}
                            onDelete={() => onDeleteTask(task.id)}
                        >
                            <TaskCard {...task} />
                        </TaskActionMenu>
                    ))}
                </View>
            </View>
    )
}