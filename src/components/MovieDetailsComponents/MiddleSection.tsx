import { CreditsInterface, MovieDetailsInterface } from "@/interfaces/MovieDetails";
import { Heart, StarIcon } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import RightSection from "./RightSection";

export default function MiddleSection({ movieData, creditsData }: { movieData: MovieDetailsInterface, creditsData: CreditsInterface }) {
  const totalStars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="row-span-2 row-end-3 ms-5 mt-10 z-50">
      <h6> {movieData.release_date?.substring(0, 4)} </h6>
      <h1 className="font-bold text-4xl"> {movieData.title} </h1>

      <div className="flex">
        {
          movieData.genres.map((genre: { id: number; name: string }, i: number) => (
            <h6 key={i} className="mt-2 me-3">{genre.name}</h6>
          ))
        }
      </div>

      <h1 className="mt-3">TMDB</h1>
      <div className="flex">
        {totalStars.map((star, i) => (
          <StarIcon key={i} className={`mt-2 h-5 w-5 ${star <= movieData.vote_average ? "text-yellow-400" : "text-soft-grey"}`} />
        ))}
      </div>

      <div className="flex mt-8">
        <div className="w-8/12">
          <div>
            <h1>Storyline</h1>
            <p className="text-light-grey mt-3">{movieData.tagline}</p>
            <p className="text-soft-grey mt-1">{movieData.overview}</p>

            <button className="rounded-lg mt-2 md:mt-10 px-5 py-2 bg-gradient-to-r from-[#f3001d] to-[#ff004d] hover:scale-110 transition-all duration-300">
              <Link href={`/play-movie/${movieData.id}`} className="text-white font-lexend md:text-lg rounded-md no-underline" style={{ textDecoration: "none" }}>Watch Now</Link>
            </button>

            <button className="bg-soft-grey rounded-lg px-5 py-2 ms-5 md:mt-10 hover:scale-110 transition-all duration-300">
              <Link href={`/get-movie/${movieData.id}`} className="text-white font-lexend md:text-lg rounded-md no-underline" style={{ textDecoration: "none" }}>
                <Heart />
              </Link>
            </button>
          </div>

          <div>
            <h1 className="mt-10 text-lg">More details</h1>
            <Table className="text-md">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <h6>Languages</h6>
                  </TableCell>
                  <TableCell className="flex text-soft-grey text-end justify-end">
                    {movieData.spoken_languages.map((lang: { english_name: string; name: string }, i: number) => (
                      <h6 key={i} className="me-3">{lang.english_name}</h6>
                    ))}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <h6>Runtime</h6>
                  </TableCell>
                  <TableCell className="text-end text-soft-grey">
                    {movieData.runtime} min
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <h6>Release Date</h6>
                  </TableCell>
                  <TableCell className="text-end text-soft-grey">
                    {movieData.release_date}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <h6>Director</h6>
                  </TableCell>
                  <TableCell className="text-end text-soft-grey">
                    {creditsData.crew.map((crew, i: number) => (
                      <p key={i}>{crew.job === "Director" ? crew.name : ""}</p>
                    ))}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <h6>Producer</h6>
                  </TableCell>
                  <TableCell className="text-end text-soft-grey">
                    {creditsData.crew.map((crew, i: number) => (
                      <p key={i}>{crew.job === "Producer" ? crew.name : ""}</p>
                    ))}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <h6>Writers</h6>
                  </TableCell>
                  <TableCell className="text-end text-soft-grey">
                    {creditsData.crew.map((crew, i: number) => (
                      <p key={i}>{crew.job === "Writer" ? crew.name : ""}</p>
                    ))}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        {/* <div className="w-1/12"></div> */}
        <RightSection movieData={movieData} />
      </div>
    </div>
  )
}
