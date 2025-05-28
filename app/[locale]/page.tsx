import Hero from "@/app/components/hero";
import CardCollection from "@/app/components/cardCollection";
import Card from "@/app/components/card";
import Text from "@/app/components/text";
import Main from "./main";
import { Props } from "./layout";
import { getLocale, getPath, getTranslations, getUrl } from "@/utilities/l18n";

// // Dynamically import the correct locale JSON
// const getLocaleContent = async (locale: string): Promise<Content> => {
//   try {
//     return (await import(`@/content/${locale}.json`)) as Content;
//   } catch {
//     return (await import(`@/content/en.json`)) as Content;
//   }
// };

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

export default async function LocalePage({
  params: { locale },
}: Readonly<Props>) {
  const activeLocale = getLocale(locale);
  const content = getTranslations(locale);
  return (
    <Main locale={activeLocale} page="home">
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
            address={`/${getPath(activeLocale, "home")}/${product.id}`}
          />
        ))}
      </CardCollection>
      <Text
        heading={content.about.heading}
        paragraph={content.about.paragraph}
      />
    </Main>
  );
}

// in /app/[locale]/page.tsx
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fi" }];
}
