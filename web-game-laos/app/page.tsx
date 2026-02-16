import HomePage from "./_components/home-page";
import { BannerType } from "@/types/banner.type";

export default async function Home() {
  const res = await fetch("http://localhost:3000/banner");
  const data = (await res.json()) as BannerType[];
  return <HomePage banner={data || []} />;
}
