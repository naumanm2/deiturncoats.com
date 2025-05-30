import { cn } from "@/lib/utils";
import Link from "next/link";

export const LanguageSwitcher = ({
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
      <div className="flex flex-col min-w-16 backdrop-blur-2xl bg-white/90 rounded-lg overflow-y-auto shadow-md border border-[#00000005] font-normal transition-background ease-in-out duration-150">
        <Link
          href={`/${locale}${localizedPath}`}
          onClick={onClose}
          className={cn(
            "hover:bg-[#00000008] w-full transition-background ease-in-out duration-150 p-4 pr-16 text-sm border-b-2 border-[#00000008]",
            "font-bold"
          )}
        >
          {locale.toUpperCase()}
        </Link>
        <Link
          href={newPath}
          onClick={onClose}
          className="hover:bg-[#00000010] w-full transition-background ease-in-out duration-150 p-4 pr-16 text-sm"
        >
          {otherLocale.toUpperCase()}
        </Link>
      </div>
    </div>
  );
};
