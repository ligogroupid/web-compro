import { Link } from "@/i18n/navigation";

import Icon__ArrowRight from "./icon-arrow-right";

type Props = {
  href: string;
  children: React.ReactNode;
  scroll?: boolean;
};

export default function ButtonBrandLink({
  href,
  children,
  scroll = true,
}: Props) {
  return (
    <Link
      href={href}
      scroll={scroll}
      className="relative inline-flex cursor-pointer justify-between gap-2 min-w-[230px] border-b border-b-primary-blue hover:bg-primary-blue hover:text-white group text-lg font-bold active:scale-90 transition-all"
    >
      {children}
      <Icon__ArrowRight />
      <div className="absolute right-0 -bottom-1 h-1 bg-primary-red w-[20%] group-hover:w-[100%] group-hover:duration-[750ms] ease-out transition-all duration-300" />
    </Link>
  );
}
