"use client";
import LayoutSection from "@/components/layout/layout-section";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Icon } from "@iconify/react";
import Policy from "./policy";
import Image from "next/image";
import { GameProps } from "../page";
import { GamePackageType } from "@/types/game.type";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react"; // สำหรับเจน QR จาก String
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";

const API_BASE = process.env.NEXT_PUBLIC_PAYMENT_API_BASE;
const API_KEY = process.env.NEXT_PUBLIC_PAYMENT_API_KEY;

const TopUpPage = ({ game }: { game: GameProps }) => {
  const [selectedPack, setSelectedPack] = useState<GamePackageType | null>(
    null,
  );
  const [uid, setUid] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [qrString, setQrString] = useState<string>("");
  const [transactionRef, setTransactionRef] = useState<string>("");
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const qrExportRef = useRef<HTMLDivElement>(null);
  const checkInterval = useRef<NodeJS.Timeout | null>(null);

  const downloadQR = async () => {
    if (qrExportRef.current === null) return;

    try {
      const dataUrl = await toPng(qrExportRef.current, {
        cacheBust: true,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.download = `QR-Payment-${transactionRef}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("oops, something went wrong!", err);
    }
  };
  // 1. ฟังก์ชันสร้างรายการชำระเงิน
  const onTopUp = async () => {
    if (!selectedPack || !uid) return;

    setLoading(true);
    setIsPaid(false);

    try {
      const response = await axios.post(
        `${API_BASE}/payments/create`,
        {
          // amount: Number(selectedPack.price), // ใช้ราคาจากแพ็กเกจ
          amount: 1000,
          purpose: `Topup ${game.name}: ${selectedPack.amount} Gems (UID: ${uid})`,
          currency: "LAK",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
          },
        },
      );

      const { transaction_ref, qr_string } = response.data.data;
      setQrString(qr_string);
      setTransactionRef(transaction_ref);
      setIsOpen(true);
    } catch (err) {
      console.error("Payment creation failed:", err);
      alert("เกิดข้อผิดพลาดในการสร้างรายการชำระเงิน");
    } finally {
      setLoading(false);
    }
  };

  const checkPayment = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/payments/status/${transactionRef}`,
        {
          headers: { "X-API-KEY": API_KEY },
        },
      );

      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error:", error?.response?.data || error?.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
      throw error;
    }
  }, [transactionRef]);

  const checkPaymentStatus = useCallback(async () => {
    if (!transactionRef || isPaid) return;

    const data = await checkPayment();

    if (data && data.status === "success") {
      setIsPaid(true);

      if (checkInterval.current) {
        clearInterval(checkInterval.current);
        checkInterval.current = null;
      }

      console.log("Payment Verified Successfully!");
    }
  }, [transactionRef, isPaid, checkPayment]);

  useEffect(() => {
    if (isOpen && transactionRef && !isPaid) {
      console.log("Starting payment polling...");

      checkPaymentStatus();

      checkInterval.current = setInterval(() => {
        checkPaymentStatus();
      }, 5000);
    }
    return () => {
      if (checkInterval.current) {
        clearInterval(checkInterval.current);
        checkInterval.current = null;
      }
    };
  }, [isOpen, transactionRef, isPaid, checkPaymentStatus]);

  return (
    <LayoutSection video={game.videoUrl || "/mlbb.mp4"}>
      <div className="container mx-auto max-w-7xl py-6 px-4 text-[#0b0c2a]">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-10 bg-linear-to-r from-[#0b0c2a] to-[#1a1c4e] p-8 rounded-3xl text-white relative overflow-hidden">
          <div className="w-32 h-32 relative md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-white/20 z-10">
            <Image
              src={game.image || ""}
              alt={game.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-left z-10">
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase">
              {game.name}
            </h1>
            <p className="text-white/60 mt-2 flex items-center justify-center md:justify-start gap-4 text-sm">
              <span className="flex items-center gap-1 text-yellow-400">
                <Icon icon="mdi:flash" /> ส่งไวใน 1 นาที
              </span>
              <span className="flex items-center gap-1 text-green-400">
                <Icon icon="mdi:shield-check" /> ปลอดภัย 100%
              </span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* --- ฝั่งซ้าย: เลือกแพ็กเกจ --- */}
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-[#e53637] text-white w-10 h-10 rounded-xl flex items-center justify-center font-black shadow-lg shadow-red-200">
                  1
                </span>
                <h3 className="text-2xl font-black italic uppercase tracking-tight">
                  Select Package
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                {game.packages.length === 0 && (
                  <p className="text-gray-500 text-center h-32 flex items-center justify-center col-span-3 text-sm mt-2">
                    No packages available
                  </p>
                )}
                {game.packages.map((pack: GamePackageType, index: number) => (
                  <div
                    key={index}
                    onClick={() => setSelectedPack(pack)}
                    className={`relative p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col items-center gap-1 group ${
                      selectedPack?.id === pack.id
                        ? "border-[#e53637] bg-red-50/50 shadow-xl scale-[1.02]"
                        : "border-gray-100 bg-white hover:border-gray-200"
                    }`}
                  >
                    <Image
                      src={pack.icon_base64}
                      alt={pack.name}
                      width={48}
                      height={48}
                      className="mb-2 group-hover:scale-110 transition-transform"
                    />
                    <span className="text-2xl font-black text-[#0b0c2a]">
                      {pack.amount.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-[#e53637] font-black uppercase">
                      +{pack.bonus} Bonus
                    </span>
                    <div
                      className={`mt-4 w-full text-center py-2.5 rounded-xl font-black text-sm ${selectedPack?.id === pack.id ? "bg-[#e53637] text-white" : "bg-gray-100 text-gray-500"}`}
                    >
                      ฿{pack.price}
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <div className="hidden md:block">
              <Policy />
            </div>
          </div>

          {/* --- ฝั่งขวา: ชำระเงิน --- */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 sticky top-24">
              <div className="space-y-8">
                {/* UID Input */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-[#0b0c2a] text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold">
                      2
                    </span>
                    <h3 className="text-lg font-bold uppercase tracking-tight">
                      User Information
                    </h3>
                  </div>
                  <input
                    type="text"
                    placeholder="กรอก UID ตัวละคร"
                    value={uid}
                    onChange={(e) => setUid(e.target.value)}
                    className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#e53637] border-none font-bold text-[#0b0c2a]"
                  />
                </div>

                {/* Summary */}
                <div className="pt-6 border-t border-dashed border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-xs font-bold uppercase">
                      Package
                    </span>
                    <span className="font-black text-[#0b0c2a]">
                      {selectedPack?.amount || 0} Gems
                    </span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-gray-400 text-xs font-bold uppercase pb-1">
                      Total Price
                    </span>
                    <span className="text-3xl font-black text-[#e53637] italic leading-none">
                      ฿{(Number(selectedPack?.price ?? 0) * 1.07).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[9px] text-gray-400 mt-2">
                    *ราคานี้รวมค่าธรรมเนียมบริการ 7% แล้ว
                  </p>
                </div>

                <button
                  disabled={!selectedPack || !uid || loading}
                  onClick={onTopUp}
                  className="w-full py-5 bg-[#e53637] disabled:bg-gray-300 text-white rounded-2xl font-black uppercase italic tracking-widest text-lg shadow-xl shadow-red-200 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Icon
                      icon="mdi:loading"
                      className="animate-spin"
                      width={24}
                    />
                  ) : (
                    "Pay Now"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Payment Modal (QR Code) --- */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-[#0b0c2a] text-white overflow-y-auto! max-w-sm rounded-md md:max-w-md p-0 border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(229,54,55,0.2)]">
          {/* Header พร้อมปุ่มปิด */}
          <div className="bg-linear-to-r from-[#e53637] to-[#b32424] p-6 text-center">
            <DialogTitle className="text-xl font-black italic uppercase tracking-widest leading-none">
              {isPaid ? "Payment Verified" : "Secure Checkout"}
            </DialogTitle>
            {!isPaid && (
              <p className="text-[10px] font-bold opacity-80 mt-2 tracking-[0.2em] uppercase">
                Scan LAO QR to continue
              </p>
            )}
          </div>

          <div className="p-8">
            {isPaid ? (
              /* --- SUCCESS STATE --- */
              <div className="text-center py-6 animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-500/50">
                  <Icon
                    icon="mdi:check-all"
                    className="text-green-500"
                    width={48}
                  />
                </div>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter">
                  Done!
                </h3>
                <p className="text-gray-400 text-sm mt-2">
                  เติมเงินสำเร็จ ระบบกำลังส่ง Gems เข้า ID:{" "}
                  <span className="text-white font-bold">{uid}</span>
                </p>
                <Button
                  className="mt-8 w-full bg-[#e53637] hover:bg-white hover:text-[#0b0c2a] h-14 rounded-2xl font-black uppercase tracking-widest transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Go Back Home
                </Button>
              </div>
            ) : (
              /* --- PAYMENT STATE --- */
              <div className="flex flex-col items-center">
                {/* ส่วนที่จะ Export เป็นรูป (ต้องเป็นสีขาวเพื่อให้สแกนง่าย) */}
                <div
                  ref={qrExportRef}
                  className="bg-white p-6 rounded-xl shadow-2xl mb-6 relative"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-4">
                      <h2 className="text-[#0b0c2a] font-black italic text-lg leading-none">
                        Noctura<span className="text-[#e53637]">Pay</span>
                      </h2>
                    </div>
                    {qrString && (
                      <QRCodeSVG
                        value={qrString}
                        size={200}
                        level="H"
                        includeMargin={false}
                      />
                    )}
                    <p className="text-[#0b0c2a] text-[9px] font-bold mt-4 opacity-50 font-mono">
                      {transactionRef}
                    </p>
                  </div>
                </div>

                {/* ยอดเงิน */}
                <div className="text-center mb-8">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-1">
                    Total Amount
                  </p>
                  <div className="flex items-end justify-center gap-2">
                    <span className="text-4xl font-black text-white italic leading-none">
                      {(
                        Number(selectedPack?.price ?? 0) * 1.07
                      ).toLocaleString()}
                    </span>
                    <span className="text-[#e53637] font-black text-sm uppercase">
                      LAK
                    </span>
                  </div>
                </div>

                {/* ปุ่มบันทึกรูป */}
                <button
                  onClick={downloadQR}
                  className="flex items-center gap-2 mb-6 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                >
                  <Icon
                    icon="mdi:download-box"
                    width={20}
                    className="text-[#e53637]"
                  />
                  Save QR to Gallery
                </button>

                {/* Warning Banner */}
                <div className="bg-[#151639] p-4 rounded-2xl w-full border border-white/5">
                  <div className="flex gap-3">
                    <Icon
                      icon="mdi:information-variant-circle"
                      className="text-[#e53637] shrink-0"
                      width={20}
                    />
                    <p className="text-[10px] text-gray-300 leading-relaxed font-medium">
                      กรุณาโอนให้ตรงตามยอด{" "}
                      <span className="text-white font-bold">
                        {(
                          Number(selectedPack?.price ?? 0) * 1.07
                        ).toLocaleString()}{" "}
                        LAK
                      </span>{" "}
                      เพื่อให้ระบบตรวจสอบอัตโนมัติ
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-[10px] text-gray-600 font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></span>
                  Waiting for payment...
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </LayoutSection>
  );
};

export default TopUpPage;
