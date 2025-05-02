import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { MovieInterface } from "@/interfaces/interface";
import axios from "axios";

export default async function LatestBollywoodMovies() {
  const res = await axios.get(`${process.env.BASE_URL}/get-latest-bollywood-movies`);
  // const response = await res.json();
  const data = res.data.results;
  return (
    <div>
      <h1 className="my-4 md:my-8 font-lexend text-white font-bold text-lg md:text-2xl flex"><div className="w-1 md:w-1.5 md:h-8 me-2 bg-[#FF004D]" />Bollywood Movies</h1>
      <Carousel opts={{ align: "start" }} className="w-full overflow-hidden md:overflow-visible">
        <CarouselContent>
          {data.map((movie: MovieInterface, i: number) => (
            <CarouselItem key={i} className="basis-1/3 md:basis-1/2 lg:basis-1/7">
              <Link href={`/get-movie/${movie.id}`} key={i} className="relative overflow-hidden md:rounded-xl group">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}/${movie.poster_path}`}
                  alt={movie.title}
                  width={250}
                  height={500}
                  className="rounded-md md:rounded-xl movie-img z-50 group-hover:blur-xs"
                />
                <div className="absolute bottom-0 left-0 w-full h-[70%] bg-gradient-to-t from-[#232323] to-transparent md:rounded-b-xl">
                  <Image
                    src="/play-button.png"
                    width={50}
                    height={50}
                    alt={movie.title}
                    className="hidden ms-[40%] mt-5 group-hover:block transition-all duration-500"
                  />
                  <h3 className="text-white group-hover:mt-[50%] mt-[80%] text-center transition-all duration-400 group-hover:font-bold truncate md:text-sm">{movie.title.length > 20 ? movie.title.substring(0, 20) + "..." : movie.title}</h3>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
