"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { SeriesInterface } from "@/interfaces/interface";
import axios from "axios";
import { useEffect, useState } from "react";

export default function LatestBollywoodSeries() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SeriesInterface[]>([]);

  useEffect(() => {
    const fetchSeries = async () => {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/get-latest-bollywood-series`);
      // const response = await res.json();
      setData(res.data.results);
      setLoading(false);
    }
    fetchSeries();
  }, [])

  return (
    <div>
      {loading ? <h1>loading...</h1> :
        <>
          <h1 className="my-4 md:mb-8 md:-mt-15 font-lexend text-white font-bold text-lg md:text-2xl flex"><div className="w-1 md:w-1.5 md:h-8 me-2 bg-[#FF004D]" />Bollywood Series</h1>
          <Carousel opts={{ align: "start" }} className="w-full overflow-hidden md:overflow-visible">
            <CarouselContent>
              {data.map((series: SeriesInterface, i: number) => (
                <CarouselItem key={i} className="basis-1/3 md:basis-1/2 lg:basis-1/7">
                  <Link href={`/get-series/${series.id}`} key={i} className="relative overflow-hidden md:rounded-xl group">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMG_URL}/${series.poster_path}`}
                      alt={series.name}
                      width={250}
                      height={500}
                      className="rounded-md md:rounded-xl movie-img z-50 group-hover:blur-xs"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-[70%] bg-gradient-to-t from-[#232323] to-transparent md:rounded-b-xl">
                      <Image
                        src="/play-button.png"
                        width={50}
                        height={50}
                        alt={series.name}
                        className="hidden ms-[40%] mt-5 group-hover:block transition-all duration-500"
                      />
                      <h3 className="text-white group-hover:mt-[50%] mt-[80%] text-center transition-all duration-400 group-hover:font-bold truncate md:text-sm">{series.name.length > 20 ? series.name.substring(0, 20) + "..." : series.name}</h3>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </>
      }
    </div>
  )
}
