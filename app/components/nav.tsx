"use client";

import React, { useEffect, useState } from "react";

import Logo from "@/app/assets/svg/logo-horizontal.svg";
import GlobeIcon from "@/app/assets/svg/globe.svg";
import ShoppingBasketIcon from "@/app/assets/svg/shopping-basket.svg";
import Link from "next/link";
import CTA from "./cta";
import { usePathname, useRouter } from "next/navigation";
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
  language,
  handleClick,
}: {
  paths: string;
  language: string;
  handleClick: React.MouseEventHandler;
}) => {
  const fi = language === "fi";

  return (
    <div className="h-0 overflow-visible" onClick={handleClick}>
      <div
        className={cn(
          "flex shadow-md flex-col bg-white rounded-2xl border-[1px] border-[#00000005] font-normal"
        )}
      >
        <Link
          href={
            fi
              ? paths.substring(3).length == 0
                ? "/"
                : paths.substring(3)
              : paths
          }
          className={cn(
            "hover:bg-[#00000010] w-full p-4 pl-4 pr-16 rounded-t-2xl border-b-2 border-[#00000008] text-sm",
            !fi && "font-bold"
          )}
        >
          EN
        </Link>
        <Link
          href={!fi ? `/fi/${paths}` : paths}
          className={cn(
            "hover:bg-[#00000010] w-full p-4 pl-4 pr-16 rounded-b-2xl text-sm",
            fi && "font-bold"
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
      className="h-0 w-0 overflow-visible flex flex-col items-end"
      onClick={handleClick}
    >
      <div className="w-sm flex flex-col gap-8 p-8 bg-white rounded-2xl border-[1px] border-[#00000005] font-bold shadow-md">
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

export default function Nav() {
  const paths = usePathname();
  const router = useRouter();

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
    setLangOpen(!langOpen);
  };

  const handleBasketClick = () => {
    setLangOpen(false);
    setBasketOpen(!basketOpen);
  };

  const switchLanguage = () => {
    const isFinnish = paths.startsWith("/fi");
    const newPath = isFinnish
      ? paths.replace(/^\/fi/, "") || "/" // FI → EN
      : `/fi${paths}`; // EN → FI

    router.push(newPath);

  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items- box-border max-w-screen-[1720px] p-4 md:p-8 w-full pb-0 md:pb-0 z-20 top-0">
        <Link
          className="[&>svg]:h-12 [&>svg]:w-auto text-left"
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
          <div className="flex flex-row gap-2 justify-end max-md:flex-1">
            <div className="flex flex-col items-end">
              <button
                className="p-4 [&>svg]:h-6 w-fit  hover:bg-[#00000010] rounded-lg"
                onClick={handleLangClick}
              >
                <GlobeIcon />
              </button>
              {langOpen && (
                <LanguageOptions
                  paths={paths}
                  language={language}
                  handleClick={() => switchLanguage()}
                />
              )}
            </div>
            <div className="flex flex-col items-end">
              <button
                className="p-4 [&>svg]:h-6 w-fit  hover:bg-[#00000010] rounded-lg"
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
