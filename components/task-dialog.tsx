"use client"

import {useState, useEffect} from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {Trash2} from "lucide-react"
import {toast} from "sonner"
import {useSchedule} from "@/components/schedule-provider"
import {Button} from "@/components/ui/button"
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import DeleteConfirmDialog from "@/components/delete-confirm-dialog"
import NotificationSettings from "@/components/notification-settings"
import type {CleaningTask, Room, Day} from "@/types/schedule"

const formSchema = z.object({
    name: z.string().min(1, "Task name is required"),
    description: z.string().optional(),
    room: z.enum([
        "kitchen",
        "bathroom",
        "bedroom",
        "living room",
        "dining room",
        "office",
        "laundry",
        "outdoor",
        "other",
    ]),
    day: z.enum(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]),
    notificationTime: z.enum(["morning", "afternoon", "evening", "none"]),
    notificationMethod: z.enum(["email", "push", "sms", "none"]),
})

type FormValues = z.infer<typeof formSchema>

const days: { value: Day; label: string }[] = [
    {value: "monday", label: "Monday"},
    {value: "tuesday", label: "Tuesday"},
    {value: "wednesday", label: "Wednesday"},
    {value: "thursday", label: "Thursday"},
    {value: "friday", label: "Friday"},
    {value: "saturday", label: "Saturday"},
    {value: "sunday", label: "Sunday"},
]

const rooms: { value: Room; label: string }[] = [
    {value: "kitchen", label: "Kitchen"},
    {value: "bathroom", label: "Bathroom"},
    {value: "bedroom", label: "Bedroom"},
    {value: "living room", label: "Living Room"},
    {value: "dining room", label: "Dining Room"},
    {value: "office", label: "Office"},
    {value: "laundry", label: "Laundry"},
    {value: "outdoor", label: "Outdoor"},
    {value: "other", label: "Other"},
]

// Default values for a new task
const defaultFormValues = {
    name: "",
    description: "",
    room: "kitchen" as Room,
    day: "monday" as Day,
    notificationTime: "none" as const,
    notificationMethod: "none" as const,
}

interface TaskDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    task: CleaningTask | null
    onClose: () => void
}

export default function TaskDialog({open, onOpenChange, task, onClose}: TaskDialogProps) {
    const {addTask, updateTask} = useSchedule()
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const isEditing = !!task

    // Initialize form with default values
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultFormValues,
    })

    // Reset form when dialog opens/closes or task changes
    useEffect(() => {
        if (open) {
            if (task) {
                // Editing an existing task - populate form with task data
                form.reset({
                    name: task.name,
                    description: task.description || "",
                    room: task.room,
                    day: task.day,
                    notificationTime: task.notification.time,
                    notificationMethod: task.notification.method,
                })
            } else {
                // Creating a new task - reset to default values
                form.reset(defaultFormValues)
            }
        }
    }, [open, task, form])

    const onSubmit = (values: FormValues) => {
        const taskData = {
            name: values.name,
            description: values.description,
            room: values.room,
            day: values.day,
            notification: {
                time: values.notificationTime,
                method: values.notificationMethod,
            },
            completed: task?.completed || false,
        }

        if (isEditing && task) {
            // Ensure we're passing the ID for updating
            const updatedTask = {...taskData, id: task.id}
            updateTask(updatedTask)
            toast("Task updated", {
                description: `"${values.name}" has been updated in your schedule.`,
                className: "bg-background text-foreground border border-border",
                descriptionClassName: "text-muted-foreground",
            })
        } else {
            addTask(taskData)
            toast("Task created", {
                description: `"${values.name}" has been added to your schedule.`,
                className: "bg-background text-foreground border border-border",
                descriptionClassName: "text-muted-foreground",
            })
        }

        onClose()
    }

    const handleDeleteClick = () => {
        setIsDeleteDialogOpen(true)
    }

    const handleDeleteConfirm = () => {
        setIsDeleteDialogOpen(false)
        onClose()
        // The actual deletion happens in the DeleteConfirmDialog component
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent
                    className="sm:max-w-[500px] h-[calc(100dvh-40px)] flex flex-col max-h-[calc(100dvh-40px)] p-0">
                    <DialogHeader className="px-4 pt-4 pb-2">
                        <DialogTitle>{isEditing ? "Edit Task" : "Add New Task"}</DialogTitle>
                        <DialogDescription>
                            {isEditing ? "Update your cleaning task details below." : "Create a new cleaning task for your schedule."}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="overflow-y-auto flex-1 px-4 pb-2">
                        <Form {...form}>
                            <form id="task-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Task Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Vacuum living room" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Description (Optional)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Include any specific details about this task"
                                                    {...field}
                                                    value={field.value || ""}
                                                    rows={3}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="room"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Room</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a room"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent position="popper">
                                                    {rooms.map((room) => (
                                                        <SelectItem key={room.value} value={room.value}>
                                                            {room.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="day"
                                    render={({field}) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>Day</FormLabel>
                                            <FormDescription>Select the day when this task should be
                                                done.</FormDescription>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    className="grid grid-cols-2 sm:grid-cols-4 gap-2"
                                                >
                                                    {days.map((day) => (
                                                        <FormItem key={day.value}
                                                                  className="flex items-center space-x-2 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value={day.value}
                                                                                id={`day-${day.value}`}/>
                                                            </FormControl>
                                                            <FormLabel className="font-normal cursor-pointer"
                                                                       htmlFor={`day-${day.value}`}>
                                                                {day.label}
                                                            </FormLabel>
                                                        </FormItem>
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <NotificationSettings
                                    control={form.control}
                                    notificationTime={form.watch("notificationTime")}
                                    notificationMethod={form.watch("notificationMethod")}
                                />
                            </form>
                        </Form>
                    </div>

                    {/* Fixed footer with buttons */}
                    <div className="border-t p-4 mt-auto">
                        <div className="flex flex-row items-center justify-between">
                            {isEditing ? (
                                <>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        onClick={handleDeleteClick}
                                        className="flex items-center gap-1"
                                    >
                                        <Trash2 className="h-4 w-4"/>
                                        <span className="sm:inline">Delete</span>
                                    </Button>
                                    <div className="flex gap-2">
                                        <Button type="button" variant="outline" size="sm" onClick={onClose}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" size="sm" form="task-form">
                                            Update
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex-1"></div>
                                    <div className="flex gap-2">
                                        <Button type="button" variant="outline" size="sm" onClick={onClose}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" size="sm" form="task-form">
                                            Create
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {task && (
                <DeleteConfirmDialog
                    open={isDeleteDialogOpen}
                    onOpenChange={setIsDeleteDialogOpen}
                    onConfirm={handleDeleteConfirm}
                    task={task}
                />
            )}
        </>
    )
}

