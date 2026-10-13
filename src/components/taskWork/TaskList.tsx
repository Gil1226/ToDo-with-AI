import { View, Text } from "react-native";
import { todayTask, upcomingTask } from "@/utility/Task";
import {TaskCard} from "./TaskCard"
import { useTasks } from "@/context/taskContext";
import { Task } from "@/types/taskType";

type TaskListProp = {
    type: "today" | "upcoming",
    showAll?: boolean,
    setShowAll?: React.Dispatch<React.SetStateAction<boolean>>;
    allTask?: Task[],
}

export function TaskList({type, showAll, setShowAll, allTask} : TaskListProp){
    const {todayTasks, upcomingTasks} = useTasks()
    console.log("todtask", todayTask(upcomingTasks))
    const filteredTask = type == "today" ? todayTask(todayTasks) : upcomingTask(upcomingTasks);

    if (filteredTask.length === 0 ) {
        return <Text>{type === "today" ? "No task today, Enjoy your rest!": "No more upcoming task"}</Text>;
    }

    return(
        
            <View>
                {showAll ? 
                    <View>
                        {allTask?.map(task => (
                            <TaskCard
                                key={task.id}
                                {...task}

                            />
                        ))}
                    </View>
                    : 
                    <View>
                        {filteredTask.map(task => (
                            <TaskCard
                                key={task.id}
                                {...task}

                            />
                        ))}
                    </View>
                }
            </View>
    )
}