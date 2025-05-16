"use client";

import React, { Dispatch, SetStateAction, useState } from "react";

import Logo from "@/app/assets/svg/logo-horizontal.svg";
import Globe from "@/app/assets/svg/globe.svg";
import ShoppingBasket from "@/app/assets/svg/shopping-basket.svg";
import Link from "next/link";

interface menuOptions {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Menu = ({ open, setOpen }: menuOptions) => {
  return (
    <>
      {open && (
        <div className="w-full flex-1 h-dvh fixed top-0 z-10 p-2 bg-background">
          <div className="flex flex-col h-full justify-end items-start gap-2 pb-32">
            <Link
              href="/"
              onClick={() => setOpen(!open)}
              className="font-medium text-4xl underline p-2 hover:underline"
            >
              Home
            </Link>
            <Link
              href="/products"
              onClick={() => setOpen(!open)}
              className="font-medium text-4xl underline p-2 hover:underline"
            >
              Products
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col">
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

            <button
              className="p-4 [&>svg]:h-5 md:hidden"
              onClick={() => setOpen(!open)}
            >
              {!open ? (
                <>
                  <div className="h-0.5 w-8 rounded-[0.4px] mb-1 bg-foreground"></div>
                  <div className="h-0.5 w-8 rounded-[0.4px] mb-1 bg-foreground"></div>
                </>
              ) : (
                <>
                  <div className="h-0.5 w-8 rounded-[0.4px] -mb-0.5 bg-foreground origin-center rotate-[20deg]"></div>
                  <div className="h-0.5 w-8 rounded-[0.4px] bg-foreground origin-center -rotate-[20deg]"></div>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <Menu setOpen={setOpen} open={open} />
    </div>
  );
}
