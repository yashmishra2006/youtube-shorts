import Button from "./Button";
import Link from "next/link";
export default function Card({
  title = "",
  text1 = "",
  text2 = "",
  buttonName = "",
  buttonOnClick,
  children,
  buttonClass,
  buttonColor,
}) {
  if (!children)
    return (
      <div className="flex flex-col gap-6 md:gap-10 p-10 lg:p-20 rounded-2xl lg:rounded-[2.5rem] h-full" 
      // style={{height:"564px",width:"574px"}}
      >
        {title && (
          <h1 className="text-2xl md:text-2xl lg:text-4xl font-semibold" 
          style={{ fontFamily: "Anton, sans-serif" }}
          >
            {title}
          </h1>
        )}

        {text1 && <p className="text-sm md:text-lg ">{text1}</p>}
        {text2 && <p className="text-sm md:text-lg ">{text2}</p>}

        {buttonName && (
          <Link className=" w-fit h-fit" href="/upload-video">
            <Button
              onClick={buttonOnClick}
              className={buttonClass}
              buttonColor={buttonColor}
            >
              {buttonName}
            </Button>{" "}
          </Link>
        )}
      </div>
    );

  return (
    <div className="flex flex-col gap-10 p-10 lg:p-20 shadow-xl shadow-gray-200 dark:shadow-none rounded-3xl  justify-center items-center h-full">
      {children}
    </div>
  );
}
