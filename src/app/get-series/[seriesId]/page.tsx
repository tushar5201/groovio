import Header from "@/components/Header";
import BottomSection from "@/components/SeriesDetailsComponents/BottomSection";
import TopBannerSection from "@/components/SeriesDetailsComponents/TopBannerSection";

export default async function page({ params }: { params: Promise<{ seriesId: string }> }) {
  const { seriesId } = await params;
  const seriesRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-series-details/${seriesId}`, { cache: 'no-store' });
  const seriesData = await seriesRes.json();

  const creditsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-series-credit/${seriesId}`, { cache: 'no-store' });
  const creditsData = await creditsRes.json();

  return (
    <div className="relative w-full">
      <Header />
      <TopBannerSection seriesData={seriesData} />
      <BottomSection seriesData={seriesData} creditsData={creditsData} />
    </div>
  )
}
