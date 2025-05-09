"use client";

import MovieSection from "@/components/Search/MovieSection";
import SeriesSection from "@/components/Search/SeriesSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { GenreInterface } from "@/interfaces/interface";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {

  const [genresDataMovie, setGenresDataMovie] = useState<GenreInterface[]>([]);
  const [genresDataSeries, setGenresDataSeries] = useState<GenreInterface[]>([]);
  const [selectedGenresMovies, setSelectedGenresMovies] = useState<number[]>([]);
  const [selectedGenresSeries, setSelectedGenresSeries] = useState<number[]>([]);
  const [selectedRating, setSelectedRating] = useState<number[]>([0]);
  const [search, setSearch] = useState("");
  const [currentCategory, setCategory] = useState("Movies")

  useEffect(() => {
    const fetchGenresMovie = async () => {
      try {
        const genres = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/get-genres`);
        const genresData = genres.data.genres;
        setGenresDataMovie(genresData);
      } catch (err) {
        console.error("Error fetching genres:", err);
      }
    };
    fetchGenresMovie();
  }, []);

  useEffect(() => {
    const fetchGenresSeries = async () => {
      try {
        const genres = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/get-series-genres`);
        const genresData = genres.data.genres;
        setGenresDataSeries(genresData);
      } catch (err) {
        console.error("Error fetching genres:", err);
      }
    };
    fetchGenresSeries();
  }, []);

  const getContentMovie = async (genreId: number) => {
    if (selectedGenresMovies.includes(genreId)) {
      setSelectedGenresMovies(selectedGenresMovies.filter(item => item !== genreId))
    } else {
      setSelectedGenresMovies([...selectedGenresMovies, genreId])
    }
  };

  const getContentSeries = async (genreId: number) => {
    if (selectedGenresSeries.includes(genreId)) {
      setSelectedGenresSeries(selectedGenresSeries.filter(item => item !== genreId))
    } else {
      setSelectedGenresSeries([...selectedGenresSeries, genreId])
    }
  };

  return (
    <div className="flex w-full p-5">
      <Card className="w-2/12 h-full bg-light-blue border-0">
        <CardContent>
          <Accordion type="multiple" className="w-full" defaultValue={["item-1"]}>
            <AccordionItem value="item-1">
              <AccordionTrigger>Genres</AccordionTrigger>
              <AccordionContent>

                {currentCategory === "Movies" ?
                  genresDataMovie.map((genre: GenreInterface, i: number) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                      <Checkbox id={`genre-${i}`} onCheckedChange={() => getContentMovie(genre.id)} />
                      <h6 className="text-md">{genre.name}</h6>
                    </div>
                  ))
                  :
                  genresDataSeries.map((genre: GenreInterface, i: number) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                      <Checkbox id={`genre-${i}`} onCheckedChange={() => getContentSeries(genre.id)} />
                      <h6 className="text-md">{genre.name}</h6>
                    </div>
                  ))
                }
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Rating</AccordionTrigger>
              <AccordionContent>
                <Slider className="w-full mt-2" min={0} max={10} onValueChange={(value) => setSelectedRating(value)} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      <div className="text-white w-10/12 ms-10">
        <div className="flex">
          <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="w-5/12 md:me-20 rounded-xl top-0 right-0 h-10 text-white bg-light-blue p-3 items-end justify-end " />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"secondary"}>{currentCategory}<ChevronDown /></Button>
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

        <h1 className="text-white text-2xl mt-5">{search === "" ? "New Arrivals" : `Results for ${search}`}</h1>
        {currentCategory === "Movies" ?
          <MovieSection selectedGenres={selectedGenresMovies} selectedRating={selectedRating} />
          : <SeriesSection selectedGenres={selectedGenresSeries} selectedRating={selectedRating} />
        }
      </div>
    </div>
  )
}
