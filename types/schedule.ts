export type Room =
    | "kitchen"
    | "bathroom"
    | "bedroom"
    | "living room"
    | "dining room"
    | "office"
    | "laundry"
    | "outdoor"
    | "other"

export type Day = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"

export type NotificationTime = "morning" | "afternoon" | "evening" | "none"

export type NotificationMethod = "email" | "push" | "sms" | "none"

export interface TaskNotification {
    time: NotificationTime
    method: NotificationMethod
}

export interface CleaningTask {
    id: string
    name: string
    description?: string
    room: Room
    day: Day // Changed from days array to single day
    notification: TaskNotification
    completed: boolean
}

