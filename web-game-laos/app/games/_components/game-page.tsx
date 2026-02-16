/* eslint-disable react-hooks/preserve-manual-memoization */
"use client";
import React, { useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import GameItem from "@/components/layout/game-item";
import { useGames } from "@/hooks/useGames";
import { GameType } from "@/types/game.type";

const GamesPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All Games", icon: "mdi:apps" }, // เพิ่มปุ่ม All
    { id: "MOBILE", name: "Mobile", icon: "mdi:cellphone" },
    { id: "PC", name: "PC Games", icon: "mdi:monitor" },
    { id: "CARD", name: "Gift Cards", icon: "mdi:credit-card-outline" },
  ];

  const { data: games, isLoading } = useGames();

  // กรองข้อมูลตาม Tab และ Search
  const filteredGames = useMemo(() => {
    // ถ้ายังไม่มีข้อมูล หรือข้อมูลยังไม่มา ให้คืนค่าเป็น Array ว่างไปก่อน
    if (!games?.data) return [];

    return games.data.filter((game: GameType) => {
      const matchesTab = activeTab === "all" || game.category === activeTab;
      // ป้องกัน Error กรณี name เป็น undefined/null ด้วย ?. และใส่ default เป็น string ว่าง
      const matchesSearch = (game.name ?? "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, games?.data, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0b0c2a] pt-32 pb-20">
      <div className="container mx-auto max-w-7xl px-4 lg:px-6">
        {/* 1. Header & Search Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="border-l-4 border-[#e53637] pl-6">
            <p className="text-[12px] text-[#e53637] font-black uppercase tracking-[0.3em] mb-2">
              Top-up Center
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
              Game <span className="text-[#e53637]">Store</span>
            </h1>
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#151639] border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#e53637] transition-all"
            />
            <Icon
              icon="mdi:magnify"
              className="absolute right-4 top-4 text-gray-500"
              width={24}
            />
          </div>
        </div>

        {/* 2. Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest transition-all duration-300 ${
                activeTab === cat.id
                  ? "bg-[#e53637] text-white shadow-lg shadow-[#e53637]/20 scale-105"
                  : "bg-[#151639] text-gray-400 border border-white/5 hover:border-[#e53637]/50"
              }`}
            >
              <Icon icon={cat.icon} width={20} />
              {cat.name}
            </button>
          ))}
        </div>

        {/* 3. Games Grid & Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* แสดง Loading Placeholder (Skeleton) ง่ายๆ */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-[#151639] animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredGames.map((game: GameType) => (
                <GameItem game={game} key={game.id} />
              ))}
            </div>

            {/* 4. Empty State - เช็คจากความยาวของ filteredGames */}
            {filteredGames.length === 0 && (
              <div className="py-20 text-center">
                <Icon
                  icon="mdi:database-search-outline"
                  className="mx-auto text-white/10 mb-4"
                  width={80}
                />
                <h3 className="text-white font-black uppercase italic tracking-widest text-xl">
                  No games found
                </h3>
                <p className="text-gray-500 text-sm mt-2">
                  ลองค้นหาด้วยคำอื่น หรือเลือกหมวดหมู่ใหม่
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GamesPage;
