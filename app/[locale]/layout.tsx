// app/[locale]/layout.tsx
import type { Metadata } from "next";
import "../globals.css";
import Footer from "../components/footer/footer";
import Container from "../components/container";
import Nav from "../components/nav/nav";
import { Content } from "../util/types";

export const metadata: Metadata = {
  title: "DEI Turncoats",
  description: "Equality is so last season.",
};

const getLocaleContent = async (locale: string): Promise<Content> => {
  try {
    return (await import(`@/app/content/${locale}.json`)) as Content;
  } catch {
    return (await import(`@/app/content/en.json`)) as Content;
  }
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: "en" | "fi" }>;
}) {
  const { locale } = await params;
  const content = await getLocaleContent(locale);
  return (
    <html lang={locale}>
      <body className={`bg-background no-scrollbar antialiased`}>
        <Nav locale={locale} />
        <Container>{children}</Container>
        <Footer locale={locale} legal={content.legal} />
      </body>
    </html>
  );
}
