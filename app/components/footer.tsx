import React from "react";
import Nav from "./nav";

export default function Footer() {
  return (
    <footer className="pb-48">
      <Nav footer />
      {/* <Link className="[&>svg]:h-12" href="/">
        <LogoHorizontal />
      </Link>
      <div className="flex flex-row gap-2 justify-end max-md:flex-1">
        <button className="p-4 [&>svg]:h-6 hover:bg-[#00000010] rounded-lg">
          <Globe />
        </button>
        <button className="p-4 [&>svg]:h-5  hover:bg-[#00000010] rounded-lg">
          <ShoppingBasket />
        </button>
      </div> */}
    </footer>
  );
}
