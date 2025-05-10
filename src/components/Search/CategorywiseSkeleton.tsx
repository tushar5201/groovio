import { Skeleton } from "../ui/skeleton";

export default function CategorywiseSkeleton() {
    return (
        <>
            {[...Array(12)].map((_, i) =>
                <div key={i} className="space-x-2">
                    <Skeleton className="h-[250px] w-[180px] rounded-3xl" />
                </div>
            )}
        </>
    )
}
