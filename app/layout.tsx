import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/footer";
import Container from "./components/container";
import Nav from "./components/nav";

export const metadata: Metadata = {
  title: "DEI Turncoats",
  description: "Equality is so last season.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-background no-scrollbar antialiased`}>
        <Nav />
        <Container>{children}</Container>
        <Footer />
      </body>
    </html>
  );
}
