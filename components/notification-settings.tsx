"use client"

import type {Control} from "react-hook-form"
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import type {NotificationTime, NotificationMethod} from "@/types/schedule"

interface NotificationSettingsProps {
    control: Control<any>
    notificationTime: NotificationTime
    notificationMethod: NotificationMethod
}

export default function NotificationSettings({
                                                 control,
                                                 notificationTime,
                                                 notificationMethod,
                                             }: NotificationSettingsProps) {
    const notificationTimes = [
        {value: "morning", label: "Morning (8:00 AM)"},
        {value: "afternoon", label: "Afternoon (1:00 PM)"},
        {value: "evening", label: "Evening (6:00 PM)"},
        {value: "none", label: "No notification"},
    ]

    const notificationMethods = [
        {value: "email", label: "Email"},
        {value: "push", label: "Push notification"},
        {value: "sms", label: "SMS"},
        {value: "none", label: "None"},
    ]

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-medium">Notification Settings</h3>

            <FormField
                control={control}
                name="notificationTime"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Notification Time</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select notification time"/>
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {notificationTimes.map((time) => (
                                    <SelectItem key={time.value} value={time.value}>
                                        {time.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="notificationMethod"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Notification Method</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}
                                disabled={notificationTime === "none"}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select notification method"/>
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {notificationMethods.map((method) => (
                                    <SelectItem key={method.value} value={method.value}>
                                        {method.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage/>
                    </FormItem>
                )}
            />
        </div>
    )
}

