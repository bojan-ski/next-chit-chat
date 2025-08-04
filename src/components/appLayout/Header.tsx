import { JSX } from "react";
import Logo from "./header/Logo";
import NavigationLinks from "./header/NavigationLinks";
import AuthOptions from "./header/AuthOptions";

export default function Header(): JSX.Element {
  return (
    <header className="sticky top-0 z-50 bg-[#FDF6F0] dark:bg-[#3B2F2F] border-b border-[#E5C6AC] dark:border-[#7C5C53] shadow-sm">
      <div className="max-w-7xl mx-auto px-5 xl:px-0 flex items-center justify-between h-18">
        {/* logo */}
        <Logo />

        {/* navigation links */}
        <NavigationLinks />

        {/* auth options */}
        <AuthOptions />
      </div>
    </header>
  );
}