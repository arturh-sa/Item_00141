"use client"

import {useSchedule} from "@/components/schedule-provider"
import {Card, CardContent} from "@/components/ui/card"
import {Progress} from "@/components/ui/progress"
import {CheckCircle2, Circle, CalendarDays} from "lucide-react"

export default function TaskSummary() {
    const {tasks} = useSchedule()

    // Calculate task statistics
    const totalTasks = tasks.length
    const completedTasks = tasks.filter((task) => task.completed).length
    const remainingTasks = totalTasks - completedTasks
    const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

    // Group tasks by day to show distribution
    const tasksByDay = tasks.reduce(
        (acc, task) => {
            acc[task.day] = (acc[task.day] || 0) + 1
            return acc
        },
        {} as Record<string, number>,
    )

    // Find days with the most tasks (handling ties)
    const busiestDays = (() => {
        if (Object.keys(tasksByDay).length === 0) return []

        // Find the maximum number of tasks on any day
        const maxTasks = Math.max(...Object.values(tasksByDay))

        // Get all days that have this maximum number
        return Object.entries(tasksByDay)
            .filter(([_, count]) => count === maxTasks)
            .map(([day, count]) => ({day, count}))
    })()

    // Format day name for display
    const formatDay = (day: string) => day.charAt(0).toUpperCase() + day.slice(1)

    return (
        <Card className="mb-6">
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Progress section */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary"/>
                            Weekly Progress
                        </h3>
                        <Progress value={completionPercentage} className="h-2"/>
                        <p className="text-sm text-muted-foreground">{completionPercentage}% complete</p>
                    </div>

                    {/* Task count section */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium flex items-center gap-2">
                            <Circle className="h-4 w-4 text-primary"/>
                            Task Summary
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <p className="text-2xl font-bold">{completedTasks}</p>
                                <p className="text-xs text-muted-foreground">Completed</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{remainingTasks}</p>
                                <p className="text-xs text-muted-foreground">Remaining</p>
                            </div>
                        </div>
                    </div>

                    {/* Busiest day section */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-primary"/>
                            Schedule Insights
                        </h3>
                        {busiestDays.length > 0 ? (
                            <div>
                                <p className="text-sm">{busiestDays.length === 1 ? "Busiest day" : "Busiest days"}:</p>
                                <div className="mt-1">
                                    {busiestDays.map((item, index) => (
                                        <p key={item.day} className="text-xs">
                                            <span className="font-medium">{formatDay(item.day)}</span>
                                            <span className="text-muted-foreground ml-1">
                        ({item.count} task{item.count !== 1 ? "s" : ""})
                      </span>
                                            {index < busiestDays.length - 1 && ", "}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">No tasks scheduled yet</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

