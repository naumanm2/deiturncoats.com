// app/[locale]/[id]/page.tsx
import { notFound } from "next/navigation";
// import { type ProductItem } from "@/app/[locale]/page"; // or move this to types.ts
import contentEn from "@/app/content/en.json";
import contentFi from "@/app/content/fi.json";
import ProductView from "./product-view";
import CardCollection from "@/app/components/cardCollection";
import Card from "@/app/components/card";
import Text from "@/app/components/text";

const contentMap = {
	en: contentEn,
	fi: contentFi,
};

export default async function ProductPage({
	params,
}: {
	params: { locale: "en" | "fi"; id: string };
}) {
	const { locale } = params;
	const content = contentMap[locale as "en" | "fi"];
	const product = content.products.items.find((p) => p.id === params.id);

	if (!product) return notFound();

	return (
		<div>
			<ProductView
				id={product.id}
        locale={locale}
				headline={product.title}
				subtitle={product.subtitle}
				price={product.price}
				deiInHeadline={product.deiInHeadline}
        deiInSubtitle={product.deiInSubtitle}
				deiOutHeadline={product.deiOutHeadline}
        deiOutSubtitle={product.deiOutSubtitle}
				descriptionDeiIn={product.deiInDescription}
				descriptionDeiOut={product.deiOutDescription}
				availableSizes={product.availableSizes}
				nonAvailableSizes={product.nonAvailableSizes}
				deiInImageSrc={product.deiInImage}
				deiInImageAlt={product.deiInImageAlt}
				deiOutImageSrc={product.deiOutImage}
				deiOutImageAlt={product.deiOutImageAlt}
				url={content.url}
			/>
			<CardCollection
				title={locale === "en" ? "Related products" : "Aiheeseen liittyvät tuotteet"}>
				{content.products.items
					.filter((p) => p.id != product.id)
					.map((product, index) => (
						<Card
							key={index}
							imagePath={product.deiInImage}
							imageAlt={product.deiInImageAlt}
							title={product.title}
							description={product.deiOutDescription}
							price={product.price}
							address={`/${locale}/${product.id}`}
						/>
					))}
			</CardCollection>
			<Text heading={content.about.heading} paragraph={content.about.paragraph} />
		</div>
	);
}

export async function generateStaticParams() {
	const locales = ["en", "fi"];
	const contentImports = await Promise.all(
		locales.map((locale) => import(`@/app/content/${locale}.json`))
	);

	return contentImports.flatMap((content, index) => {
		return content.products.items.map((product: { id: string }) => ({
			locale: locales[index],
			id: product.id,
		}));
	});
}
