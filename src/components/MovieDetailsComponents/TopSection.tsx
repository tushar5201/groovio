import { MovieDetailsInterface } from "@/interfaces/MovieDetails";
import Image from "next/image";

export default function TopSection({ movieData }: { movieData: MovieDetailsInterface }) {
    return (
        <div>
            <Image
                src={`${process.env.NEXT_PUBLIC_IMG_URL}/${movieData.backdrop_path}`}
                alt={movieData.original_title}
                fill
                className="absolute object-cover rounded-bl-4xl rounded-br-4xl img-hero-movie -z-10"
            />
            <div className="gradient-overlay h-[300px]! rounded-b-4xl z-10"></div>
            <div className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-t from-[#020916]  to-transparent z-10 pointer-events-none"></div>
        </div>
    )
}
