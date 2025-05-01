import LatestBollywoodMovies from "./LatestBollywoodMovies"
import LatestBollywoodSeries from "./LatestBollywoodSeries"

export default async function HomeContent() {

    return (
        <div className="px-2 md:px-15">
            <LatestBollywoodMovies />
            <LatestBollywoodSeries />
            <div className="h-[500px]"></div>
        </div>
    )
}
