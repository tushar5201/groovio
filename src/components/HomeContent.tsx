"use client"
import LatestBollywoodMovies from "./LatestBollywoodMovies"
import LatestBollywoodSeries from "./LatestBollywoodSeries"

export default function HomeContent() {

    return (
        <div className="px-2 md:px-15">
            <LatestBollywoodMovies />
            <LatestBollywoodSeries />
            {/* <div className="h-[500px]"></div> */}
        </div>
    )
}
