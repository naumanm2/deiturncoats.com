import type { Metadata } from "next";
import "./globals.css";
import LogoVert from "@/app/assets/svg/logo-round.svg";

import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "DEI Turncoats",
  description: "Get ready to turn your world inside out.",
};

const PPMonumental = localFont({
  src: [
    {
      path: "../public/fonts/PPMonumentExtended-Black.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pp-monumental",
});

export default function RootLayout({}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${PPMonumental.variable} bg-background no-scrollbar antialiased`}
      >
        <div className="h-dvh w-full flex justify-center flex-col gap-0 items-center text-center bg-[#222222] text-white">
          <LogoVert className="h-64 md:h-96 text-white pb-24" />
          <h3
            className={`${PPMonumental.variable} font-monumental pb-0 mb-0 leading-tight text-white`}
          >
            OPENING SOON
            <br />
            5.6.2025
          </h3>
        </div>
        {/* <Nav />
        <Container>{children}</Container>
        <Footer /> */}
      </body>
    </html>
  );
}
