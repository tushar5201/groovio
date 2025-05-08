import { SeriesDetailsInterface } from "@/interfaces/SeriesDetails";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default async function MoreLikeThisSection({ seriesData }: { seriesData: SeriesDetailsInterface }) {
  const seriesId = seriesData.id;
  const movie = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/get-similar-series/${seriesId}`);
  const similarSeries = movie.data.results;
  return (
    <div>
      <div className="ms-12 m-5">
        {similarSeries.length === 0 && <div className='text-soft-grey text-center w-full'>No similar movies available</div>}

        <div className="grid grid-flow-row grid-cols-8 gap-5">
          {similarSeries.map((series: SeriesDetailsInterface, i: number) => (
            series.poster_path !== null &&
            <Link href={`/get-series/${series.id}`} key={i} className="relative overflow-hidden hover:scale-110 transition-all duration-300">
              <Image
                src={`https://image.tmdb.org/t/p/original/${series.poster_path}`}
                alt={series.name}
                width={250}
                height={500}
                className="rounded-lg text-white"
              />
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
