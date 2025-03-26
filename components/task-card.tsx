"use client"

import {Edit, Bell, BellOff} from "lucide-react"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Checkbox} from "@/components/ui/checkbox"
import {Card, CardContent, CardFooter} from "@/components/ui/card"
import {showToast} from "@/utils/toast-utils"
import type {CleaningTask} from "@/types/schedule"

interface TaskCardProps {
    task: CleaningTask
    onEdit: () => void
    onToggleComplete: () => void
}

export default function TaskCard({task, onEdit, onToggleComplete}: TaskCardProps) {
    const hasNotifications = task.notification.time !== "none" && task.notification.method !== "none"

    const handleToggleComplete = () => {
        onToggleComplete()

        if (!task.completed) {
            showToast.success("Task completed", `"${task.name}" has been marked as completed.`)
        }
    }

    return (
        <Card className={`${task.completed ? "opacity-60" : ""}`}>
            <CardContent className="p-3 space-y-2">
                <div className="flex items-start gap-2">
                    <Checkbox
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={handleToggleComplete}
                        className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                        <label
                            htmlFor={`task-${task.id}`}
                            className={`font-medium block ${task.completed ? "line-through text-muted-foreground" : ""}`}
                        >
                            {task.name}
                        </label>
                        {task.description &&
                            <p className="text-sm text-muted-foreground truncate">{task.description}</p>}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                        {task.room.charAt(0).toUpperCase() + task.room.slice(1)}
                    </Badge>
                    {hasNotifications ? (
                        <Bell className="h-3 w-3 text-muted-foreground"/>
                    ) : (
                        <BellOff className="h-3 w-3 text-muted-foreground"/>
                    )}
                </div>
            </CardContent>
            <CardFooter className="p-2 pt-0 flex justify-end">
                <Button variant="ghost" size="sm" onClick={onEdit} className="h-7 px-2">
                    <Edit className="h-3 w-3 mr-1"/>
                    <span className="text-xs">Edit</span>
                </Button>
            </CardFooter>
        </Card>
    )
}

