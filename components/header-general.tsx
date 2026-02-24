import { Link } from "@/i18n/navigation";

import { getCompanyList } from "@/service/company";
import BurgerMenu from "./burger-menu";
import Icon__LogoLigo from "./icon-logo-ligo";
import LangSwitcher from "./lang-switcher";

export default async function HeaderGeneral() {
  const companies = await getCompanyList();

  return (
    <header className="sticky top-0 px-4 py-4 z-10 bg-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="w-[90px] aspect-[90/55]">
          <Link href="/">
            <Icon__LogoLigo width={90} />
          </Link>
        </div>
        <div className="flex">
          <LangSwitcher />
          <BurgerMenu companies={companies} />
        </div>
      </div>
    </header>
  );
}
