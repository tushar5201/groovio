import LeftSection from "@/components/MovieDetailsComponents/LeftSection";
import MiddleSection from "@/components/MovieDetailsComponents/MiddleSection";
import SimilarMovies from "@/components/MovieDetailsComponents/SimilarMovies";
import TopSection from "@/components/MovieDetailsComponents/TopSection";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params }: { params: Promise<{ movieId: string }> }) {
  const { movieId } = await params;
  const movie = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/get-movie-details/${movieId}`);
  const movieData = movie.data;

  const credits = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/get-movie-credits/${movieId}`);
  const creditsData = credits.data;

  return (
    <div className="relative w-full">
      <TopSection movieData={movieData} />
      <div className="ms-10 mt-10 text-white px-5 md:left-12 z-50">
        <Link href={"/"} className="flex">
          <Image
            src="/pink_rmbg_logo.png"
            width={125}
            height={100}
            alt="logo"
            className="z-20"
          />
        </Link>

        <div className="grid grid-flow-col grid-rows-2 gap-4 mt-5">
          <div className="mt-5 row-span-2 z-30">
            <LeftSection movieData={movieData} creditsData={creditsData} />
          </div>
          <MiddleSection movieData={movieData} creditsData={creditsData} />
        </div>
      </div>
      <SimilarMovies movieData={movieData} />
    </div>
  );
}
