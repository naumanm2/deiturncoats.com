
import en from "@/app/content/en.json";
import Hero from "./components/hero";
import CardCollection from "./components/cardCollection";
import Card from "./components/card";
import Text from "./components/text";

export default function Home() {
  return (
    <>
      <Hero heading={en.hero.heroHeading}/>
      <CardCollection title={en.products.productsTitle}>
        {en.products.items.map((product, index) => (
          <Card
            key={index}
            imagePath={product.deiInImage}
            imageAlt={product.deiInImageAlt}
            title={product.title}
            description={product.DeiInDescription}
            price={product.price}
            address={`/${product.id}`}
          />
        ))}
      </CardCollection>
      <Text heading={en.about.heading} paragraph={en.about.paragraph} />
    </>
  );
}
