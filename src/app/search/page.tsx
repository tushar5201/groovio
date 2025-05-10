"use client";

import MovieSection from "@/components/Search/MovieSection";
import SeriesSection from "@/components/Search/SeriesSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton"; // Add this import
import { GenreInterface } from "@/interfaces/interface";
import { TrendingInterface } from "@/interfaces/Search";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CategorywiseSkeleton from "@/components/Search/CategorywiseSkeleton";

export default function Page() {
  const [genresDataMovie, setGenresDataMovie] = useState<GenreInterface[]>([]);
  const [genresDataSeries, setGenresDataSeries] = useState<GenreInterface[]>([]);
  const [selectedGenresMovies, setSelectedGenresMovies] = useState<number[]>([]);
  const [selectedGenresSeries, setSelectedGenresSeries] = useState<number[]>([]);
  const [selectedRating, setSelectedRating] = useState<number[]>([5]);
  const [search, setSearch] = useState("");
  const [currentCategory, setCategory] = useState("Movies");
  const [searchData, setSearchData] = useState<TrendingInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [genresLoading, setGenresLoading] = useState(true); // Add loading state for genres

  useEffect(() => {
    const fetchGenresMovie = async () => {
      try {
        setGenresLoading(true);
        const genres = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/get-genres`);
        const genresData = genres.data.genres;
        setGenresDataMovie(genresData);
        setGenresLoading(false);
      } catch (err) {
        console.error("Error fetching genres:", err);
        setGenresLoading(false);
      }
    };
    fetchGenresMovie();
  }, []);

  useEffect(() => {
    const fetchGenresSeries = async () => {
      try {
        setGenresLoading(true);
        const genres = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/get-series-genres`);
        const genresData = genres.data.genres;
        setGenresDataSeries(genresData);
        setGenresLoading(false);
      } catch (err) {
        console.error("Error fetching genres:", err);
        setGenresLoading(false);
      }
    };
    fetchGenresSeries();
  }, []);

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/search/${search}`);
        setSearchData(res.data.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchSearch();
  }, [search]);

  const getGenreMovie = async (genreId: number) => {
    if (selectedGenresMovies.includes(genreId)) {
      setSelectedGenresMovies(selectedGenresMovies.filter(item => item !== genreId))
    } else {
      setSelectedGenresMovies([...selectedGenresMovies, genreId])
    }
  };

  const getGenreSeries = async (genreId: number) => {
    if (selectedGenresSeries.includes(genreId)) {
      setSelectedGenresSeries(selectedGenresSeries.filter(item => item !== genreId))
    } else {
      setSelectedGenresSeries([...selectedGenresSeries, genreId])
    }
  };

  return (
    <div className="flex w-full p-5">
      <Card className="w-2/12 h-screen bg-light-blue border-0">
        <CardContent>
          <Accordion type="multiple" className="w-full" defaultValue={["item-1"]}>
            <AccordionItem value="item-1">
              <AccordionTrigger>Genres</AccordionTrigger>
              <AccordionContent>
                {genresLoading ? (
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center gap-2 mb-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    ))}
                  </div>
                ) : currentCategory === "Movies" ? (
                  genresDataMovie.map((genre: GenreInterface, i: number) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                      <Checkbox id={`genre-${i}`} onCheckedChange={() => getGenreMovie(genre.id)} />
                      <h6 className="text-md">{genre.name}</h6>
                    </div>
                  ))
                ) : (
                  genresDataSeries.map((genre: GenreInterface, i: number) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                      <Checkbox id={`genre-${i}`} onCheckedChange={() => getGenreSeries(genre.id)} />
                      <h6 className="text-md">{genre.name}</h6>
                    </div>
                  ))
                )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                Rating <span className="text-end">{selectedRating}</span>
              </AccordionTrigger>
              <AccordionContent>
                <Slider className="w-full mt-2" min={0} max={10} value={selectedRating} onValueChange={(value) => setSelectedRating(value)} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      <div className="text-white w-10/12 ms-10">
        <div className="flex">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-5/12 md:me-20 rounded-xl top-0 right-0 h-10 text-white bg-light-blue p-3 items-end justify-end"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"secondary"}>
                {currentCategory}
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={currentCategory} onValueChange={setCategory}>
                <DropdownMenuRadioItem value="Movies" className="cursor-pointer">
                  Movies
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Series" className="cursor-pointer">
                  Series
                </DropdownMenuRadioItem>
                <DropdownMenuSeparator />
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {search === "" ? (
          <div>
            <h1 className="text-white text-2xl mt-5">New Arrivals</h1>
            {currentCategory === "Movies" ? (
              <MovieSection selectedGenres={selectedGenresMovies} selectedRating={selectedRating} />
            ) : (
              <SeriesSection selectedGenres={selectedGenresSeries} selectedRating={selectedRating} />
            )}
          </div>
        ) : (
          <div>
            <h1>Search Results for {search}</h1>
            <div className="w-full grid grid-cols-6 gap-5 mt-5">
              {loading ? (
                <CategorywiseSkeleton />
              ) : (
                searchData.map((data, i) =>
                  data.media_type !== "person" && data.media_type === "movie" ? (
                    <Link href={`/get-movie/${data.id}`} key={i} className="rounded-3xl">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.poster_path}`}
                        alt={data.title || "data.name"}
                        width={250}
                        height={500}
                        className="rounded-3xl hover:scale-110 transition-all duration-300"
                      />
                    </Link>
                  ) : (
                    <Link href={`/get-series/${data.id}`} key={i} className="rounded-3xl">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.poster_path}`}
                        alt={data.title || "data.name"}
                        width={250}
                        height={500}
                        className="rounded-3xl hover:scale-110 transition-all duration-300"
                      />
                    </Link>
                  )
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}