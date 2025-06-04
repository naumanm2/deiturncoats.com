// app/[locale]/[id]/page.tsx
import { notFound } from "next/navigation";
// import { type ProductItem } from "@/app/[locale]/page"; // or move this to types.ts
import contentEn from "@/app/content/en.json";
import contentFi from "@/app/content/fi.json";
import ProductView from "./product-view";
import CardCollection from "@/app/components/cardCollection";
import Card from "@/app/components/card/card";
import Text from "@/app/components/text";
import ProductViewTwo from "./product-view-2";

const contentMap = {
  en: contentEn,
  fi: contentFi,
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: "en" | "fi"; id: string }>;
}) {
  const { locale, id } = await params;
  const content = contentMap[locale as "en" | "fi"];
  const product = content.products.items.find((p) => p.id === id);

  if (!product) return notFound();

  return (
    <div>
      <ProductViewTwo
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
        deiInImage1Src={product.deiInImage1}
        deiInImage2Src={product.deiInImage2}
        deiInImageAlt={product.deiInImageAlt}
        deiOutImage1Src={product.deiOutImage1}
        deiOutImage2Src={product.deiOutImage2}
        deiOutImageAlt={product.deiOutImageAlt}
        url={content.url}
      />
      <CardCollection
        title={
          locale === "en" ? "Related products" : "Aiheeseen liittyvät tuotteet"
        }
      >
        {content.products.items
          .filter((p) => p.id != product.id)
          .map((product) => (
            <Card
              key={product.id}
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
