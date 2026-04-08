import Icon__ArrowRight from "./icon-arrow-right";

type Props = React.ComponentPropsWithoutRef<"button"> & {
  variant?: "default" | "onDark";
};

export default function ButtonBrand({
  children,
  type = "button",
  variant = "default",
  ...props
}: Props) {
  const isOnDark = variant === "onDark";
  return (
    <button
      type={type}
      {...props}
      className={`relative cursor-pointer flex justify-between gap-2 min-w-[230px] border-b group text-lg font-bold active:scale-90 transition-all hover:[&>svg]:-rotate-45 [&>svg]:transition-all [&>svg]:duration-500 ${isOnDark ? "border-b-white text-white" : "border-b-primary-blue"}`}
    >
      {children}
      <Icon__ArrowRight />
      <div className="absolute right-0 -bottom-1 h-1 bg-primary-red w-[20%] group-hover:w-[100%] group-hover:duration-[750ms] ease-out transition-all duration-300" />
    </button>
  );
}
