import Hero from "@/app/components/hero";
import CardCollection from "@/app/components/cardCollection";
import Card from "@/app/components/card";
import Text from "@/app/components/text";

// Dynamically import the correct locale JSON
const getLocaleContent = async (locale: string): Promise<Content> => {
	try {
		return (await import(`@/app/content/${locale}.json`)) as Content;
	} catch {
		return (await import(`@/app/content/en.json`)) as Content;
	}
};

type ProductItem = {
	id: string;
	title: string;
	price: string;
	deiOutImage: string;
	deiOutImageAlt: string;
	deiOutDescription: string;
};

type Content = {
	site: { title: string; description: string };
	url: string;
	hero: { heroHeading: string; heroSubtitle: string; heroCTA: string };
	about: { heading: string; paragraph: string };
	products: {
		productsTitle: string;
		items: ProductItem[];
	};
};

export default async function LocalePage({ params }: { params: { locale: string } }) {
	const { locale } = params;
	const content = await getLocaleContent(locale);

	return (
		<>
			<Hero
				heading={content.hero.heroHeading}
				ctaText={content.hero.heroCTA}
				subtitle={content.hero.heroSubtitle}
				ctaLink={content.url}
			/>
			<CardCollection title={content.products.productsTitle}>
				{(content.products.items as ProductItem[]).map((product) => (
					<Card
						key={product.id}
						imagePath={product.deiOutImage}
						imageAlt={product.deiOutImageAlt}
						title={product.title}
						description={product.deiOutDescription}
						price={product.price}
						address={`/${locale}/${product.id}`}
					/>
				))}
			</CardCollection>
			<Text heading={content.about.heading} paragraph={content.about.paragraph} />
		</>
	);
}

// in /app/[locale]/page.tsx
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fi" }];
}