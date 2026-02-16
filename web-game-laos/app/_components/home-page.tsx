"use client";
import Banner from "./banner";
import LayoutBox from "@/components/layout/layout-box";
import BlogItem from "@/components/layout/blog-item";
import GameItem from "@/components/layout/game-item";
import { Button } from "@/components/ui/button";
import FeaturesSection from "@/components/layout/featureItem";
import { useGames } from "@/hooks/useGames";
import { GameType } from "@/types/game.type";
import { BannerType } from "@/types/banner.type";
import Link from "next/link";
import { useBlogs } from "@/hooks/useBlogs";
import { BlogType } from "@/types/blog.type";

interface BlogData {
  data: BlogType[];
  total: number;
  page: number;
  limit: number;
}

const HomePage = ({ banner }: { banner: BannerType[] }) => {
  const { data } = useGames();
  const { data: blogs }: { data: BlogData | undefined } = useBlogs();
  const game = data?.data as GameType[];
  return (
    <div className="container mx-auto pt-20">
      <Banner banner={banner} />
      <div className="flex flex-col md:flex-row gap-6 px-4 md:px-0 mb-16">
        <div className="flex-1 flex flex-col gap-6">
          <LayoutBox
            title="Mobile Game"
            header={
              <Button variant={"outline"}>
                <Link href={"/games"}>View All</Link>
              </Button>
            }
          >
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">
              {game?.filter((game) => game.category === "MOBILE").length > 0 ? (
                game
                  ?.filter((game) => game.category === "MOBILE")
                  .map((game, index) =>
                    game ? (
                      <GameItem key={game.id} game={game} />
                    ) : (
                      <div key={index}>
                        <span>ไม่พบข้อมูล</span>
                      </div>
                    ),
                  )
              ) : (
                <div className="h-[200px]! w-full col-span-4 flex items-center justify-center">
                  <span className="text-center">ไม่พบข้อมูล</span>
                </div>
              )}
            </div>
          </LayoutBox>
          <LayoutBox
            title="PC Game"
            header={
              <Button variant={"outline"}>
                <Link href={"/games"}>View All</Link>
              </Button>
            }
          >
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">
              {game?.filter((game) => game.category === "PC").length > 0 ? (
                game
                  ?.filter((game) => game.category === "PC")
                  .map((game, index) =>
                    game ? (
                      <GameItem key={game.id} game={game} />
                    ) : (
                      <div key={index}>
                        <span>ไม่พบข้อมูล</span>
                      </div>
                    ),
                  )
              ) : (
                <div className="h-[200px]! w-full col-span-4 flex items-center justify-center">
                  <span className="text-center">ไม่พบข้อมูล</span>
                </div>
              )}
            </div>
          </LayoutBox>
          <LayoutBox
            title="Card Game"
            header={
              <Button variant={"outline"}>
                <Link href={"/games"}>View All</Link>
              </Button>
            }
          >
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">
              {game?.filter((game) => game.category === "CARD").length > 0 ? (
                game
                  ?.filter((game) => game.category === "CARD")
                  .map((game, index) =>
                    game ? (
                      <GameItem key={game.id} game={game} />
                    ) : (
                      <div key={index}>
                        <span>ไม่พบข้อมูล</span>
                      </div>
                    ),
                  )
              ) : (
                <div className="h-[200px]! w-full col-span-4 flex items-center justify-center">
                  <span className="text-center">ไม่พบข้อมูล</span>
                </div>
              )}
            </div>
          </LayoutBox>
          <div className="w-full aspect-16/8 bg-neutral-100 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]"></div>
        </div>
        <div className="basis-2/6 max-w-lg flex flex-col gap-8">
          <LayoutBox
            title="News"
            header={
              <Button variant={"outline"}>
                <Link href={"/blogs"}>View All</Link>
              </Button>
            }
          >
            <div className="flex flex-col gap-4 md:gap-6">
              {blogs?.data?.slice(0, 5).map((blog, index) => (
                <BlogItem key={index} blog={blog} />
              ))}
            </div>
          </LayoutBox>
          <LayoutBox title="Why Choose Us">
            <FeaturesSection />
          </LayoutBox>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
