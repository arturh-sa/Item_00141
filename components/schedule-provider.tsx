"use client"

import {createContext, useContext, useState, useEffect, useRef, type ReactNode} from "react"
import {v4 as uuidv4} from "uuid"
import type {CleaningTask, Room} from "@/types/schedule"

interface ScheduleContextType {
    tasks: CleaningTask[]
    addTask: (task: Omit<CleaningTask, "id">) => void
    updateTask: (task: CleaningTask) => void
    deleteTask: (id: string) => void
    toggleTaskCompletion: (id: string) => void
    filteredTasks: (room?: Room) => CleaningTask[]
    selectedRoom: Room | undefined
    setSelectedRoom: (room: Room | undefined) => void
    recoverLastDeleted: () => boolean
    getLastDeletedTask: () => CleaningTask | null
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined)

export function ScheduleProvider({children}: { children: ReactNode }) {
    const [tasks, setTasks] = useState<CleaningTask[]>([])
    const [selectedRoom, setSelectedRoom] = useState<Room | undefined>(undefined)
    const lastDeletedRef = useRef<CleaningTask | null>(null)

    // Load tasks from localStorage on component mount
    useEffect(() => {
        const savedTasks = localStorage.getItem("cleaningTasks")
        if (savedTasks) {
            try {
                // Handle migration from old format (days array) to new format (single day)
                const parsedTasks = JSON.parse(savedTasks)
                const migratedTasks = parsedTasks.map((task: any) => {
                    // If task has days array, convert to single day
                    if (Array.isArray(task.days)) {
                        return {
                            ...task,
                            day: task.days[0] || "monday", // Use first day or default to Monday
                        }
                    }
                    return task
                })
                setTasks(migratedTasks)
            } catch (error) {
                console.error("Error parsing saved tasks:", error)
                setTasks([])
            }
        }
    }, [])

    // Save tasks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("cleaningTasks", JSON.stringify(tasks))
    }, [tasks])

    const addTask = (task: Omit<CleaningTask, "id">) => {
        const newTask = {...task, id: uuidv4()}
        setTasks((prevTasks) => [...prevTasks, newTask])
    }

    const updateTask = (updatedTask: CleaningTask) => {
        // Check if task exists
        const taskExists = tasks.some((task) => task.id === updatedTask.id)
        if (!taskExists) {
            return
        }

        // Update the task
        setTasks((prevTasks) => prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    }

    const deleteTask = (id: string) => {
        // Store the task before deleting it
        const taskToDelete = tasks.find((task) => task.id === id)
        if (taskToDelete) {
            // Store in ref to ensure it persists across renders
            lastDeletedRef.current = {...taskToDelete}

            // Remove the task from the list
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
        }
    }

    const toggleTaskCompletion = (id: string) => {
        setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? {
            ...task,
            completed: !task.completed
        } : task)))
    }

    const filteredTasks = (room?: Room) => {
        if (!room) return tasks
        return tasks.filter((task) => task.room === room)
    }

    const recoverLastDeleted = () => {
        if (lastDeletedRef.current) {
            // Add the task back to the list
            setTasks((prevTasks) => [...prevTasks, lastDeletedRef.current!])

            // Clear the reference
            lastDeletedRef.current = null

            return true
        }
        return false
    }

    const getLastDeletedTask = () => {
        return lastDeletedRef.current
    }

    return (
        <ScheduleContext.Provider
            value={{
                tasks,
                addTask,
                updateTask,
                deleteTask,
                toggleTaskCompletion,
                filteredTasks,
                selectedRoom,
                setSelectedRoom,
                recoverLastDeleted,
                getLastDeletedTask,
            }}
        >
            {children}
        </ScheduleContext.Provider>
    )
}

export function useSchedule() {
    const context = useContext(ScheduleContext)
    if (context === undefined) {
        throw new Error("useSchedule must be used within a ScheduleProvider")
    }
    return context
}

