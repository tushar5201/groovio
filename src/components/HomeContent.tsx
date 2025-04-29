import axios from "axios"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { CarouselMovieInterface } from "@/interfaces/interface";
import { baseUrl, imageUrl } from "@/lib/utils";

export default async function HomeContent() {
    const res = await fetch(`${baseUrl}/get-latest-bollywood-movies`);
    const response = await res.json();
    const data = response.results;
    return (
        <div className="px-15">
            <h1 className="my-8 font-lexend text-white font-bold text-2xl flex"><div className="w-1.5 h-8 me-2 bg-[#FF004D]" />Bollywood Movies</h1>
            <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                    {data.map((movie: CarouselMovieInterface, i: number) => (
                        <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/7">
                            <Link href={`/movie/${movie.id}`} key={i} className="relative overflow-hidden rounded-xl group">
                                <Image
                                    src={`${imageUrl}/${movie.poster_path}`}
                                    alt={movie.title}
                                    width={250}
                                    height={500}
                                    className="rounded-xl movie-img z-50 group-hover:blur-xs"
                                />
                                <div className="absolute bottom-0 left-0 w-full h-[70%] bg-gradient-to-t from-[#232323] to-transparent rounded-b-xl">
                                    <Image
                                        src="/play-button.png"
                                        width={50}
                                        height={50}
                                        alt={movie.title}
                                        className="hidden ms-[40%] mt-5 group-hover:block transition-all duration-500"
                                    />
                                    <h3 className="text-white group-hover:mt-[50%] mt-[80%] text-center transition-all group-hover:font-bold text-sm">{movie.title.length > 20 ? movie.title.substring(0, 20) + "..." : movie.title}</h3>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>


            <div className="h-[500px]"></div>
        </div>
    )
}
