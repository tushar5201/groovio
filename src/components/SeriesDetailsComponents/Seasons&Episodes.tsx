"use client"

import { SeasonDetailsInterface, SeriesDetailsInterface } from "@/interfaces/SeriesDetails";
import axios from "axios";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

export default function SeasonsAndEpisodes({ seriesData }: { seriesData: SeriesDetailsInterface }) {
    const [currentSeason, setCurrentSeason] = useState("1");
    const [seasonsData, setSeasonsData] = useState<SeasonDetailsInterface[]>([]);
    useEffect(() => {
        const fetchSeasonDetails = async () => {
            try {
                const seasons = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/get-season-details/${seriesData.id}/${parseInt(currentSeason)}`);
                setSeasonsData(seasons.data);    
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchSeasonDetails();
    }, [currentSeason, seriesData.id]);

    return (
        <div className="m-5">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"secondary"}>Season {currentSeason} <ChevronDown /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={currentSeason} onValueChange={setCurrentSeason}>
                        {seriesData.seasons.map((season, i) => (
                            <DropdownMenuRadioItem key={i} value={season.season_number.toString()} className="cursor-pointer">
                                {season.name}
                            </DropdownMenuRadioItem>
                        ))}
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem> */}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <h1 className="text-white">{seasonsData?.[0]?.name || "Season Details"}</h1>
        </div>
    )
}
