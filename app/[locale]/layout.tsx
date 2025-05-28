// app/[locale]/layout.tsx
import type { Metadata } from "next";
import "../globals.css";
import Footer from "../components/footer";
import Container from "../components/container";
import Nav from "../components/nav";
import { getLocale, state } from "@/utilities/l18n";
import { defaultLocale, locales } from "@/config";

export const metadata: Metadata = {
  title: "DEI Turncoats",
  description: "Equality is so last season.",
};

export type Props = {
  params: {
    locale?: "en" | "fi";
  };
};

export default function LocaleLayout({
  children,
  params: { locale },
}: Readonly<Props & { children: React.ReactNode }>) {
  const activeLocale = getLocale(locale);
  state.locale = activeLocale;
  return { children };
}

export function generateStaticParams(): Props["params"][] {
  return locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => ({ locale }));
}
