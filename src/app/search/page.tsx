"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { GenreInterface } from "@/interfaces/interface";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {

  const [genresData, setGenresData] = useState<GenreInterface[]>([]);

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


  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const getContent = async (genreId: number) => {
    setSelectedGenres([...selectedGenres, genreId])
  };

  return (
    <div className="w-full p-5">
      <Card className="w-2/12 h-full bg-light-blue border-0">
        <CardContent>
          <Accordion type="multiple" className="w-full" defaultValue={["item-1"]}>
            <AccordionItem value="item-1">
              <AccordionTrigger>Genres</AccordionTrigger>
              <AccordionContent>
                {genresData.map((genre: GenreInterface, i: number) => (
                  <div key={i}>
                    <Checkbox id={`genre-${i}`} onCheckedChange={() => getContent(genre.id)} />
                    <h6>{genre.name}</h6>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      <h1 className="text-white">hii{selectedGenres}</h1>
    </div>
  )
}
