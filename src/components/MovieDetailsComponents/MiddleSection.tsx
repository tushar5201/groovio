import { StarIcon } from "lucide-react";
import Link from "next/link";

export default function MiddleSection({ movieData }: { movieData: any }) {
  const totalStars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="row-span-2 row-end-3 ms-5 mt-5">
      <h6> {movieData.release_date?.substring(0, 4)} </h6>
      <h1 className="font-bold text-4xl"> {movieData.title} </h1>

      <div className="flex">
        {
          movieData.genres.map((genre: { id: number; name: string }, i: number) => (
            <h6 key={i} className="mt-2 me-3">{genre.name}</h6>
          ))
        }
      </div>

      <h1 className="mt-3">TMDB</h1>
      <div className="flex">
        {totalStars.map((star, i) => (
          <StarIcon key={i} className={`mt-2 h-5 w-5 ${star <= movieData.vote_average ? "text-yellow-400" : "text-soft-grey"}`} />
        ))}
      </div>

      <div className="flex mt-8">
        <div className="w-8/12">
          <div>
            <h1>Storyline</h1>
            <p className="text-light-grey mt-3">{movieData.tagline}</p>
            <p className="text-soft-grey mt-1">{movieData.overview}</p>
            <button className="rounded-lg mt-2 md:mt-10 px-5 py-2 bg-gradient-to-r from-[#f3001d] to-[#ff004d]">
              <Link href={`/get-movie/${movieData.id}`} className="text-white font-lexend md:text-lg rounded-md no-underline" style={{ textDecoration: "none" }}>Watch Now</Link>
            </button>
          </div>

          <div>
            <h1 className="mt-10 text-lg">More details</h1>
            <div className="grid grid-flow-col grid-rows-2 gap-4">
              <div className="mt-5 row-span-2 row-end-2 z-30">
                <h6>Languages</h6>
                <h6>Runtime</h6>
                <h6>Release Date</h6>
              </div>
              <div className="row-span-2 row-end-3 ms-5 mt-2 text-end text-soft-grey">
                {movieData.spoken_languages.map((lang: { english_name: string; name: string }, i: number) => (
                  <h6 key={i} className="me-3">{lang.english_name}</h6>
                ))}
                <p>{movieData.runtime} min</p>
                <p>{movieData.release_date}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/12"></div>
        <div className="w-3/12">
          Photos
        </div>
      </div>
    </div>
  )
}
