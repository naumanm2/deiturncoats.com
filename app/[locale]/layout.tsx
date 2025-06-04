// app/[locale]/layout.tsx
import type { Metadata } from "next";
import "../globals.css";
import Footer from "../components/footer/footer";
import Container from "../components/container";
import Nav from "../components/nav/nav";

export const metadata: Metadata = {
	title: "DEI Turncoats",
	description: "Equality is so last season.",
};

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: "en" | "fi" }>;
}) {
	const { locale } = await params;
	return (
		<html lang={locale}>
			<body className={`bg-background no-scrollbar antialiased`}>
				<Nav locale={locale} />
				<Container>{children}</Container>
				<Footer locale={locale} />
			</body>
		</html>
	);
}
