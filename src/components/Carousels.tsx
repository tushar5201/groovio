import axios from "axios";
import CarouselClient from "./CarouselClient";

export default async function Carousel() {
  let movies = [];
  let genres = [];

  try {
    const [moviesRes, genresRes] = await Promise.all([
      axios.get(`https://groovio.vercel.app/api/carousel`),
      axios.get(`https://groovio.vercel.app/api/get-genres`)
    ]);

    // const moviesData = await moviesRes.json();
    // const genresData = await genresRes.json();
    // movies = moviesData.results || moviesData;
    // genres = genresData.genres;
    movies = moviesRes.data.results
    genres = genresRes.data.genres;
  } catch (err) {
    console.error("Failed to fetch carousel data", err);
  }

  if (!movies.length) return <div>No movies found</div>;

  return <CarouselClient movies={movies} genres={genres} />;
}
