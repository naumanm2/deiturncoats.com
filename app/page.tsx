import en from "@/app/content/en.json";
import Hero from "@/app/components/hero";
import CardCollection from "@/app/components/cardCollection";
import Card from "@/app/components/card";
import Text from "@/app/components/text";

export default function En() {
  return (
    <>
      <Hero
        heading={en.hero.heroHeading}
        ctaText={en.hero.heroCTA}
        subtitle={en.hero.heroSubtitle}
      />
      <CardCollection title={en.products.productsTitle}>
        {en.products.items.map((product, index) => (
          <Card
            key={index}
            eyebrow={product.id}
            imagePath={product.deiInImage}
            imageAlt={product.deiInImageAlt}
            title={product.title}
            description={product.deiInDescription}
            price={product.price}
            address={`/${product.id}`}
          />
        ))}
      </CardCollection>
      <Text heading={en.about.heading} paragraph={en.about.paragraph} />
    </>
  );
}
