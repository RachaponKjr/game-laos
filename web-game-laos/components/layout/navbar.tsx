"use client";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // นำเข้าเพื่อเช็ค Path ปัจจุบัน
import { Button } from "../ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // สำหรับ Mobile Menu
  const [scrolled, setScrolled] = useState(false);
  const { user, loading, logout } = useAuth();
  console.log(user);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleLoginGoogle = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  const handleLoginFacebook = () => {
    try {
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/facebook`;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Our Blog", href: "/blogs" },
    // { name: "Contacts", href: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 border-b border-[#FFFFFF]/20 shadow-lg left-0 w-full z-100 transition-all duration-300 ${
          scrolled ? "bg-[#0b0c2a]/95 backdrop-blur-md" : "bg-[#0b0c2a]"
        }`}
      >
        {/* 1. Top Banner */}
        <div className="bg-[#e53637] py-2 text-white">
          <div className="container mx-auto px-4 flex justify-center items-center gap-4 text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-center">
            <span>
              <Icon icon="mdi:fire" width={16} className="inline mr-1" /> NEW
              UPDATE: โปรโมชั่นเติมเกมประจำเดือน!
            </span>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl flex items-center justify-between px-4 lg:px-6 py-4">
          {/* 2. Logo */}
          <Link href="/" className="group shrink-0">
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-white uppercase italic">
              Ga<span className="text-[#e53637]">me</span>
            </h1>
          </Link>

          {/* 3. Desktop Menu */}
          <div className="hidden lg:flex flex-1 justify-center items-center">
            <ul className="flex items-center gap-2 font-bold uppercase text-sm tracking-widest text-white">
              {navLinks.map((link) => (
                <li key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className={`py-4 px-6 transition-colors ${
                      pathname === link.href
                        ? "text-[#e53637]"
                        : "hover:text-[#e53637]"
                    }`}
                  >
                    {link.name}
                  </Link>
                  {/* Indicator Line */}
                  <div
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#e53637] transition-all duration-300 ${pathname === link.href ? "w-1/2" : "w-0 group-hover:w-1/2"}`}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Actions Section */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-[#e53637] hover:bg-transparent"
            >
              <Icon
                icon="mdi:magnify"
                width={24}
                className="scale-110 md:scale-125"
              />
            </Button>

            {!loading && user ? (
              /* --- CASE: LOGGED IN (แสดงรูป User) --- */
              <Menubar className="bg-transparent border-none p-0 shadow-none">
                <MenubarMenu>
                  <MenubarTrigger className="bg-transparent p-0 focus:bg-transparent data-[state=open]:bg-transparent cursor-pointer">
                    <div className="flex items-center gap-2 group p-1 rounded-full hover:bg-white/5 transition-all">
                      <Image
                        width={40}
                        height={40}
                        src={
                          user.image ||
                          "https://ui-avatars.com/api/?name=" + user.name
                        }
                        alt="User Profile"
                        className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-[#e53637] object-cover"
                      />
                      <Icon
                        icon="mdi:chevron-down"
                        className="text-white group-hover:text-[#e53637] transition-colors"
                      />
                    </div>
                  </MenubarTrigger>

                  <MenubarContent
                    align="end"
                    className="bg-[#0b0c2a] border-white/10 text-white w-[240px] p-2 rounded-xl shadow-2xl"
                  >
                    <div className="px-3 py-4 text-center">
                      <p className="text-[10px] text-[#e53637] font-black uppercase tracking-widest mb-1">
                        Welcome back
                      </p>
                      <p className="text-sm font-bold truncate">{user.name}</p>
                      <p className="text-[10px] text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    <MenubarSeparator className="bg-white/10" />

                    {/* <MenubarItem className="rounded-lg cursor-pointer py-2.5 px-3 flex items-center gap-3 text-xs font-bold uppercase hover:bg-white/5 transition-all">
                      <Icon
                        icon="mdi:account-circle"
                        width={18}
                        className="text-[#e53637]"
                      />
                      My Profile
                    </MenubarItem> */}

                    <MenubarItem className="rounded-lg cursor-pointer py-2.5 px-3 flex items-center gap-3 text-xs font-bold uppercase hover:bg-white/5 transition-all">
                      <Link
                        href="/history"
                        className="flex items-center gap-3 w-full h-full"
                      >
                        <Icon
                          icon="mdi:controller"
                          width={18}
                          className="text-[#e53637]"
                        />
                        Game History
                      </Link>
                    </MenubarItem>

                    <MenubarSeparator className="bg-white/10" />

                    <MenubarItem
                      onClick={() => logout()}
                      className="rounded-lg cursor-pointer py-2.5 px-3 flex text-white items-center gap-3 text-xs font-bold uppercase hover:bg-[#e53637] hover:text-white transition-all"
                    >
                      <Icon icon="mdi:logout" width={18} />
                      Logout
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            ) : (
              /* --- CASE: NOT LOGGED IN (แสดงปุ่ม Login เดิม) --- */
              <Menubar className="bg-transparent border-none p-0 shadow-none">
                <MenubarMenu>
                  <MenubarTrigger className="bg-transparent p-0 focus:bg-transparent data-[state=open]:bg-transparent cursor-pointer">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:text-[#e53637] hover:bg-transparent transition-transform active:scale-90"
                    >
                      <Icon
                        icon="mdi:account"
                        width={24}
                        className="scale-125 md:scale-150"
                      />
                    </Button>
                  </MenubarTrigger>

                  <MenubarContent
                    align="end"
                    className="bg-[#0b0c2a] border-white/10 text-white w-[300px] p-5 rounded-xl shadow-2xl"
                  >
                    <div className="px-2 py-2 mb-2">
                      <p className="text-[10px] text-[#e53637] font-black uppercase tracking-widest">
                        Member Area
                      </p>
                      <p className="text-sm font-bold">จัดการบัญชีของคุณ</p>
                    </div>
                    <MenubarSeparator className="bg-white/10" />
                    <div className="flex flex-col gap-2 mt-4">
                      <MenubarItem
                        className="text-black rounded-lg cursor-pointer py-3 flex justify-center bg-white gap-3 font-bold text-xs uppercase hover:bg-gray-200 transition-all"
                        onClick={() => handleLoginGoogle()}
                      >
                        <Icon icon="logos:google-icon" width={18} />
                        Login with Google
                      </MenubarItem>
                      <MenubarItem
                        className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white rounded-lg cursor-pointer py-3 flex justify-center gap-3 font-bold text-xs uppercase transition-all"
                        onClick={() => handleLoginFacebook()}
                      >
                        <Icon icon="logos:facebook" width={18} />
                        Login with Facebook
                      </MenubarItem>
                    </div>
                    <MenubarSeparator className="bg-white/10 my-4" />
                    <Link
                      href="/register"
                      className="block text-center text-[10px] text-gray-400 uppercase font-bold tracking-widest hover:text-white transition-colors"
                    >
                      Don&apos;t have an account? Sign Up
                    </Link>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-white hover:text-[#e53637] transition-colors z-110"
            >
              <Icon icon={isOpen ? "mdi:close" : "mdi:menu"} width={28} />
            </button>
          </div>
        </div>

        {/* --- 5. Mobile Menu Overlay --- */}
        <div
          className={`lg:hidden fixed inset-0 w-full h-screen bg-[#0b0c2a] transition-all duration-300 ease-in-out z-90 ${
            isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
          style={{ paddingTop: "20px" }} // ให้เนื้อหาเริ่มต่อจาก Navbar พอดี
        >
          <div className="flex flex-col p-8 h-full overflow-y-auto">
            <p className="text-[10px] text-[#e53637] font-black uppercase tracking-[0.3em] mb-4">
              Navigation
            </p>
            <ul className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)} // ปิดเมนูเมื่อกดลิงก์
                    className={`text-2xl font-black uppercase italic tracking-tighter transition-all ${
                      pathname === link.href
                        ? "text-[#e53637] pl-4"
                        : "text-white hover:pl-4 hover:text-[#e53637]"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Footer Inside Menu */}
            <div className="mt-auto pb-10">
              {" "}
              {/* เพิ่ม padding bottom กันถูกบัง */}
              <div className="h-px bg-white/10 w-full mb-8" />
              <p className="text-gray-500 text-xs uppercase font-bold tracking-widest">
                Follow Us
              </p>
              <div className="flex gap-4 mt-4">
                <Icon icon="mdi:facebook" width={24} className="text-white" />
                <Icon icon="mdi:twitter" width={24} className="text-white" />
                <Icon icon="mdi:instagram" width={24} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
