import { Link } from "@/i18n/navigation";

import { getCompanyList } from "@/service/company";
import BurgerMenu from "./burger-menu";
import Icon__LogoLigo from "./icon-logo-ligo";
import LangSwitcher from "./lang-switcher";

type Props = {
  variant?: "home" | "general";
};

export default async function Header({ variant = "general" }: Props) {
  const companies = await getCompanyList();
  const isHome = variant === "home";

  return (
    <>
      {/* Logo header — always static, scrolls away naturally */}
      <header
        className={
          isHome
            ? "absolute left-0 top-0 w-full p-4 lg:p-10 pt-0 lg:pt-0 z-10"
            : "bg-white py-2 lg:py-4 px-4 lg:px-10 z-10 h-header"
        }
      >
        <div className="flex items-center max-w-7xl mx-auto">
          <Link href="/">
            {isHome ? (
              <div className="relative">
                <div className="bg-white p-8">
                  <Icon__LogoLigo width={92} />
                </div>
                <div className="h-3 bg-white w-1/2" />
              </div>
            ) : (
              <div className="w-[70px] aspect-[90/55]">
                <Icon__LogoLigo width={90} />
              </div>
            )}
          </Link>
        </div>
      </header>

      {/* Nav controls — always fixed top-right */}
      <div className="fixed top-0 right-0 py-2 lg:py-4 px-4 lg:px-10 flex z-50">
        <LangSwitcher />
        <BurgerMenu companies={companies} />
      </div>
    </>
  );
}
