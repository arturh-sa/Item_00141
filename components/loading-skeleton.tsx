import {Skeleton} from "@/components/ui/skeleton"

export default function LoadingSkeleton() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-[250px]"/>
                <Skeleton className="h-10 w-[120px]"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {Array.from({length: 7}).map((_, i) => (
                    <div key={i} className="space-y-3">
                        <Skeleton className="h-8 w-full"/>
                        <Skeleton className="h-24 w-full"/>
                        <Skeleton className="h-24 w-full"/>
                    </div>
                ))}
            </div>
        </div>
    )
}

