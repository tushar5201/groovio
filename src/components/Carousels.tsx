import { baseUrl } from "@/lib/utils";
import CarouselClient from "./CarouselClient";

export default async function Carousel() {
  let movies = [];
  let genres = [];

  try {
    const [moviesRes, genresRes] = await Promise.all([
      fetch(`${baseUrl}/carousel`, { cache: "no-store" }),
      fetch(`${baseUrl}/get-genres`, { cache: "no-store" })
    ]);

    const moviesData = await moviesRes.json();
    const genresData = await genresRes.json();

    movies = moviesData.results || moviesData;
    genres = genresData.genres;

  } catch (err) {
    console.error("Failed to fetch carousel data", err);
  }

  if (!movies.length) return <div>No movies found</div>;

  return <CarouselClient movies={movies} genres={genres} />;
}
