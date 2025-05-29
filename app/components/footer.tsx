import React from "react";
import Nav from "./nav";

export default function Footer({ locale }: { locale: "en" | "fi" }) {
	console.log(locale);
	return (
		<footer className="pb-48 z-00">
			<Nav locale={locale} footer />
		</footer>
	);
}
