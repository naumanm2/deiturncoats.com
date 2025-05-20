import type { Metadata } from "next";
import "./globals.css";
import LogoVert from "@/app/assets/svg/logo-round.svg";

export const metadata: Metadata = {
  title: "DEI Turncoats",
  description: "Get ready to turn your world inside out.",
};

export default function RootLayout({
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-background no-scrollbar antialiased`}>
        <div className="h-dvh w-full flex justify-center flex-col gap-0 items-center text-center bg-[#161616] text-amber-50">
          <LogoVert className="h-64 md:h-96 text-amber-50 pb-24" />
          <h3 className="pb-0 mb-0 leading-tight text-">
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
