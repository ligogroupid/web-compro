import { Link } from "@/i18n/navigation";

import { getCompanyList } from "@/service/company";
import BurgerMenu from "./burger-menu";
import Icon__LogoLigo from "./icon-logo-ligo";
import LangSwitcher from "./lang-switcher";

export default async function HeaderGeneral() {
  const companies = await getCompanyList();

  return (
    // fixed left-0 top-0 right-0 p-4 lg:p-10 pt-0 lg:pt-0 z-10
    // <header className="sticky top-0 px-4 py-4 z-10 bg-white border-4 ">
    <header className="sticky top-0 bg-white py-2 lg:py-4 px-4 lg:px-10 z-10">
      <div className="relative">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="w-[90px] aspect-[90/55]">
            <Link href="/">
              <Icon__LogoLigo width={90} />
            </Link>
          </div>
          <div className="flex"></div>
        </div>
        <div className="absolute right-0 top-[50%] translate-y-[-50%] flex">
          <LangSwitcher />
          <BurgerMenu companies={companies} />
        </div>
      </div>
    </header>
  );
}
