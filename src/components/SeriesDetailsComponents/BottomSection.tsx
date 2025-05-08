import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs_underline";
import SeasonsAndEpisodes from "./Seasons&Episodes";
import DetailsSection from "./DetailsSection";
import { CreditInterface, SeriesDetailsInterface } from "@/interfaces/SeriesDetails";
import MoreLikeThisSection from "./MoreLikeThisSection";

export default function BottomSection({ seriesData, creditsData }: { seriesData: SeriesDetailsInterface; creditsData: CreditInterface; }) {
    return (
        <div className="text-white ms-10">
            <Tabs defaultValue="s&e" orientation="vertical" >
                <TabsList className='w-100 p-4'>
                    <TabsTrigger className="p-4" value="s&e">Seasons & Episodes</TabsTrigger>
                    <TabsTrigger className="p-4" value="details">Details</TabsTrigger>
                    <TabsTrigger className="p-4" value="mlt">More like this</TabsTrigger>
                </TabsList>
                <TabsContent value="s&e">
                    <SeasonsAndEpisodes seriesData={seriesData} />
                </TabsContent>
                <TabsContent value="details">
                    <DetailsSection seriesData={seriesData} creditsData={creditsData} />
                </TabsContent>
                <TabsContent value="mlt">
                    <MoreLikeThisSection seriesData={seriesData} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
