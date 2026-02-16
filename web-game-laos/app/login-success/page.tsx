/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useEffect, useRef, useState, Suspense } from "react"; // เพิ่ม Suspense
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2, CheckCircle2 } from "lucide-react";

// 1. แยกส่วนที่ใช้ useSearchParams ออกมาเป็น Component ย่อย
function LoginSuccessHandler() {
  const { login } = useAuth();
  const searchParams = useSearchParams(); // ตัวนี้แหละครับที่ทำให้ Build พังถ้าไม่มี Suspense
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const isProcessed = useRef(false);

  useEffect(() => {
    if (isProcessed.current) return;

    const token = searchParams.get("token");
    if (token) {
      isProcessed.current = true;
      try {
        login(token);
        setStatus("success");
      } catch (err) {
        console.error("Login failed:", err);
        setStatus("error");
      }
    } else {
      setStatus("error");
    }
  }, [searchParams, login]);

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        // ใช้ window.location.href เพื่อล้าง State และ Reload Navbar ให้เป็นสถานะ Login ใหม่ชัวร์ที่สุด
        window.location.href = "/";
      }, 2000);
      return () => clearTimeout(timer);
    } else if (status === "error") {
      const timer = setTimeout(() => {
        router.replace("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, router]);

  return (
    <div className="max-w-md w-full p-8 text-center bg-[#151639] rounded-2xl border border-white/5 shadow-2xl">
      {status === "loading" && (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-[#e53637] animate-spin" />
          <h2 className="text-xl font-bold tracking-wider uppercase">
            ยืนยันตัวตน...
          </h2>
          <p className="text-gray-400 text-sm">
            กำลังเชื่อมต่อข้อมูลจาก Google
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
          <h2 className="text-xl font-bold tracking-wider uppercase">
            สำเร็จ!
          </h2>
          <p className="text-gray-400 text-sm">กำลังพาคุณกลับสู่หน้าหลัก</p>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 text-[#e53637] flex items-center justify-center text-4xl">
            !
          </div>
          <h2 className="text-xl font-bold uppercase text-[#e53637]">
            เกิดข้อผิดพลาด
          </h2>
          <p className="text-gray-400 text-sm">ไม่พบข้อมูลการยืนยันตัวตน</p>
        </div>
      )}
    </div>
  );
}

// 2. Component หลักสำหรับ Export
export default function LoginSuccess() {
  return (
    <div className="min-h-screen bg-[#0b0c2a] flex items-center justify-center text-white">
      {/* ต้องหุ้มด้วย Suspense เพื่อแก้ปัญหา Prerender Error ตอน Build */}
      <Suspense
        fallback={
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-[#e53637] animate-spin mx-auto" />
            <p className="mt-4 font-bold uppercase tracking-widest">
              Loading...
            </p>
          </div>
        }
      >
        <LoginSuccessHandler />
      </Suspense>
    </div>
  );
}
