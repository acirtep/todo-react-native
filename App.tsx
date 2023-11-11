import { StatusBar } from "expo-status-bar"
import {
    Button,
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"
import { useEffect, useState } from "react"
import "reflect-metadata"
import { AppDataSource } from "./database/data-source"
import { Tasks } from "./database/models/Tasks"

export default function App() {
    AppDataSource.initialize()
        .then(() => {
            console.log("Connection initialized with database...")
        })
        .catch((error) => console.log(error))

    const tasksRepository = AppDataSource.getRepository(Tasks)

    // tasksRepository.createQueryBuilder().delete().from(Tasks).where("1= 1").execute()

    const [taskData, setTaskData] = useState<Tasks[]>([])
    const getTaskData = async () => {
        const tasksQuery = await tasksRepository.find({ order: { completed: "asc", created_timestamp: "desc" } })
        setTaskData(tasksQuery)
    }

    interface InterfaceTaskInfo {
        task_name: string
    }
    const [taskName, setTaskName] = useState<InterfaceTaskInfo>({ task_name: "" })

    const add = (text: string) => {
        if (text === null || text === "") {
            return false
        }

        const task = new Tasks()
        task.task_name = text
        tasksRepository.save(task).then(() => {
            getTaskData()
        })
    }

    const updateTask = (task_id: number) => {
        if (task_id === null) {
            return false
        }

        tasksRepository
            .createQueryBuilder()
            .update(Tasks)
            .set({ completed: 1, completed_timestamp: () => "CURRENT_TIMESTAMP" })
            .where("task_id=:task_id and completed=0", { task_id: task_id })
            .execute()
        getTaskData()
    }

    const deleteTask = (task_id: number) => {
        if (task_id === null) {
            return false
        }

        tasksRepository
            .createQueryBuilder()
            .delete()
            .from(Tasks)
            .where("task_id=:task_id", { task_id: task_id })
            .execute()

        getTaskData()
    }

    useEffect(() => {
        getTaskData()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>My ToDo List</Text>
            <TextInput
                onChangeText={(text) => {
                    setTaskName({ task_name: text })
                }}
                onSubmitEditing={() => {
                    add(taskName.task_name)
                    setTaskName({ task_name: "" })
                }}
                placeholder="What do you need to do?"
                style={styles.input}
                value={taskName.task_name}
            />
            <Text style={styles.heading}>Double click to mark as completed</Text>
            <ScrollView style={styles.listArea}>
                {taskData.map(({ task_id, task_name, completed, created_timestamp, completed_timestamp }) => (
                    <TouchableOpacity
                        key={task_id}
                        style={{
                            backgroundColor: completed === 1 ? "green" : "#fff",
                            borderColor: "#000",
                            borderWidth: 1,
                            padding: 8,
                        }}
                        onPress={() => {
                            updateTask(task_id)
                        }}
                    >
                        <Text style={{ fontWeight: "bold" }}>
                            {task_name} since {created_timestamp.toString()}
                            {completed === 1 ? " completed on " + completed_timestamp.toString() : ""}
                        </Text>
                        <Button
                            title={"Delete me"}
                            color={"black"}
                            onPress={() => {
                                deleteTask(task_id)
                            }}
                        ></Button>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        alignItems: "center",
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "green",
    },
    input: {
        borderColor: "#4630eb",
        borderRadius: 4,
        borderWidth: 1,
        margin: 24,
        padding: 12,
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    listArea: {
        backgroundColor: "#fff",
        flex: 1,
        paddingTop: 16,
    },
    sectionContainer: {
        marginBottom: 16,
        marginHorizontal: 16,
    },
    sectionHeading: {
        fontSize: 18,
        marginBottom: 8,
    },
})
