import React from "react";
import Hero from "@/app/components/hero";
import Text from "@/app/components/text";
import { Content } from "@/app/util/types";

const getLocaleContent = async (locale: string): Promise<Content> => {
	try {
		return (await import(`@/app/content/${locale}.json`)) as Content;
	} catch {
		return (await import(`@/app/content/en.json`)) as Content;
	}
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const content = await getLocaleContent(locale);
	return (
		<>
			<Hero
				heading={content.aboutPage.heading}
				subtitle={content.aboutPage.subtitle}
				images={[]}
			/>
			<Text
				heading={content.aboutPage.headline}
				paragraph={content.aboutPage.paragraph}
				ctaText={content.aboutPage.ctaText}
				ctaUrl={content.aboutPage.ctaUrl}
			/>
		</>
	);
}

export function generateStaticParams() {
	return [{ locale: "en" }, { locale: "fi" }];
}
