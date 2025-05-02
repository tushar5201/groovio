import Header from "@/components/Header";
import Carousels from "../components/Carousels";
import HomeContent from "../components/HomeContent";
import "./globals.css";
export default function Home() {
  return (
    <div className="w-full overflow-x-hidden"> 
      <Header />
      <Carousels />
      <HomeContent />
    </div>
  );
}
