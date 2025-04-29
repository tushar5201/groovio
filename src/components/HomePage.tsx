import { CarouselMovieInterface } from "@/interfaces/interface";
import axios from "axios"
import Image from "next/image";
import Link from "next/link";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

export default async function HomePage() {
    const res = await axios("https://movie-bphs.onrender.com/get-latest-bollywood-movies");
    const data = res.data.results;
    return (
        <div className="text-center mx-40">
            <h1 className="my-10 font-lexend text-white font-bold text-4xl">Recommendations</h1>
            <div className="grid grid-flow-col grid-rows-4 gap-5">
                {data.map((movie: CarouselMovieInterface, i: number) => (
                    <Link href={`/movie/${movie.id}`} key={i} className="relative overflow-hidden rounded-3xl group">
                        <Image
                            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                            alt={movie.title}
                            width={250}
                            height={500}
                            className="rounded-3xl movie-img z-50 group-hover:blur-sm"
                        />
                        <div className="absolute bottom-0 left-0 w-full h-[65%] bg-gradient-to-t from-[#232323] to-transparent rounded-b-3xl">
                            <h3 className="text-white font-lexend mt-[75%]  group-hover:mt-0 transition-all duration-500 group-hover:font-bold">{movie.title}</h3>
                            <p className="hidden px-5 text-sm text-light-grey text-justify group-hover:block">{movie.overview.substring(0, 100)}...</p>
                            <button className="text-lg font-lexend rounded-xl mt-5 p-2 bg-gradient-to-r from-[#f3001d] to-[#ff004d] text-white align-end">
                                Watch Now
                            </button>
                        </div>

                        {/* <div className="absolute bottom-0 left-0 w-full h-full opacity-0 hover:opacity-100"> 
                            <h3>{movie.title}</h3>
                         </div> */}
                    </Link>
                ))}
            </div>
        </div>
    )
}
