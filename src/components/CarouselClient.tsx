"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { GenreInterface, MovieInterface } from '@/interfaces/interface';
import "react-slideshow-image/dist/styles.css"
import { Zoom } from "react-slideshow-image"
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

interface CarouselClientProps {
    movies: MovieInterface[];
    genres: GenreInterface[];
}

const CarouselClient = ({ movies, genres }: CarouselClientProps) => {

    return (
        <div>
            <Swiper
                effect="fade"
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
            >
                {movies.map((movie: MovieInterface, i: number) => (
                    <div key={i}>
                        {
                            movie.backdrop_path !== null &&
                            <SwiperSlide key={i}>
                                <div className="slide-image-container">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_IMG_URL}/${movie.backdrop_path}`}
                                        alt={movie.original_title}
                                        fill
                                        priority
                                        className="img-carousel"
                                        sizes="100vw"
                                    />
                                    <div className="gradient-overlay"></div>
                                    <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-[#020916] via-[#0b1120cc] to-transparent z-10 pointer-events-none"></div>

                                    <div className="absolute text-white bottom-20 px-5 md:left-12 z-50">
                                        <h2 className="text-white text-lg md:text-3xl font-semibold">{movie.title}</h2>
                                        <div className="flex md:mt-2">
                                            {movie.genre_ids.map((genre, i) => (
                                                <div key={i}>
                                                    {genres.map((g: GenreInterface, j: number) => (
                                                        <h6 key={j} className="mt-2 me-2">
                                                            {genre === g.id && g.name}
                                                        </h6>
                                                    ))}
                                                </div>
                                            ))}
                                            <h6 className="mt-2">
                                                &nbsp;&nbsp;<b>·</b>&nbsp;&nbsp;{movie.release_date?.substring(0, 4)}
                                            </h6>
                                        </div>
                                        <p className="hidden md:block w-[50%] text-light-grey">
                                            {movie.overview?.substring(0, 200)}...
                                        </p>
                                        <button className="rounded-lg mt-2 md:mt-5 px-4 py-1.5 bg-gradient-to-r from-[#f3001d] to-[#ff004d]">
                                            <Link href={`/movie/${movie.id}`} className="text-white font-lexend md:text-lg rounded-md no-underline" style={{ textDecoration: "none" }}>Watch Now</Link>
                                        </button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        }
                    </div>
                ))}
            </Swiper>
        </div>
    );
};

export default CarouselClient;


// export default function CarouselClient({ movies, genres }: CarouselClientProps) {
//     const zoomInProperties = {
//         scale: 1,
//         duration: 5000,
//         transitionDuration: 300,
//         infinity: true,
//         prevArrow: (
//             <div className='ml-10 top-40 md:top-72'>
//                 <ArrowLeftIcon className='h-8 w-8 text-white cursor-pointer' />
//             </div>
//         ),
//         nextArrow: (
//             <div className='ml-10 top-40 md:top-72'>
//                 <ArrowRightIcon className='h-8 w-8 text-white cursor-pointer' />
//             </div>
//         ),
//     }
//     return (
//         <div className='w-screen h-screen z-30'>
//             <Zoom {...zoomInProperties}>
//                 {movies.map((movie: MovieInterface, i: number) => (

//                     <div key={i} className='flex justify-center md:items-center items-start w-screen h-screen relative'>
//                         <img className='w-screen' src={`${process.env.NEXT_PUBLIC_IMG_URL}/${movie.backdrop_path}`} alt={movie.title} />
//                     </div>
//                 ))}
//             </Zoom>
//         </div>
//     )
// }
