
import fi from "@/app/content/fi.json";
import Hero from "@/app/components/hero";
import CardCollection from "@/app/components/cardCollection";
import Card from "@/app/components/card";
import Text from "@/app/components/text";

export default function Fi() {
  return (
    <>
      <Hero heading={fi.hero.heroHeading} ctaText={fi.hero.heroCTA} />
      <CardCollection title={fi.products.productsTitle}>
        {fi.products.items.map((product, index) => (
          <Card
            key={index}
            imagePath={product.deiInImage}
            imageAlt={product.deiInImageAlt}
            title={product.title}
            description={product.DeiInDescription}
            price={product.price}
            address={`/fi/${product.id}`}
          />
        ))}
      </CardCollection>
      <Text heading={fi.about.heading} paragraph={fi.about.paragraph} />
    </>
  );
}
