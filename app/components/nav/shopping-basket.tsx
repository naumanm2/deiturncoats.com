import Link from "next/link";
import CTA from "../cta";
import { PRODUCT_SLUGS } from "./nav";

export const ShoppingBasket = ({
  locale,
  onClose,
}: {
  locale: "en" | "fi";
  onClose: () => void;
}) => {
  const randomSlug =
    PRODUCT_SLUGS[Math.floor(Math.random() * PRODUCT_SLUGS.length)];
  const isFinnish = locale === "fi";

  return (
    <div
      className="h-min w-0 overflow-visible flex flex-col items-end"
      onClick={onClose}
    >
      <div className="max-w-sm w-[94vw] flex flex-col gap-8 p-4 pt-8 bg-white/90 backdrop-blur-2xl rounded-2xl border border-[#00000005] font-bold shadow-md">
        <small className="text-stone-500 text-center h-40">
          {isFinnish
            ? "Ostoskorisi on tyhjä"
            : "Your shopping basket seems to be empty."}
        </small>
        <div className="w-full border-t border-slate-200">
          <Link
            className="w-full p-2 mt-4 rounded-lg flex justify-between items-center px-3 py-3 bg-foreground transition-background hover:bg-[#232323] duration-200 ease-in-out"
            href={`/${locale}/${randomSlug}`}
          >
            <span className="font-bold text-white">
              {isFinnish ? "Ostoksille" : "Get to Shopping"}
            </span>
            <span className="text-white ">0,00 €</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
