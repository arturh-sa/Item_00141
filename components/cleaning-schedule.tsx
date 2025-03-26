"use client"

import {useState} from "react"
import {Plus} from "lucide-react"
import {Button} from "@/components/ui/button"
import {useSchedule} from "@/components/schedule-provider"
import RoomFilter from "@/components/room-filter"
import WeeklyView from "@/components/weekly-view"
import TaskDialog from "@/components/task-dialog"
import type {CleaningTask} from "@/types/schedule"

export default function CleaningSchedule() {
    const {selectedRoom, filteredTasks} = useSchedule()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingTask, setEditingTask] = useState<CleaningTask | null>(null)

    const handleAddTask = () => {
        // Explicitly set editingTask to null when adding a new task
        setEditingTask(null)
        setIsDialogOpen(true)
    }

    const handleEditTask = (task: CleaningTask) => {
        setEditingTask(task)
        setIsDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setIsDialogOpen(false)
        // Clear the editing task when dialog closes
        setEditingTask(null)
    }

    const displayedTasks = filteredTasks(selectedRoom)

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <RoomFilter/>
                <Button onClick={handleAddTask} className="flex items-center gap-2">
                    <Plus className="h-4 w-4"/>
                    Add Task
                </Button>
            </div>

            <WeeklyView tasks={displayedTasks} onEditTask={handleEditTask}/>

            <TaskDialog
                open={isDialogOpen}
                onOpenChange={(open) => {
                    setIsDialogOpen(open)
                    // If dialog is closing, clear the editing task
                    if (!open) {
                        setEditingTask(null)
                    }
                }}
                task={editingTask}
                onClose={handleCloseDialog}
            />
        </div>
    )
}

