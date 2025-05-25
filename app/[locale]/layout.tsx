// app/[locale]/layout.tsx
import type { Metadata } from "next";
import "../globals.css";
import Footer from "../components/footer";
import Container from "../components/container";
import Nav from "../components/nav";

export const metadata: Metadata = {
	title: "DEI Turncoats",
	description: "Equality is so last season.",
};

export default function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { locale: "en" | "fi" };
}) {
	return (
		<html lang={params.locale}>
			<body className={`bg-background no-scrollbar antialiased`}>
				<Nav locale={params.locale} />
				<Container>{children}</Container>
				<Footer locale={params.locale} />
			</body>
		</html>
	);
}
