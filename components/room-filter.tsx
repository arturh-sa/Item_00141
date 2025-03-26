"use client"

import {useSchedule} from "@/components/schedule-provider"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import type {Room} from "@/types/schedule"

// Update the rooms array to use "all" instead of an empty string
const rooms: { value: string; label: string }[] = [
    {value: "all", label: "All Rooms"},
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

export default function RoomFilter() {
    const {selectedRoom, setSelectedRoom} = useSchedule()

    // Update the handleRoomChange function to handle the "all" value
    const handleRoomChange = (value: string) => {
        setSelectedRoom(value === "all" ? undefined : (value as Room))
    }

    // Update the Select value to use "all" when selectedRoom is undefined
    return (
        <div className="w-full sm:w-auto">
            <Select value={selectedRoom || "all"} onValueChange={handleRoomChange}>
                <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Filter by room"/>
                </SelectTrigger>
                <SelectContent>
                    {rooms.map((room) => (
                        <SelectItem key={room.value} value={room.value}>
                            {room.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

