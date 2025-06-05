import Hero from "@/app/components/hero";
import CardCollection from "@/app/components/cardCollection";
import Card from "@/app/components/card/card";
import Text from "@/app/components/text";
import { Content, ProductItem } from "../util/types";

// Dynamically import the correct locale JSON
const getLocaleContent = async (locale: string): Promise<Content> => {
  try {
    return (await import(`@/app/content/${locale}.json`)) as Content;
  } catch {
    return (await import(`@/app/content/en.json`)) as Content;
  }
};

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: "fi" | "en" }>;
}) {
  const { locale } = await params;
  const content = await getLocaleContent(locale);

  return (
    <>
      <Hero
        locale={locale}
        heading={content.hero.heroHeading}
        subtitle={content.hero.heroSubtitle}
        images={content.hero.images}
      />
      <CardCollection title={content.products.productsTitle}>
        {(content.products.items as ProductItem[]).map((product, index) => (
          <Card
            key={index}
            image1src={product.deiOutImage1}
            image2src={product.deiOutImage2}
            image1alt={product.deiOutImageAlt}
            image2alt={product.deiOutImageAlt}
            title={product.cardTitle}
            description={product.cardDescription}
            price={product.price}
            address={`/${locale}/${product.id}`}
          />
        ))}
      </CardCollection>
      <Text
        heading={content.about.heading}
        paragraph={content.about.paragraph}
        ctaText={content.about.ctaText}
        ctaUrl={content.about.ctaUrl}
      />
    </>
  );
}

// in /app/[locale]/page.tsx
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fi" }];
}
