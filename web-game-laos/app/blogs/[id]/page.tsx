import React from "react";
import BlogDetailPage from "./_components/blog-page";

const page = async ({ params }: { params: Promise<{ id?: string }> }) => {
  return <BlogDetailPage params={params} />;
};

export default page;
