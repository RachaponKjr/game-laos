import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";
import dayjs from "dayjs";

export interface Blog {
  id: string;
  title: string;
  imageUrl: string;
  metaDescription: string;
  createdAt: string;
  metaTitle: string;
  status: string;
  viewCount: number;
  tag: string;
  content: string;
  updatedAt: string;
}

const BlogDetailPage = async ({
  params,
}: {
  params: Promise<{ id?: string }>;
}) => {
  const { id } = await params;
  // const blog = getBlogData(id || "1");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`);
  const blog: Blog = await res.json();

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}/view`, {
    method: "PATCH",
  });

  return (
    <div className="min-h-screen bg-[#0b0c2a] pt-24 pb-20">
      {/* 1. Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] w-full">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          fill
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0b0c2a] via-[#0b0c2a]/40 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full">
          <div className="container mx-auto max-w-5xl px-4 pb-10">
            <span className="bg-[#e53637] text-white text-[10px] font-black px-4 py-1.5 uppercase rounded-full mb-4 inline-block">
              {blog.tag}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase italic tracking-tighter leading-none mb-6">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-300 text-xs font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <Icon icon="mdi:account" className="text-[#e53637] text-lg" />
                BY Admin
              </span>
              <span className="flex items-center gap-2">
                <Icon icon="mdi:calendar" className="text-[#e53637] text-lg" />
                {dayjs(blog.createdAt).format("DD/MM/YYYY")}
              </span>
              <span className="flex items-center gap-2">
                <Icon icon="mdi:eye" className="text-[#e53637] text-lg" />
                {blog.viewCount} VIEWS
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="container mx-auto max-w-7xl px-4 lg:px-6 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3 ">
            <article
              className="prose prose-invert prose-red max-w-none 
                prose-p:text-white prose-p:leading-relaxed prose-p:text-lg
                prose-headings:text-white prose-headings:uppercase prose-headings:italic
                prose-blockquote:border-[#e53637] prose-blockquote:bg-[#151639] prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
                prose-strong:text-[#e53637]
                prose-img:rounded-lg
                whitespace-pre-wrap
               wrap-break-word
                "
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-2">
              {blog.tag.split(",").map((tag) => (
                <span
                  key={tag}
                  className="bg-[#151639] text-gray-400 text-[10px] font-bold px-3 py-1 rounded hover:text-white transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Share Section */}
            <div className="mt-8 flex items-center gap-4">
              <span className="text-white font-bold uppercase text-xs">
                Share:
              </span>
              <button className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:scale-110 transition-transform">
                <Icon icon="mdi:facebook" width={20} />
              </button>
              <button className="w-10 h-10 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white hover:scale-110 transition-transform">
                <Icon icon="mdi:twitter" width={20} />
              </button>
              <button className="w-10 h-10 rounded-full bg-[#e53637] flex items-center justify-center text-white hover:scale-110 transition-transform">
                <Icon icon="mdi:link-variant" width={20} />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-10">
            {/* Search Box */}
            <div className="bg-[#151639] p-6 rounded-2xl border border-white/5">
              <h4 className="text-white font-bold uppercase mb-4 italic">
                Search
              </h4>
              <div className="relative">
                <input
                  type="text"
                  placeholder="ค้นหาบทความ..."
                  className="w-full bg-[#0b0c2a] border border-white/10 rounded-lg py-3 px-4 text-sm text-white focus:outline-none focus:border-[#e53637] transition-colors"
                />
                <Icon
                  icon="mdi:magnify"
                  className="absolute right-3 top-3 text-gray-500"
                  width={20}
                />
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-[#151639] p-6 rounded-2xl border border-white/5">
              <h4 className="text-white font-bold uppercase mb-6 italic border-l-4 border-[#e53637] pl-4">
                Recent Posts
              </h4>
              <div className="space-y-6">
                {[1, 2, 3].map((item) => (
                  <Link key={item} href="#" className="flex gap-4 group">
                    <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden relative">
                      <Image
                        src={`https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=200&auto=format&fit=crop`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        alt="recent"
                        fill
                      />
                    </div>
                    <div>
                      <h5 className="text-white text-sm font-bold line-clamp-2 group-hover:text-[#e53637] transition-colors uppercase leading-tight">
                        อัปเดต Patch ใหม่: ฮีโร่ตัวไหนโกงที่สุด?
                      </h5>
                      <p className="text-[#e53637] text-[10px] font-bold mt-2 uppercase italic">
                        Feb 03, 2026
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
