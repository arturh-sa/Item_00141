import {Suspense} from "react"
import CleaningSchedule from "@/components/cleaning-schedule"
import {ScheduleProvider} from "@/components/schedule-provider"
import LoadingSkeleton from "@/components/loading-skeleton"

export default function Home() {
    return (
        <main className="container mx-auto py-6 px-4 md:px-6">
            <h1 className="text-3xl font-bold mb-6">Weekly Cleaning Schedule</h1>
            <ScheduleProvider>
                <Suspense fallback={<LoadingSkeleton/>}>
                    <CleaningSchedule/>
                </Suspense>
            </ScheduleProvider>
        </main>
    )
}

