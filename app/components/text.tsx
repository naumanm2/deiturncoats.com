import React from "react";
import CTA from "./cta";

export default function Text({
	heading,
	paragraph,
	ctaText,
	ctaUrl,
}: {
	heading: string;
	paragraph: string | string[];
	ctaText: string;
	ctaUrl: string;
}) {
	return (
		<div className="py-16 md:py-24 flex flex-col md:flex-row gap-8">
			<h2 className="flex-1">{heading}</h2>
			<div className="flex-1">
				<p className="md:pt-6 pb-4 flex-1">{paragraph}</p>
				<CTA text={ctaText} primary url={ctaUrl} />
			</div>
		</div>
	);
}
