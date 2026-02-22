import BurgerMenu from "./burger-menu";
import Icon__LogoLigo from "./icon-logo-ligo";
import LangSwitcher from "./lang-switcher";

export default function HeaderHome() {
  return (
    <header className="fixed left-0 top-0 right-0 p-4 lg:p-10 pt-0 lg:pt-0 z-10">
      <div className="relative">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="bg-white p-4">
            <Icon__LogoLigo />
          </div>
          <div className="flex"></div>
        </div>
        <div className="absolute right-0 top-[50%] translate-y-[-50%] flex">
          <LangSwitcher />
          <BurgerMenu />
        </div>
      </div>
    </header>
  );
}
