import LeftSection from "@/components/MovieDetailsComponents/LeftSection";
import MiddleSection from "@/components/MovieDetailsComponents/MiddleSection";
import SimilarMovies from "@/components/MovieDetailsComponents/SimilarMovies";
import TopSection from "@/components/MovieDetailsComponents/TopSection";
import { notFound } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params }: { params: { movieId: string } }) {
  try {
    const { movieId } = params; // No need to await, params is already resolved
    
    // Use fetch instead of axios for better compatibility with server components
    const [movieRes, creditsRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-movie-details/${movieId}`),
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-movie-credits/${movieId}`)
    ]);

    if (!movieRes.ok || !creditsRes.ok) {
      return notFound();
    }

    const [movieData, creditsData] = await Promise.all([
      movieRes.json(),
      creditsRes.json()
    ]);

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
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return notFound();
  }
}