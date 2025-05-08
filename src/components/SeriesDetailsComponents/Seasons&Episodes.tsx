"use client"

import { EpisodeInterface, SeasonDetailsInterface, SeriesDetailsInterface } from "@/interfaces/SeriesDetails";
import axios from "axios";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown, Download } from "lucide-react";
import Link from "next/link";

export default function SeasonsAndEpisodes({ seriesData }: { seriesData: SeriesDetailsInterface }) {
    const [currentSeason, setCurrentSeason] = useState("1");
    const [seasonsData, setSeasonsData] = useState<SeasonDetailsInterface>({} as SeasonDetailsInterface);
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

            <div className="mt-5">
                {seasonsData.episodes && seasonsData.episodes.map((episode: EpisodeInterface, i: number) => (
                    <Link href={`/play-series/${seriesData.id}/${episode.season_number}}/${episode.episode_number}`} key={i} className="flex p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-900 hover:scale-102">
                        <img src={`https://image.tmdb.org/t/p/w500${episode.still_path}`} alt={episode.name} className="w-3/12 h-auto rounded-lg mb-2" />
                        <div className="justify-between p-5">
                            <h2 className="text-xl font-bold">S{episode.season_number} E{episode.episode_number} - {episode.name}</h2>
                            <p className="text-md font-semibold mt-3">{episode.air_date} &nbsp;<b>·</b>&nbsp; {episode.runtime > 60 ? `${Math.floor(episode.runtime / 60)}h ${episode.runtime % 60}min` : `${episode.runtime}min`}</p>
                            <p className="text-gray-500 mt-3">{episode.overview}</p>
                        </div>
                        <div className="w-2/12 flex justify-end items-center">
                            <Download className="mt-3 me-5" size={40} />
                        </div>
                    </Link>
                ))}

            </div>
        </div>
    )
}
