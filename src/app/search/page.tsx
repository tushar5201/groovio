"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { GenreInterface } from "@/interfaces/interface";
import { TrendingInterface } from "@/interfaces/Search";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {

  const [genresData, setGenresData] = useState<GenreInterface[]>([]);
  const [trending, setTrending] = useState<TrendingInterface[]>([]);

  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedRating, setSelectedRating] = useState<number[]>([0]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genres = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/get-genres`);
        const genresData = genres.data.genres;
        setGenresData(genresData);
      } catch (err) {
        console.error("Error fetching genres:", err);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/get-trending`);
        console.log(res.data.results);
        
        setTrending(res.data.results);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTrending();
  }, []);

  const getContent = async (genreId: number) => {
    setSelectedGenres([...selectedGenres, genreId])
  };

  return (
    <div className="flex w-full p-5">
      <Card className="w-2/12 h-full bg-light-blue border-0">
        <CardContent>
          <Accordion type="multiple" className="w-full" defaultValue={["item-2"]}>
            <AccordionItem value="item-1">
              <AccordionTrigger>Genres</AccordionTrigger>
              <AccordionContent>
                {genresData.map((genre: GenreInterface, i: number) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <Checkbox id={`genre-${i}`} onCheckedChange={() => getContent(genre.id)} />
                    <h6 className="text-md">{genre.name}</h6>
                  </div>
                ))}
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
      <div className="text-white w-9/12 ms-10">
        <div className="flex">
          <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="w-5/12 md:me-20 rounded-xl top-0 right-0 h-10 text-white bg-light-blue p-3 items-end justify-end " />
        </div>

        <h1 className="text-white text-4xl mt-5">{search === "" ? "New Arrivals" : `Results for ${search}`}</h1>
        <h1>{selectedRating}</h1>
        {trending.map((media) => (
          <>
            <h1 className="text-white text-5xl">{media.original_title || "Hii"}</h1>
          </>
        ))}
      </div>
    </div>
  )
}
