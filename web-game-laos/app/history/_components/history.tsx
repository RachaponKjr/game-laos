"use client";
import React, { useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

// ข้อมูลจำลอง (ในอนาคตเปลี่ยนเป็นดึงจาก API: GET /orders/me)
const purchaseHistory = [
  {
    id: "ORD-99281",
    gameName: "Genshin Impact",
    packageName: "6480 Genesis Crystals",
    amount: 3500,
    status: "Success",
    date: "07 Feb 2026",
    method: "Google Pay",
  },
  {
    id: "ORD-99150",
    gameName: "Valorant",
    packageName: "5400 VP",
    amount: 1600,
    status: "Success",
    date: "05 Feb 2026",
    method: "QR PromptPay",
  },
  {
    id: "ORD-98722",
    gameName: "RoV",
    packageName: "3000 Coupons",
    amount: 900,
    status: "Pending",
    date: "01 Feb 2026",
    method: "TrueMoney",
  },
  {
    id: "ORD-98510",
    gameName: "Free Fire",
    packageName: "2000 Diamonds",
    amount: 500,
    status: "Success",
    date: "28 Jan 2026",
    method: "ShopeePay",
  },
  {
    id: "ORD-98400",
    gameName: "PUBG Mobile",
    packageName: "8100 UC",
    amount: 3200,
    status: "Success",
    date: "25 Jan 2026",
    method: "Credit Card",
  },
  {
    id: "ORD-98120",
    gameName: "MLBB",
    packageName: "5000 Diamonds",
    amount: 2800,
    status: "Success",
    date: "20 Jan 2026",
    method: "TrueMoney",
  },
  {
    id: "ORD-97888",
    gameName: "Roblox",
    packageName: "10000 Robux",
    amount: 4500,
    status: "Success",
    date: "15 Jan 2026",
    method: "Google Pay",
  },
];

const HistoryPage = () => {
  const { user, loading } = useAuth();

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(purchaseHistory.length / itemsPerPage);

  // คำนวณข้อมูลที่จะแสดงในหน้าปัจจุบัน
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return purchaseHistory.slice(start, start + itemsPerPage);
  }, [currentPage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0c2a] flex flex-col items-center justify-center text-white italic uppercase font-black tracking-widest">
        <Icon
          icon="mdi:loading"
          className="text-[#e53637] animate-spin mb-4"
          width={48}
        />
        Loading History...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0c2a] pt-32 pb-20">
      <div className="container mx-auto max-w-6xl px-4">
        {/* 1. Profile Header Section */}
        <div className="bg-[#151639] rounded-3xl p-6 md:p-10 border border-white/5 shadow-2xl mb-10 relative overflow-hidden">
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#e53637]/10 rounded-full -mr-40 -mt-40 blur-[100px]"></div>

          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#e53637] p-1 overflow-hidden transition-transform group-hover:scale-105 duration-500">
                <Image
                  src={
                    user?.image ||
                    "https://ui-avatars.com/api/?name=" + user?.name
                  }
                  alt="Profile"
                  width={128}
                  height={128}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-[#151639]"></div>
            </div>

            {/* User Info */}
            <div className="text-center md:text-left flex-1">
              <p className="text-[10px] text-[#e53637] font-black uppercase tracking-[0.4em] mb-1">
                Account Dashboard
              </p>
              <h1 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-tight">
                {user?.name || "Guest User"}
              </h1>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mt-3 text-gray-400 font-bold text-xs uppercase tracking-wider">
                <span className="flex items-center justify-center md:justify-start gap-2">
                  <Icon
                    icon="mdi:email-outline"
                    className="text-[#e53637] text-lg"
                  />
                  {user?.email}
                </span>
                <span className="flex items-center justify-center md:justify-start gap-2">
                  <Icon
                    icon="mdi:shield-check-outline"
                    className="text-[#e53637] text-lg"
                  />
                  Verified Member
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-4 w-full md:w-auto">
              <div className="flex-1 md:w-36 bg-[#0b0c2a]/60 backdrop-blur-sm p-5 rounded-2xl border border-white/10 text-center">
                <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">
                  Total Spent
                </p>
                <p className="text-2xl font-black text-white italic leading-none">
                  ฿17,000
                </p>
              </div>
              <div className="flex-1 md:w-36 bg-[#0b0c2a]/60 backdrop-blur-sm p-5 rounded-2xl border border-white/10 text-center">
                <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">
                  Orders
                </p>
                <p className="text-2xl font-black text-[#e53637] italic leading-none">
                  {purchaseHistory.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Purchase History Table */}
        <div className="bg-[#151639] rounded-3xl border border-white/5 shadow-2xl overflow-hidden">
          <div className="p-6 md:p-8 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#1a1b41]">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-[#e53637] rounded-full"></div>
              <h3 className="text-xl font-black text-white uppercase italic tracking-wider">
                Purchase History
              </h3>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-[10px] text-gray-400 font-bold uppercase hover:text-white hover:bg-white/10 transition-all">
              <Icon icon="mdi:download" width={16} />
              Export CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0b0c2a]/50 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  <th className="px-8 py-5 text-nowrap">ID</th>
                  <th className="px-8 py-5">Game & Package</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5">Date</th>
                  <th className="px-8 py-5 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {currentItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group"
                  >
                    <td className="px-8 py-6 font-mono text-xs text-gray-500 group-hover:text-gray-300">
                      #{item.id}
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-white text-nowrap font-bold uppercase text-xs mb-0.5 group-hover:text-[#e53637] transition-colors">
                        {item.gameName}
                      </p>
                      <p className="text-gray-500 text-nowrap text-[10px] font-bold uppercase tracking-tighter">
                        {item.packageName}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                          item.status === "Success"
                            ? "bg-green-500/10 text-green-500 border border-green-500/20"
                            : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-2 ${item.status === "Success" ? "bg-green-500" : "bg-yellow-500"}`}
                        ></span>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-nowrap text-gray-400 text-xs font-bold uppercase">
                      {item.date}
                    </td>
                    <td className="px-8 py-6 text-right font-black text-white italic text-nowrap text-lg">
                      ฿{item.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 3. Pagination Controls */}
          {purchaseHistory.length > 0 ? (
            <div className="p-6 md:p-8 bg-[#0b0c2a]/30 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                Showing{" "}
                <span className="text-white">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="text-white">
                  {Math.min(currentPage * itemsPerPage, purchaseHistory.length)}
                </span>{" "}
                of <span className="text-white">{purchaseHistory.length}</span>{" "}
                entries
              </p>

              <div className="flex items-center gap-2">
                {/* Prev Button */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="w-12 h-12 rounded-xl bg-[#0b0c2a] border border-white/10 flex items-center justify-center text-white hover:bg-[#e53637] hover:border-[#e53637] disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                >
                  <Icon icon="mdi:chevron-left" width={24} />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-12 h-12 rounded-xl font-black text-xs transition-all ${
                          currentPage === page
                            ? "bg-[#e53637] text-white shadow-xl shadow-[#e53637]/30 scale-110"
                            : "bg-[#0b0c2a] text-gray-500 border border-white/10 hover:border-[#e53637] hover:text-white"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>

                {/* Next Button */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="w-12 h-12 rounded-xl bg-[#0b0c2a] border border-white/10 flex items-center justify-center text-white hover:bg-[#e53637] hover:border-[#e53637] disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                >
                  <Icon icon="mdi:chevron-right" width={24} />
                </button>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="p-24 text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon
                  icon="mdi:cart-off"
                  className="text-white/20"
                  width={40}
                />
              </div>
              <h4 className="text-white font-black uppercase italic tracking-widest">
                No Transaction Found
              </h4>
              <p className="text-gray-500 text-xs mt-2 uppercase font-bold">
                เริ่มการเติมเกมครั้งแรกของคุณได้ที่หน้าแรก
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
