import React from "react";
import { BlogType } from "@/types/blog.type";
import Image from "next/image";
import Link from "next/link";

const BlogItem = ({ blog }: { blog: BlogType }) => {
  return (
    <Link
      href={`/blogs/${blog.id}`}
      className="w-full max-w-full cursor-pointer hover:scale-102 transition-all duration-300 aspect-16/8 overflow-hidden rounded-xl relative flex items-end"
    >
      <Image
        src={blog.imageUrl}
        alt={blog.title}
        fill
        className="object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-t z-20! from-black/50 via-black/10 to-transparent"></div>
      <div className=" flex flex-col gap-2 p-6 z-20 text-white">
        <h5 className="text-sm md:text-xl max-w-xl font-bold">{blog.title}</h5>
        <p className="max-w-xl text-xs md:text-sm line-clamp-2">
          {blog.content}
        </p>
      </div>
    </Link>
  );
};

export default BlogItem;
