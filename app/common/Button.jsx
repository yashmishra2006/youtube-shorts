export default function Button({
  type = "button",
  name,
  onClick,
  children,
  buttonType = 0,
  wfull = false,
  buttonColor = "",
}) {
  if (buttonType === 0)
    return (
      <button
        className={`${
          children ? "flex gap-2 items-center" : ""
        } ${buttonColor} text-white px-9 py-3 rounded-l-full rounded-r-full  duration-300  ${
          wfull ? "w-full" : "w-fit"
        } font-semibold text-center`}
        onClick={onClick}
        type={type}
      >
        {children} {name}
      </button>
    );
  else if (buttonType === 1)
    return (
      <button
        className={` bg-gray border-primary bg-transparent  py-3 rounded-l-full rounded-r-full  duration-300  ${
          wfull ? "w-full" : "w-fit"
        } font-semibold text-center`}
        onClick={onClick}
        type={type}
      >
        {children} {name}
      </button>
    );
}
