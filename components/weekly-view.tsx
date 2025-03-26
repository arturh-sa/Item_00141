"use client"

import {useSchedule} from "@/components/schedule-provider"
import TaskCard from "@/components/task-card"
import type {CleaningTask, Day} from "@/types/schedule"

const days: Day[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

const formatDay = (day: Day) => {
    return day.charAt(0).toUpperCase() + day.slice(1)
}

interface WeeklyViewProps {
    tasks: CleaningTask[]
    onEditTask: (task: CleaningTask) => void
}

export default function WeeklyView({tasks, onEditTask}: WeeklyViewProps) {
    const {toggleTaskCompletion} = useSchedule()

    const getTasksForDay = (day: Day) => {
        return tasks.filter((task) => task.day === day)
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {days.map((day) => (
                <div key={day} className="border rounded-lg p-3 bg-card">
                    <h3 className="font-medium text-center border-b pb-2 mb-3">{formatDay(day)}</h3>
                    <div className="space-y-3">
                        {getTasksForDay(day).length > 0 ? (
                            getTasksForDay(day).map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onEdit={() => onEditTask(task)}
                                    onToggleComplete={() => toggleTaskCompletion(task.id)}
                                />
                            ))
                        ) : (
                            <p className="text-center text-muted-foreground text-sm py-4">No tasks</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

