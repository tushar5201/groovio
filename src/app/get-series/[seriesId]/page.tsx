import Header from "@/components/Header";
import BottomSection from "@/components/SeriesDetailsComponents/BottomSection";
import TopBannerSection from "@/components/SeriesDetailsComponents/TopBannerSection";
import axios from "axios";

export default async function page({ params }: { params: Promise<{ seriesId: string }> }) {
  const { seriesId }: { seriesId: string } = await params;
  const series = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/get-series-details/${seriesId}`);
  const seriesData = series.data;

  const credits = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/get-series-credit/${seriesId}`);
  const creditsData = credits.data;

  return (
    <div className="relative w-full">
      <Header />
      <TopBannerSection seriesData={seriesData} />
      <BottomSection seriesData={seriesData} creditsData={creditsData} />
    </div>
  )
}
