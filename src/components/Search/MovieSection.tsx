"use client"
import { MovieDetailsInterface } from "@/interfaces/MovieDetails";
import { TrendingInterface } from "@/interfaces/Search";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import Link from "next/link";

export default function MovieSection({ selectedGenres, selectedRating }: { selectedGenres: number[], selectedRating: number[] }) {

    const [trending, setTrending] = useState<TrendingInterface[]>([]);
    const [genreWiseMoviesData, setGenreWiseMoviesData] = useState<MovieDetailsInterface[]>([]);
    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/get-trending-movies/`);
                setTrending(res.data.results);
            } catch (error) {
                console.log(error);
            }
        }

        fetchTrending();
    }, []);

    useEffect(() => {
        const getGenreWiseMovieData = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/get-genre-wise-movie/${selectedGenres.join(",")}/${selectedRating}`);
                setGenreWiseMoviesData(res.data.results);
            } catch (error) {
                console.log(error);
            }
        }

        getGenreWiseMovieData();
    }, [selectedGenres]);

    return (
        <div>
            <div className="grid grid-cols-3 gap-4 mt-5">
                {trending.map((media, i) => (
                    i < 3 &&
                    <Card key={i} className="grid grid-cols-2 bg-light-blue border-0 pe-5">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_IMG_URL}/${media.poster_path}`}
                            alt={`${media.original_title}`}
                            width={150}
                            height={100}
                            className="object-cover ms-5 rounded-xl"
                        />
                        <div>
                            {media.media_type === "movie" ?
                                <>
                                    <h1 className="text-white text-xl font-bold">{media.title}</h1>
                                    <h2 className="text-white">{media.release_date?.substring(0, 4)}</h2>
                                    <h5 className="text-soft-grey text-sm mt-2 text-justify">{media.overview.length > 100 ? media.overview.substring(0, 100) + "..." : media.overview}</h5>
                                    <button className="text-white bg-pink w-full p-2 rounded-lg mt-3">
                                        <Link href={`/get-movie/${media.id}`}>
                                            Watch Now
                                        </Link>
                                    </button>
                                </>
                                :
                                <>
                                    <h1 className="text-white text-xl font-bold">{media.name}</h1>
                                    <h2 className="text-white">{media.first_air_date?.substring(0, 4)}</h2>
                                    <h5 className="text-soft-grey text-sm mt-2 text-justify">{media.overview.length > 100 ? media.overview.substring(0, 100) + "..." : media.overview}</h5>
                                    <button className="text-white bg-pink w-full p-2 rounded-lg mt-3">
                                        <Link href={`/get-series/${media.id}`}>
                                            Watch Now
                                        </Link>
                                    </button>
                                </>
                            }
                        </div>
                    </Card>
                ))}
            </div>
            <h1 className="text-white text-2xl mt-10">Category Wise Movies</h1>
            <div className="w-full grid grid-cols-6 gap-5 mt-5">
                {genreWiseMoviesData.map((movie, i) => (
                    i < 12 &&
                    <Link href={`/get-movie/${movie.id}`} key={i} className="rounded-3xl">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_IMG_URL}/${movie.poster_path}`}
                            alt={movie.title}
                            width={250}
                            height={500}
                            className="rounded-3xl hover:scale-110 transition-all duration-300"
                        />
                    </Link>
                ))}
            </div>

        </div>
    )
}
