import { MovieDetailsInterface } from "@/interfaces/MovieDetails";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default async function SimilarMovies({ movieData }: { movieData: MovieDetailsInterface }) {
  const movieId = movieData.id;
  const movie = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/get-similar-movies/${movieId}`);
  const similarMovies = movie.data.results;
  return (
    <div className="ms-12 m-5">
      <h1 className="text-white text-2xl my-5">More Like This</h1><hr className="mb-10 border-soft-grey" />
      {similarMovies.length === 0 && <div className='text-soft-grey text-center w-full'>No similar movies available</div>}

      <div className="grid grid-flow-row grid-cols-8 gap-5">
        {similarMovies.map((movie: MovieDetailsInterface, i: number) => (
          movie.poster_path !== null && 
          <Link href={`/get-movie/${movie.id}`} key={i} className="relative overflow-hidden hover:scale-110 transition-all duration-300">
            <Image
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
              width={250}
              height={500}
              className="rounded-lg text-white"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
