import LeftSection from "@/components/MovieDetailsComponents/LeftSection";
import MiddleSection from "@/components/MovieDetailsComponents/MiddleSection";
import SimilarMovies from "@/components/MovieDetailsComponents/SimilarMovies";
import TopSection from "@/components/MovieDetailsComponents/TopSection";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function Page({ params }: { params: Promise<{ movieId: string }> }) {
  const { movieId } = await params;
  const movie = await axios.get(`${process.env.BASE_URL}/get-movie-details/${movieId}`);
  const movieData = movie.data;

  const credits = await axios.get(`${process.env.BASE_URL}/get-movie-credits/${movieId}`);
  const creditsData = credits.data;

  return (
    <div className="relative w-full ps-[3.7rem]">
      <TopSection movieData={movieData} />
      <div className="absolute text-white bottom-20 px-5 md:left-12 z-50 top-10">
        <Link href={"/"} className="flex">
          <ArrowLeft className="text-soft-grey" />
          <h2 className="text-soft-grey ms-5 md:text-md">{movieData.tagline ? `${movieData.title} : ${movieData.tagline}` : movieData.title}</h2>
        </Link>

        <div className="grid grid-flow-col grid-rows-2 gap-4 mt-5">
          <div className="mt-5 row-span-2 z-30">
            <LeftSection movieData={movieData} creditsData={creditsData} />
          </div>
          <MiddleSection movieData={movieData} creditsData={creditsData}  />
        </div>
      </div>

      <SimilarMovies />
    </div>
  );
}
