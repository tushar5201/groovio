"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { CarouselGenreInterface, CarouselMovieInterface } from '@/interfaces/interface';

interface CarouselClientProps {
    movies: CarouselMovieInterface[];
    genres: CarouselGenreInterface[];
}

const CarouselClient = ({ movies, genres }: CarouselClientProps) => {
    console.log(process.env.BASE_URL);
    
    return (
        <div className="swiper-container">
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
                className="mySwiper"
            >
                {movies.map((movie: CarouselMovieInterface, i: number) => (
                    <>
                        {
                            movie.backdrop_path !== null &&
                            <SwiperSlide key={i}>
                                <div className="slide-image-container">
                                    <Image
                                        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                                        alt={movie.original_title}
                                        fill
                                        priority
                                        className="img-carousel"
                                        sizes="100vw"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div className="gradient-overlay"></div>
                                    <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-[#020916] via-[#0b1120cc] to-transparent z-10 pointer-events-none"></div>

                                    <div className="absolute text-white bottom-20 left-25 z-50">
                                        <h2 className="text-white text-3xl font-semibold">{movie.title}</h2>
                                        <div className="flex mt-2">
                                            {movie.genre_ids.map((genre, i: number) => (
                                                <div key={i}>
                                                    {genres.map((g: CarouselGenreInterface, j: number) => (
                                                        <h6 key={j} className="mt-2 me-2">
                                                            {genre === g.id && g.name}
                                                        </h6>
                                                    ))}
                                                </div>
                                            ))}
                                            <h6 className="mt-2">
                                                &nbsp;&nbsp;<b>·</b>&nbsp;&nbsp;{movie.release_date?.substring(0,4)}
                                            </h6>
                                        </div>
                                        <p className="w-[50%] text-light-grey">
                                            {movie.overview?.substring(0, 200)}...
                                        </p>
                                        <button className="text-2xl font-lexend rounded-lg mt-5 px-4 py-1.5 bg-gradient-to-r from-[#f3001d] to-[#ff004d]" style={{ borderRadius: "15px" }}>
                                            <Link href={`/movie/${movie.id}`} className="text-white font-lexend text-lg rounded-md no-underline" style={{ textDecoration: "none" }}>Watch Now</Link>
                                        </button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        }
                    </>
                ))}
            </Swiper>
        </div>
    );
};

export default CarouselClient;
