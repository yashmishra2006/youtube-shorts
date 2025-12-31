import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../../imageUrlBuilder";
const BlogCard = ({ blog }) => {
  
  return (
    <>
      <Link href={blog.Language ? `/auto-subtitle-generator/${blog.Language}` : `/blog/${blog.slug.current}`} className="">
        <Image
         src={urlFor(blog.titleImage).url()} 
          alt={blog.title}
          className="w-full h-[200px]"
          width={350}
          height={200}
        />

        <div className="text-[#B0B0B0] text-[14px] mt-[10px]">
          {new Date(blog.publishedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </div>

        <div className="md:text-[24px] text-xl font-bold pr-12 mt-[5px]">
          {blog.title}
        </div>
      </Link>
    </>
  );
};
export default BlogCard;
