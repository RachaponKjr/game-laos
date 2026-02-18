/* eslint-disable @typescript-eslint/no-unused-vars */
import { GamePackageType, GameType } from "@/types/game.type";
import TopUpPage from "./_components/topup";

export const dynamicParams = true;

// ดึง URL จาก Environment Variable (ที่ส่งมาจาก GitHub Actions / Docker Compose)
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface GameProps extends GameType {
  packages: GamePackageType[];
}

export async function generateStaticParams() {
  try {
    // ถ้าตอน Build ติดต่อ API ไม่ได้ ให้ข้ามไปก่อนเพื่อให้ Build ผ่าน
    const res = await fetch(`${API_URL}/games`, {
      next: { revalidate: 3600 }, // แนะนำให้ใส่ cache ไว้บ้าง
    });

    if (!res.ok) return [];

    const games = await res.json();
    return games.data.map((game: GameType) => ({
      slug: game.id.toString(), // ตรวจสอบว่า id เป็น string หรือยัง
    }));
  } catch (error) {
    console.error(
      "Build-time fetch failed, skipping static generation for games.",
    );
    return []; // คืนค่าว่าง เพื่อให้ Build ผ่านไปได้
  }
}

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  // ในหน้าหน้าเว็บจริง (Runtime) มันจะมาดึงข้อมูลตรงนี้แทน
  const res = await fetch(`${API_URL}/games/${slug}`);

  if (!res.ok) {
    return <div>Game not found</div>;
  }

  const game = await res.json();
  return <TopUpPage game={game} />;
};

export default page;
