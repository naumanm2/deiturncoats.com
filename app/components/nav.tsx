"use client";

import React, { useEffect, useState } from "react";

import Logo from "@/app/assets/svg/logo-horizontal.svg";
import GlobeIcon from "@/app/assets/svg/globe.svg";
import ShoppingBasketIcon from "@/app/assets/svg/shopping-basket.svg";
import Link from "next/link";
import CTA from "./cta";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LanguageOptions = ({
  paths,
  setLangOpen,
}: {
  paths: string;
  setLangOpen: (open: boolean) => void;
}) => {
  const isFinnish = paths.startsWith("/fi");
  const basePath = isFinnish ? paths.replace(/^\/fi/, "") || "/" : paths;
  const fiPath = isFinnish ? paths : `/fi${paths === "/" ? "" : paths}`;

  return (
    <div className="h-min overflow-visible">
      <div className="flex shadow-md flex-col bg-white rounded-2xl border-[1px] border-[#00000005] font-normal">
        <Link
          href={basePath}
          onClick={() => setLangOpen(false)}
          className={cn(
            "hover:bg-[#00000010] w-full p-4 pl-4 pr-16 rounded-t-2xl border-b-2 border-[#00000008] text-sm",
            !isFinnish && "font-bold"
          )}
        >
          EN
        </Link>
        <Link
          href={fiPath}
          onClick={() => setLangOpen(false)}
          className={cn(
            "hover:bg-[#00000010] w-full p-4 pl-4 pr-16 rounded-b-2xl text-sm",
            isFinnish && "font-bold"
          )}
        >
          FI
        </Link>
      </div>
    </div>
  );
};

const ShoppingBasket = ({
  language,
  handleClick,
}: {
  language: string;
  handleClick: React.MouseEventHandler;
}) => {
  const randomNumber = Math.floor(Math.random() * 3) + 1;
  const fi = language === "fi";
  const productSlugs = ["disney", "amazon", "google"];
  return (
    <div
      className="h-min w-0 overflow-visible flex flex-col items-end"
      onClick={handleClick}
    >
      <div className="max-w-sm w-[94vw] flex flex-col gap-8 p-8 bg-white rounded-2xl border-[1px] border-[#00000005] font-bold shadow-md">
        <p>
          {fi
            ? "Ostoskorisi on tyhjä"
            : "Your shopping basket seems to be empty."}
        </p>
        <Link
          className="w-full [&>button]:w-full"
          href={
            fi
              ? `/fi/${productSlugs[randomNumber-1]}`
              : `/${productSlugs[randomNumber-1]}`
          }
        >
          <CTA text={fi ? "Ostoksille" : "Get to Shopping"} primary />
        </Link>
      </div>
    </div>
  );
};

export default function Nav({ footer }: { footer?: boolean }) {
  const paths = usePathname();

  const [language, setLanguage] = useState("en");
  const [langOpen, setLangOpen] = useState(false);
  const [basketOpen, setBasketOpen] = useState(false);

  useEffect(() => {
    console.log("sliced path: ", paths.startsWith("/fi"));
    if (paths.length > 0 && paths.startsWith("/fi")) {
      setLanguage("fi");
    }
  }, [paths]);

  const handleLangClick = () => {
    setBasketOpen(false);
    setLangOpen((prev) => !prev);
  };

  const handleBasketClick = () => {
    setLangOpen(false);
    setBasketOpen(!basketOpen);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items- box-border max-w-screen-[1720px] h-16 md:h-24 p-4 md:p-8 w-full pb-0 md:pb-0 z-20 top-0">
        <Link
          className="[&>svg]:md:h-12 [&>svg]:h-8 h-min self-center [&>svg]:w-auto text-left"
          href={language == "fi" ? "/fi" : "/"}
        >
          <Logo />
        </Link>
        <div className="flex-1 flex flex-row">
          <div className="flex flex-col flex-1 max-md:hidden"></div>
          <div className="flex flex-row gap-0 md:gap-2 justify-end max-md:flex-1">
            <div
              className={cn(
                "flex flex-col gap-2 items-end",
                footer && "flex-col-reverse"
              )}
            >
              <button
                className="p-3 md:p-4 [&>svg]:h-16 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center hover:bg-[#00000010] rounded-lg"
                onClick={() => handleLangClick()}
              >
                <GlobeIcon />
              </button>
              {langOpen && (
                <LanguageOptions paths={paths} setLangOpen={setLangOpen} />
              )}
            </div>
            <div
              className={cn(
                "flex flex-col gap-2 items-end",
                footer && "flex-col-reverse"
              )}
            >
              <button
                className="p-3 md:p-4 [&>svg]:h-16 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center hover:bg-[#00000010] rounded-lg"
                onClick={handleBasketClick}
              >
                <ShoppingBasketIcon />
              </button>
              {basketOpen && (
                <ShoppingBasket
                  language={language}
                  handleClick={() => setBasketOpen(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
