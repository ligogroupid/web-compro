import BurgerMenu from "./burger-menu";
import Icon__LogoLigo from "./icon-logo-ligo";
import LangSwitcher from "./lang-switcher";

export default function HeaderGeneral() {
  return (
    <header className="px-4 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="w-[90px] aspect-[90/55]">
          <Icon__LogoLigo width={90} />
        </div>
        <div className="flex">
          <LangSwitcher />
          <BurgerMenu closeOverlay={false} />
        </div>
      </div>
    </header>
  );
}
