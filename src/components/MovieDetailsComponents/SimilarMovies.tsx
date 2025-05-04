import { MovieDetailsInterface } from "@/interfaces/MovieDetails";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default async function SimilarMovies({ movieData }: { movieData: MovieDetailsInterface }) {
  const movieId = movieData.id;
  const movie = await axios.get(`${process.env.BASE_URL}/get-similar-movies/${movieId}`);
  const similarMovies = movie.data.results;
  return (
    <div className="ms-12 m-5">
      <h1 className="text-white text-2xl my-5">More Like This</h1><hr className="mb-10 border-soft-grey" />
      {similarMovies.length === 0 && <div className='text-soft-grey text-center w-full'>No similar movies available</div>}

      <div className="grid grid-flow-row grid-cols-8 gap-5">
        {similarMovies.map((movie: MovieDetailsInterface, i: number) => (
          movie.poster_path !== null && 
          <Link href={`/get-movie/${movie.id}`} key={i} className="relative overflow-hidden">
            <Image
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
              width={250}
              height={500}
              className="rounded-lg text-white"
            />
            {/* <div>
              <h3 className="text-white">{movie.title.length > 15 ? "Hii" : movie.title}</h3>
            </div> */}
            {/* <div className="absolute bottom-0 left-0 w-full h-[65%] bg-gradient-to-t from-[#232323] to-transparent rounded-b-3xl">
              <h3 className="text-white font-lexend mt-[75%]  group-hover:mt-0 transition-all duration-500 group-hover:font-bold">{movie.title}</h3>
              <p className="hidden px-5 text-sm text-light-grey text-justify group-hover:block">{movie.overview.substring(0, 100)}...</p>
              <button className="text-lg font-lexend rounded-xl mt-5 p-2 bg-gradient-to-r from-[#f3001d] to-[#ff004d] text-white align-end">
                Watch Now
              </button>
            </div> */}
          </Link>
        ))}
      </div>
    </div>
  )
}
