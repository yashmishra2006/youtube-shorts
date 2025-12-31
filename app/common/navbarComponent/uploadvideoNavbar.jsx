import { IoMenu } from "../../common/Icons";
import Link from "next/link";

export default function UploadVideoNavbar() {
  return (
    <div className="relative flex justify-end items-center py-3 px-4 pt-3 pb-3">
      <div className="md:hidden flex items-center gap-2">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="p-2 border border-slate-400 rounded-full text-2xl"
        >
          <IoMenu />
        </button>
      </div>
      <div className="flex md:hidden items-center gap-2 ml-auto">
        <Link
          href="https://capsai.co/upload-video"
          className="py-2 px-4 rounded-full text-stone-700 bg-white border border-stone-300 font-medium"
        >
          Upload new
        </Link>
      </div>
    </div>
  );
}
