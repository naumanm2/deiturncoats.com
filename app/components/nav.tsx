"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/app/assets/svg/logo-horizontal.svg";
import GlobeIcon from "@/app/assets/svg/globe.svg";
import ShoppingBasketIcon from "@/app/assets/svg/shopping-basket.svg";

import CTA from "./cta";
import { cn } from "@/lib/utils";

const PRODUCT_SLUGS = ["disney", "amazon", "google"];

type NavProps = {
  footer?: boolean;
  locale: "en" | "fi";
};

const LanguageSwitcher = ({
  locale,
  pathname,
  onClose,
}: {
  locale: "en" | "fi";
  pathname: string;
  onClose: () => void;
}) => {
  const otherLocale = locale === "en" ? "fi" : "en";

  const localizedPath = pathname.replace(`/${locale}`, "") || "/";
  const newPath = `/${otherLocale}${localizedPath}`;

  return (
    <div className="h-min overflow-visible">
      <div className="flex flex-col bg-white rounded-2xl shadow-md border border-[#00000005] font-normal">
        <Link
          href={`/${locale}${localizedPath}`}
          onClick={onClose}
          className={cn(
            "hover:bg-[#00000010] w-full p-4 pr-16 text-sm border-b-2 border-[#00000008] rounded-t-2xl",
            "font-bold"
          )}
        >
          {locale.toUpperCase()}
        </Link>
        <Link
          href={newPath}
          onClick={onClose}
          className="hover:bg-[#00000010] w-full p-4 pr-16 text-sm rounded-b-2xl"
        >
          {otherLocale.toUpperCase()}
        </Link>
      </div>
    </div>
  );
};

const ShoppingBasket = ({
  locale,
  onClose,
}: {
  locale: "en" | "fi";
  onClose: () => void;
}) => {
  const randomSlug = PRODUCT_SLUGS[Math.floor(Math.random() * PRODUCT_SLUGS.length)];
  const isFinnish = locale === "fi";

  return (
    <div className="h-min w-0 overflow-visible flex flex-col items-end" onClick={onClose}>
      <div className="max-w-sm w-[94vw] flex flex-col gap-8 p-8 bg-white rounded-2xl border border-[#00000005] font-bold shadow-md">
        <p>
          {isFinnish
            ? "Ostoskorisi on tyhjä"
            : "Your shopping basket seems to be empty."}
        </p>
        <div className="w-full">
          <CTA
            text={isFinnish ? "Ostoksille" : "Get to Shopping"}
            primary
            url={`/${locale}/${randomSlug}`}
          />
        </div>
      </div>
    </div>
  );
};

export default function Nav({ footer, locale }: NavProps) {
  const pathname = usePathname();
  const [langOpen, setLangOpen] = useState(false);
  const [basketOpen, setBasketOpen] = useState(false);

  const toggleLang = () => {
    setBasketOpen(false);
    setLangOpen((open) => !open);
  };

  const toggleBasket = () => {
    setLangOpen(false);
    setBasketOpen((open) => !open);
  };

  return (
    <nav className="flex flex-col">
      <div className="flex flex-row justify-between items-center max-w-screen-[1720px] h-16 md:h-24 p-4 md:p-8 w-full z-20 top-0">
        <Link
          href={`/${locale}`}
          className="[&>svg]:md:h-12 [&>svg]:h-8 h-min [&>svg]:w-auto"
        >
          <Logo />
        </Link>
<div className="flex flex-1 justify-end gap-2">
  {/* Language Toggle */}
  <div className={cn("relative flex flex-col items-end", footer && "flex-col-reverse")}>
    <button
      className="p-3 md:p-4 [&>svg]:h-16 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center hover:bg-[#00000010] rounded-lg"
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
          onClose={() => setLangOpen(false)}
        />
      </div>
    )}
  </div>

  {/* Basket Toggle */}
  <div className={cn("relative flex flex-col items-end", footer && "flex-col-reverse")}>
    <button
      className="p-3 md:p-4 [&>svg]:h-16 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center hover:bg-[#00000010] rounded-lg"
      onClick={toggleBasket}
      aria-label="Toggle shopping basket"
    >
      <ShoppingBasketIcon />
    </button>
    {basketOpen && (
      <div className="absolute top-full mt-2 right-0 z-30">
        <ShoppingBasket
          locale={locale}
          onClose={() => setBasketOpen(false)}
        />
      </div>
    )}
  </div>
</div>
      </div>
    </nav>
  );
}