import React from "react";

import Logo from "@/app/assets/svg/logo-round.svg";
import Globe from "@/app/assets/svg/globe.svg";
import ShoppingBasket from "@/app/assets/svg/shopping-basket.svg";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-row justify-between box-border max-w-screen-[1720px] p-4 md:p-8 w-full md:pb-0 z-20 top-0">
        <div className="flex-1 [&>svg]:h-12 [&>svg]:w-auto text-left">
          <Logo />
        </div>
        <div className="flex-1 flex flex-row">
          <div className="flex flex-col flex-1 max-md:hidden">
            <div className="inline-block">
              <Link className="p-2 -m-2" href="/">
                Home
              </Link>
            </div>
            <div className="inline-block">
              <Link className="p-2 -m-2" href="/">
                Products
              </Link>
            </div>
          </div>
          <div className="flex flex-row gap-2 justify-end max-md:flex-1">
            <button className="p-4 [&>svg]:h-6 hover:bg-[#00000010] rounded-lg">
              <Globe />
            </button>
            <button className="p-4 [&>svg]:h-5  hover:bg-[#00000010] rounded-lg">
              <ShoppingBasket />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
