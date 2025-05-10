import { Skeleton } from "../ui/skeleton";

export default function TrendingSkeleton() {
    return (
        <>
        {[...Array(3)].map((_, i) =>
            <div key={`skeleton-${i}`} className="space-x-2 flex w-full">
                <Skeleton className="h-[250px] w-10/12 rounded-3xl" />
                <div className="w-full">
                    <Skeleton className="h-8 mt-3 w-40" />
                    <Skeleton className="h-5 mt-3 w-25" />
                    <Skeleton className="h-25 mt-3 w-full" />
                    <Skeleton className="h-10 mt-3 w-full" />
                </div>
            </div>
            )}
        </>
    )
}
