import React from "react";

const getLocaleContent = async (locale: string): Promise<Content> => {
	try {
		return (await import(`@/app/content/${locale}.json`)) as Content;
	} catch {
		return (await import(`@/app/content/en.json`)) as Content;
	}
};

type Content = {
	site: { title: string; description: string };
	url: string;
	hero: { heroHeading: string; heroSubtitle: string; heroCTA: string };
	about: { heading: string; paragraph: string };
};

export default async function LocalePage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	<></>;
}
