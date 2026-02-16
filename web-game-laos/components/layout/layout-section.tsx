import Image from "next/image";
import React from "react";

const LayoutSection = ({
  children,
  video,
}: {
  children: React.ReactNode;
  video?: string;
}) => {
  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* ส่วน Banner: ใช้ sticky เพื่อให้เนื้อหาด้านล่างเลื่อนมาทับได้ */}
      <div className="sticky top-0 w-full aspect-16/13 md:aspect-16/6 bg-neutral-200 z-0">
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          className="w-full h-full object-cover"
        />
        {/* Overlay ไล่เฉดสีเบาๆ ให้ดูเนียนตอนเลื่อนทับ */}
        <div className="absolute inset-0 bg-linear-to-b from-black/20 to-transparent"></div>
      </div>

      {/* ส่วนเนื้อหา: ใส่ relative และ z-10 เพื่อให้อยู่เหนือ Banner */}
      <div className="relative z-10 bg-white rounded-t-[2.5rem] -mt-12 md:-mt-20 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        {/* ตกแต่งขีดเล็กๆ ด้านบนให้เหมือน Card ที่ดึงขึ้นมาได้ (เฉพาะ Mobile) */}
        <div className="flex justify-center pt-3 md:hidden">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        <div className="py-6">{children}</div>
      </div>
    </div>
  );
};

export default LayoutSection;
