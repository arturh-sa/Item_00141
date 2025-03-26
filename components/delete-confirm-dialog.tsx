"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {toast} from "sonner"
import {useSchedule} from "@/components/schedule-provider"
import type {CleaningTask} from "@/types/schedule"

interface DeleteConfirmDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: () => void
    task: CleaningTask
}

export default function DeleteConfirmDialog({open, onOpenChange, onConfirm, task}: DeleteConfirmDialogProps) {
    const {deleteTask, recoverLastDeleted} = useSchedule()

    const handleDelete = () => {
        // Store task name for toast messages
        const taskName = task.name

        // Delete the task
        deleteTask(task.id)

        // Call the onConfirm callback to close dialogs
        onConfirm()

        // Show toast with undo button using Sonner
        toast.error("Task deleted", {
            description: `"${taskName}" has been removed from your schedule.`,
            action: {
                label: "Undo",
                onClick: () => {
                    const recovered = recoverLastDeleted()
                    if (recovered) {
                        toast.success("Task restored", {
                            description: `"${taskName}" has been restored to your schedule.`,
                        })
                    }
                },
            },
            duration: 5000, // 5 seconds
        })
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete the task "{task.name}" from your cleaning schedule.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

