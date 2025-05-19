"use client";

import React, { useEffect, useState } from "react";

import Logo from "@/app/assets/svg/logo-horizontal.svg";
import GlobeIcon from "@/app/assets/svg/globe.svg";
import ShoppingBasketIcon from "@/app/assets/svg/shopping-basket.svg";
import Link from "next/link";
import CTA from "./cta";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// interface menuOptions {
//   open: boolean;
//   setOpen: Dispatch<SetStateAction<boolean>>;
// }

// const Menu = ({ open, setOpen }: menuOptions) => {
//   return (
//     <>
//       {open && (
//         <div className="w-full flex-1 h-dvh fixed top-0 z-10 p-2 bg-background">
//           <div className="flex flex-col h-full justify-end items-start gap-2 pb-32">
//             <Link
//               href="/"
//               onClick={() => setOpen(!open)}
//               className="font-medium text-4xl underline p-2 hover:underline"
//             >
//               Home
//             </Link>
//             <Link
//               href="/products"
//               onClick={() => setOpen(!open)}
//               className="font-medium text-4xl underline p-2 hover:underline"
//             >
//               Products
//             </Link>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

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
          href={fi ? `/fi/${randomNumber}` : `/${randomNumber}`}
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
          <div className="flex flex-col flex-1 max-md:hidden">
            {/* <div className="inline-block">
              <Link className="p-2 -m-2" href="/">
                Home
              </Link>
            </div>
            <div className="inline-block">
              <Link className="p-2 -m-2" href="/">
                Products
              </Link>
            </div> */}
          </div>
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

            {/* <button
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
            </button> */}
          </div>
        </div>
      </div>
      {/* <Menu setOpen={setOpen} open={open} /> */}
    </div>
  );
}
