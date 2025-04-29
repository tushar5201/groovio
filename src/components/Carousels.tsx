import { baseUrl } from "@/lib/utils";
import CarouselClient from "./CarouselClient";

export default async function Carousel() {
  let movies = [];
  let genres = [];

  try {
    const [moviesRes, genresRes] = await Promise.all([
      fetch(`/api/carousel`),
      fetch(`/api/get-genres`)
    ]);

    if (moviesRes.status === 200) {
      const moviesData = await moviesRes.json();
      const genresData = await genresRes.json();
      movies = moviesData.results || moviesData;
      genres = genresData.genres;  
    } else {
      throw new Error("Unexpected")
    }
    
  } catch (err) {
    console.error("Failed to fetch carousel data", err);
  }

  if (!movies.length) return <div>No movies found</div>;

  return <CarouselClient movies={movies} genres={genres} />;
}
