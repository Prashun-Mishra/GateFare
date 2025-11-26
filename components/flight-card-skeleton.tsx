import { Skeleton } from "@/components/ui/skeleton"

export function FlightCardSkeleton() {
    return (
        <div className="bg-white rounded-xl p-6 border border-blue-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1 space-y-3">
                    <Skeleton className="h-6 w-32" />
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-5 w-12" />
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-5 w-12" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                </div>
                <div className="flex-1 text-right md:text-center space-y-2">
                    <Skeleton className="h-4 w-48 mx-auto" />
                </div>
                <div className="flex items-center gap-4 md:justify-end">
                    <div className="text-right space-y-2">
                        <Skeleton className="h-8 w-20 ml-auto" />
                        <Skeleton className="h-3 w-12 ml-auto" />
                    </div>
                    <Skeleton className="h-10 w-24 rounded-md" />
                </div>
            </div>
        </div>
    )
}
