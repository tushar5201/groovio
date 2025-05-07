import { CreditInterface, SeriesDetailsInterface } from "@/interfaces/SeriesDetails";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";

export default function DetailsSection({ seriesData, creditsData }: { seriesData: SeriesDetailsInterface, creditsData: CreditInterface }) {
  return (
    <div className="ms-7 me-25">
      <Table className="text-md mt-10">
        <TableBody>
          <TableRow>
            <TableCell>
              <h6>Languages</h6>
            </TableCell>
            <TableCell className="flex text-soft-grey text-end justify-end">
              {seriesData.spoken_languages.map((lang: { english_name: string; name: string }, i: number) => (
                <h6 key={i} className="me-3">{lang.english_name}</h6>
              ))}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <h6>OTT</h6>
            </TableCell>
            <TableCell className="flex text-soft-grey text-end justify-end">
              {seriesData.networks.map((ott, i: number) => (
                <h6 key={i} className="me-3">{ott.name}</h6>
              ))}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <h6>First Air Date</h6>
            </TableCell>
            <TableCell className="flex text-soft-grey text-end justify-end">
              <h6>{seriesData.first_air_date}</h6>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <h6>Last Air Date</h6>
            </TableCell>
            <TableCell className="flex text-soft-grey text-end justify-end">
              <h6>{seriesData.last_air_date}</h6>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <h6>Episode Count</h6>
            </TableCell>
            <TableCell className="flex text-soft-grey text-end justify-end">
              <h6>{seriesData.number_of_episodes}</h6>
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
              <h6>Producers</h6>
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

      <h6 className="mt-5 ms-3 text-2xl">Cast:</h6>
      <div className="grid grid-cols-7 w-full">
        {
          creditsData.cast.map((actor, i) => (
            actor.profile_path !== null &&
              <Card key={i} className="m-3 p-0 border-0 bg-transparent">
                <CardContent className="px-0">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}/${actor.profile_path}`}
                    alt={actor.original_name}
                    width={150}
                    height={100}
                    className="w-full h-[200px] m-0 p-0 rounded-2xl"
                  />
                </CardContent>
                <CardFooter className="p-0">
                  <div>
                    <h6 className="text-white font-semibold">{actor.original_name}</h6>
                    <h6 className="text-soft-grey">{actor.character}</h6>
                  </div>
                </CardFooter>
              </Card>
          ))
        }
      </div>
    </div>
  )
}
