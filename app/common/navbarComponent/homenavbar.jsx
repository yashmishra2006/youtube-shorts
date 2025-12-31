import Link from "next/link";
import Image from "next/image";
import logo from "../../../assets/logo1.png";
import { IoMenu } from "../../common/Icons";
export default function HomeNavBar() {
  return (
    <div className=" md:hidden flex justify-end items-center py-3  px-4 pt-3 pb-3">
      <div className="md:hidden">
        <Link href="/" className="">
          <Image width={100} src={logo} alt="Image" />
        </Link>
      </div>
      <div className="md:hidden">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="p-2 border border-slate-400 rounded-full text-2xl"
        >
          <IoMenu />
        </button>
      </div>
    </div>
  );
}
// if (pathname === "/") {
//     mobileNavbar = <HomeNavBar />;
//   } else if (pathname === "/upload-video") {
//     mobileNavbar = <UploadVideoNavbar />;
//   }