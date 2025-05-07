import { SeriesDetailsInterface } from "@/interfaces/SeriesDetails";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TopBannerSection({ seriesData }: { seriesData: SeriesDetailsInterface }) {
    return (
        <div className="w-full h-screen">
            <Image
                src={`${process.env.NEXT_PUBLIC_IMG_URL}/${seriesData.backdrop_path}`}
                alt={seriesData.name}
                fill
                className='absolute object-cover rounded-bl-4xl rounded-br-4xl -z-10 h-screen!'
            />
            <div className='gradient-overlay h-screen! rounded-b-4xl z-10'></div>
            <div className='absolute top-0 left-0 w-full h-screen bg-gradient-to-t from-[#020916] to-transparent z-10 pointer-events-none'></div>

            <div className="absolute text-white top-50 px-5 md:left-12 z-20 w-150">
                <div className="flex">
                    <Image
                        src="/pink_rmbg_logo.png"
                        width={150}
                        height={100}
                        alt="logo"
                    />

                    {/* <h2 className="text-end items-end justify-end">presents</h2> */}
                </div>
                <h2 className="mt-5 text-white text-lg md:text-6xl font-bold">{seriesData.name}</h2>
                <h6 className="md:mt-5 text-lg">{seriesData.overview.length > 300 ? `${seriesData.overview.substring(0, 300)} ...` : seriesData.overview}</h6>
                <div className="flex md:mt-2">
                    <h6 className="mt-2 text-soft-grey text-lg">TMDB &nbsp; {seriesData.vote_average}&nbsp;&nbsp;<b>·</b>&nbsp;&nbsp;</h6>

                    {seriesData.genres.map((genre, i) => (
                        <div key={i}>
                            {i < 3 && <h6 className="mt-2 me-2 text-soft-grey text-lg">{genre.name}</h6>}
                            {/* <h6 className="mt-2 me-2 text-soft-grey text-lg">{genre.name}</h6> */}
                        </div>
                    ))}
                    <h6 className="mt-2 text-soft-grey text-lg">&nbsp;&nbsp;<b>·</b>&nbsp;&nbsp;{seriesData.adult ? "A" : "U/A 16+"}</h6>
                    <h6 className="mt-2 text-soft-grey text-lg">&nbsp;&nbsp;<b>·</b>&nbsp;&nbsp;{seriesData.first_air_date?.substring(0, 4)}</h6>
                    <h6 className="mt-2 text-soft-grey text-lg">
                        &nbsp;&nbsp;<b>·</b>&nbsp;&nbsp;
                        {seriesData.number_of_seasons === 1 ? `${seriesData.number_of_episodes} Episodes` : `${seriesData.number_of_seasons} Seasons`}
                    </h6>
                </div>

                <div className="mt-10">
                    <button className="rounded-lg mt-2 md:mt-10 px-5 py-3 bg-gradient-to-r from-[#f3001d] to-[#ff004d] hover:scale-105 transition-all duration-300">
                        <Link href={`/play-movie/${seriesData.id}`} className="text-white font-lexend md:text-2xl rounded-md no-underline" style={{ textDecoration: "none" }}>Watch Now</Link>
                    </button>

                    <button className="bg-soft-grey rounded-lg px-5 py-3 ms-5 md:mt-10 hover:scale-105 transition-all duration-300">
                        <Link href={`/get-movie/${seriesData.id}`} className="text-white font-lexend md:text-xl rounded-md no-underline" style={{ textDecoration: "none" }}>
                            <Heart />
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}
