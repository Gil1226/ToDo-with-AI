import { View, Text } from "react-native";
import {TaskCard} from "./TaskCard"
import { Task } from "@/types/taskType";

type TaskListProp = {
    emptyMessage: string,
    allTask: Task[],
}

export function TaskList({emptyMessage, allTask} : TaskListProp){

    if (allTask.length === 0 ) {
        return <Text>{emptyMessage}</Text>;
    }

    return(
        
            <View>
                <View>
                    {allTask.map(task => (
                        <TaskCard
                            key={task.id}
                            {...task}

                        />
                    ))}
                </View>
            </View>
    )
}