"use client";
import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#ffffff] border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* 1. Brand Section */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tighter text-[#0b0c2a]">
              Ani<span className="text-[#e53637]">me</span>
            </h1>
            <p className="text-gray-500 leading-relaxed">
              แหล่งรวมบัตรเติมเกมและข่าวสารอนิเมะที่ใหญ่ที่สุด อัปเดตไว ปลอดภัย
              เชื่อถือได้ 100%
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#e53637] hover:text-white transition-all"
              >
                <Icon icon="ri:facebook-fill" width={20} />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#e53637] hover:text-white transition-all"
              >
                <Icon icon="ri:twitter-x-fill" width={20} />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#e53637] hover:text-white transition-all"
              >
                <Icon icon="ri:instagram-line" width={20} />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#e53637] hover:text-white transition-all"
              >
                <Icon icon="ri:discord-fill" width={20} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* 2. Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-[#0b0c2a] mb-6 uppercase tracking-wider">
                Navigation
              </h4>
              <ul className="space-y-4">
                {["Home", "Game Store", "Top Up", "Our Blog", "Contacts"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-gray-500 hover:text-[#e53637] transition flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e53637] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* 3. Support & Legal */}
            <div>
              <h4 className="text-lg font-bold text-[#0b0c2a] mb-6 uppercase tracking-wider">
                Support
              </h4>
              <ul className="space-y-4 text-gray-500">
                <li>
                  <Link href="#" className="hover:text-[#e53637] transition">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#e53637] transition">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#e53637] transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#e53637] transition">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* 4. Newsletter */}
          <div>
            <h4 className="text-lg font-bold text-[#0b0c2a] mb-6 uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-gray-500 mb-4 text-sm">
              รับข่าวสารโปรโมชั่นเติมเกมก่อนใคร
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Email Address"
                className="w-full bg-gray-100 border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-[#e53637] outline-none transition"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#e53637] text-white p-2 rounded-md hover:bg-[#c42d2d] transition">
                <Icon icon="material-symbols:send-rounded" width={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2024 Anime Store. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {/* <Icon icon="logos:visa" width={35} /> */}
            {/* <Icon icon="logos:mastercard" width={35} /> */}
            {/* <Icon
              icon="logos:paypal"
              width={45}
              className="grayscale hover:grayscale-0 transition"
            /> */}
            <div className="flex items-center gap-1 font-bold text-[#0b0c2a]">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              System Online
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
