"use client";

import { FaArrowLeftLong } from "../../../components/common/Icons";
import { useRouter } from "next/navigation";

export default function LegalHeader({ title }) {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 px-3 py-1 duration-300 border rounded-l-full rounded-r-full bg-tertiary hover:bg-slate-100 "
      >
        <FaArrowLeftLong /> <span className="mt-1 text-sm">Back</span>
      </button>
      <br />
      <h1 className="text-xl font-black">{title}</h1>
    </div>
  );
}
