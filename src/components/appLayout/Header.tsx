import { JSX } from "react";
import { auth } from "@clerk/nextjs/server";
import Logo from "./header/Logo";
import HeaderClerk from "./header/HeaderClerk";

export default async function Header(): Promise<JSX.Element> {
  const { userId } = await auth();
  const isAdmin: boolean = userId == process.env.ADMIN_USER_ID;

  return (
    <header className="sticky top-0 z-50 bg-[#FDF6F0] border-b border-[#E5C6AC] shadow-sm">
      <div className="max-w-7xl mx-auto px-5 xl:px-0 flex items-center justify-between h-18">

        <Logo />

        <HeaderClerk isAdmin={isAdmin}/>

      </div>
    </header>
  );
}