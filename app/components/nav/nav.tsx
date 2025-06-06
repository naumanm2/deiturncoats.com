"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/app/assets/svg/logo-horizontal.svg";
import GlobeIcon from "@/app/assets/svg/globe.svg";
import ShoppingBasketIcon from "@/app/assets/svg/shopping-basket.svg";

import { ShoppingBasket } from "./shopping-basket";
import { Menu } from "./menu";
import { LanguageSwitcher } from "./language-switcher";

import { cn } from "@/lib/utils";

type NavProps = {
  footer?: boolean;
  locale: "en" | "fi";
};

export const PRODUCT_SLUGS = [
  "values-not-found-jacket",
  "magical-shift-jacket",
  "the-return-coat",
];

export default function Nav({ footer, locale }: NavProps) {
  const pathname = usePathname();
  const [langOpen, setLangOpen] = useState(false);
  const [basketOpen, setBasketOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLang = () => {
    setBasketOpen(false);
    setLangOpen((open) => !open);
  };

  const toggleBasket = () => {
    setLangOpen(false);
    setBasketOpen((open) => !open);
  };

  return (
    <nav className="flex flex-col [&_button]:cursor-pointer">
      <div
        className={cn(
          "flex flex-row justify-between items-center md:items-start max-w-screen-[1720px] h-16 md:h-24 p-4 md:p-8 w-full z-0 top-0",
          footer ? "z-0" : "z-50"
        )}
      >
        <div className="flex-1">
          <Link
            href={`/${locale}`}
            className="[&>svg]:md:h-12 [&>svg]:h-8 h-min [&>svg]:w-auto"
            onClick={() => setMenuOpen(false)}
          >
            <Logo />
          </Link>
        </div>
        <div className="flex flex-1 justify-end items-end gap-1">
          <div className="flex flex-col flex-1 max-md:hidden text-[90%] uppercase">
            <div className="inline-block">
              <Link
                className="p-2 -m-2 underline hover:opacity-80 transition-opacity duration-200 ease-in-out"
                href={`/${locale}`}
              >
                <strong>{locale == "fi" ? "Koti" : "Home"}</strong>
              </Link>
            </div>
            <div className="inline-block">
              <Link
                className="p-2 -m-2 text-md underline hover:opacity-80 transition-opacity duration-200 ease-in-out"
                href={`/${locale}/about`}
              >
                <strong>{locale == "en" ? "About" : "Meistä"}</strong>
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {/* Language Toggle */}
            <div
              className={cn(
                "relative flex flex-col",
                footer && "flex-col-reverse"
              )}
            >
              <button
                className="transition-background duration-150 ease-in-out p-3 md:p-4 [&>svg]:h-16 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:bg-[#00000008] rounded-lg cursor-pointer"
                onClick={toggleLang}
                aria-label="Toggle language"
              >
                <GlobeIcon />
              </button>
              {langOpen && (
                <div className="absolute top-full mt-2 right-0 z-30">
                  <LanguageSwitcher
                    locale={locale}
                    pathname={pathname}
                    visible={langOpen}
                    onClose={() => setLangOpen(false)}
                  />
                </div>
              )}
            </div>

            {/* Basket Toggle */}
            <div
              className={cn(
                "relative flex flex-col items-end",
                footer && "flex-col-reverse"
              )}
            >
              <button
                className="transition-background duration-150 ease-in-out [&>svg]:h-16 p-3 md:p-4 w-11 h-13 md:w-13 md:h-13 flex items-center justify-center hover:bg-[#00000008] rounded-lg cursor-pointer"
                onClick={toggleBasket}
                aria-label="Toggle shopping basket"
              >
                <ShoppingBasketIcon />
              </button>
              {basketOpen && (
                <div className="absolute top-full mt-2 right-0 z-30">
                  <ShoppingBasket
                    locale={locale}
                    visible={basketOpen}
                    onClose={() => setBasketOpen(false)}
                  />
                </div>
              )}
            </div>
            {/* Menu */}
            {!footer && (
              <div className="transition-background duration-150 ease-in-out hover:bg-[#00000008] rounded-lg">
                <button
                  className="p-4 px-4 -mx-2 h-full md:hidden"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  {!menuOpen ? (
                    <>
                      <div className="h-0.5 w-8 rounded-[0.4px] bg-foreground"></div>
                      <div className="h-0.5 w-8 rounded-[0.4px] mt-1 bg-foreground"></div>
                    </>
                  ) : (
                    <>
                      <div className="h-0.5 w-8 rounded-[0.4px] -mb-0.5 bg-foreground origin-center rotate-[20deg]"></div>
                      <div className="h-0.5 w-8 rounded-[0.4px] bg-foreground origin-center -rotate-[20deg]"></div>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {menuOpen && !footer && (
        <Menu setOpen={setMenuOpen} open={menuOpen} locale={locale} />
      )}
    </nav>
  );
}
