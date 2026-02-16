import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Blog } from "../[id]/_components/blog-page";

const BlogsPage = ({ blogs }: { blogs: Blog[] }) => {
  return (
    <div className="min-h-screen bg-[#0b0c2a] pt-32 pb-20">
      <div className="container mx-auto max-w-7xl px-4 lg:px-6">
        {/* Header Section */}
        <div className="mb-12 border-l-6 border-[#e53637] pl-6">
          <p className="text-[12px] text-[#e53637] font-black uppercase tracking-[0.3em] mb-2">
            Noctura Newsroom
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
            Our <span className="text-[#e53637]">Blogs</span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl text-sm md:text-base">
            ติดตามข่าวสาร อัปเดตแพตช์เกม
            และไกด์การเล่นที่น่าสนใจจากทีมงานมืออาชีพได้ที่นี่
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs?.map((blog) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.id}`}
              className="group bg-[#151639] rounded-2xl overflow-hidden border border-white/5 hover:border-[#e53637]/50 transition-all duration-500 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  fill
                  objectFit="cover"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-[#e53637] text-white text-[10px] font-black px-3 py-1 uppercase rounded-full">
                  {blog.tag}
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-3">
                  <span className="flex items-center gap-1">
                    <Icon icon="mdi:calendar" className="text-[#e53637]" />
                    {blog.createdAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon icon="mdi:account" className="text-[#e53637]" />
                    Admin
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#e53637] transition-colors line-clamp-2 uppercase">
                  {blog.title}
                </h3>

                <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-1">
                  {blog.title}
                </p>

                <div className="flex items-center text-[#e53637] text-[12px] font-black uppercase tracking-widest gap-2 group-hover:gap-4 transition-all">
                  Read More
                  <Icon icon="mdi:arrow-right" width={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination (Optional) */}
        {/* <div className="mt-16 flex justify-center gap-4">
          <button className="w-10 h-10 rounded-lg bg-[#151639] border border-white/10 flex items-center justify-center text-white hover:bg-[#e53637] transition-all">
            <Icon icon="mdi:chevron-left" width={24} />
          </button>
          <button className="w-10 h-10 rounded-lg bg-[#e53637] flex items-center justify-center text-white font-bold">
            1
          </button>
          <button className="w-10 h-10 rounded-lg bg-[#151639] border border-white/10 flex items-center justify-center text-white hover:bg-[#e53637] transition-all">
            2
          </button>
          <button className="w-10 h-10 rounded-lg bg-[#151639] border border-white/10 flex items-center justify-center text-white hover:bg-[#e53637] transition-all">
            <Icon icon="mdi:chevron-right" width={24} />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default BlogsPage;
