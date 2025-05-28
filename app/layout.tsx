import { getLocale, state } from "@/utilities/l18n";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={getLocale(state.locale)}>
      <body className={`bg-background no-scrollbar antialiased`}>
        {children}
      </body>
    </html>
  );
}
