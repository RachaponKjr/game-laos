import Image from "next/image";
import React from "react";
import mlbb from "@/assets/images/mlbb.jpg";
import Link from "next/link";
import { GameType } from "@/types/game.type";

const GameItem = ({ game }: { game: GameType }) => {
  return (
    <Link
      href={`/games/${game?.id}`}
      className="w-full aspect-12/16 bg-neutral-200 overflow-hidden rounded-xl group relative flex"
    >
      <Image src={mlbb.src} alt="" fill className="object-cover" />
      <div className="relative  w-max top-6 left-1/2 -translate-x-6 shadow-2xl">
        <div className="absolute w-12 h-2.5 rounded-full bg-white"></div>
        <div className="absolute w-4 h-4 rounded-full bg-white -top-2 translate-x-1/2! left-2"></div>
      </div>
      {/* hover */}
      <div className="absolute items-center justify-center top-0 left-0 w-full h-full bg-black/40 group-hover:flex hidden duration-300">
        <h5 className="text-base max-w-xl font-bold text-white">
          {game?.name}
        </h5>
      </div>
    </Link>
  );
};

export default GameItem;
