import { Blog } from "./[id]/_components/blog-page";
import BlogsPage from "./_components/blogs-page";

const page = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs?limit=100`);
  const blogs: { data: Blog[] } = await res.json();
  return (
    <div className="pt-0">
      <BlogsPage blogs={blogs.data} />
    </div>
  );
};

export default page;
