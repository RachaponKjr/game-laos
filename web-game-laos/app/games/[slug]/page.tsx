import { GamePackageType, GameType } from "@/types/game.type";
import TopUpPage from "./_components/topup";
export const dynamicParams = true;
export interface GameProps extends GameType {
  packages: GamePackageType[];
}

export async function generateStaticParams() {
  const games = await fetch(`http://localhost:3000/games`).then((res) =>
    res.json(),
  );

  return games.data.map((game: GameType) => ({
    slug: game.id,
  }));
}

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const game = await fetch(`http://localhost:3000/games/${slug}`).then((res) =>
    res.json(),
  );

  return <TopUpPage game={game} />;
};

export default page;
