import React from "react";

import Logo from "@/app/assets/svg/logo-round.svg";
import LogoHorizontal from "@/app/assets/svg/logo-horizontal.svg";
import Globe from "@/app/assets/svg/globe.svg";
import ShoppingBasket from "@/app/assets/svg/shopping-basket.svg";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex-1 flex pb-48 justify-start items-start flex-row gap-4 px-4 md:px-8">
      <div className="[&>svg]:h-12 flex-1">
        <LogoHorizontal />
      </div>
      <div className="flex flex-row gap-2 justify-end max-md:flex-1">
        <button className="p-4 [&>svg]:h-6 hover:bg-[#00000010] rounded-lg">
          <Globe />
        </button>
        <button className="p-4 [&>svg]:h-5  hover:bg-[#00000010] rounded-lg">
          <ShoppingBasket />
        </button>
      </div>
    </footer>
  );
}
