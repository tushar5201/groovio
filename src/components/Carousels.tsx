import axios from "axios";
import CarouselClient from "./CarouselClient";

export default async function Carousel() {
  let movies = [];
  let genres = [];

  try {
    const [moviesRes, genresRes] = await Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/carousel`),
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/get-genres`)
    ]);

    movies = moviesRes.data.results
    genres = genresRes.data.genres;
  } catch (err) {
    console.error("Failed to fetch carousel data", err);
  }

  if (!movies.length) return <div>No movies found</div>;

  return <CarouselClient movies={movies}  genres={genres} />;
}
