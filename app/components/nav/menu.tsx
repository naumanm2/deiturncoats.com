import Link from "next/link";

interface tMenu {
  open: boolean;
  setOpen: (open: boolean) => void;
  locale: "fi" | "en";
}

export const Menu = ({ open, setOpen, locale }: tMenu) => {
  return (
    <>
      {open && (
        <div className="w-full flex-1 h-dvh fixed top-0 z-40 p-2 bg-background">
          <div className="flex flex-col h-full justify-end items-start gap-2 pb-32">
            <Link
              href={`/${locale}`}
              onClick={() => setOpen(!open)}
              className="font-medium text-4xl underline p-2 hover:underline"
            >
              Home
            </Link>
            <Link
              href={locale == "fi" ? `/${locale}/about` : `/${locale}/about`}
              onClick={() => setOpen(!open)}
              className="font-medium text-4xl underline p-2 hover:underline"
            >
              About
            </Link>
          </div>
        </div>
      )}
    </>
  );
};