import Image from "next/image";

import en from "@/app/content/en.json";
import Hero from "./components/hero";
import CardCollection from "./components/cardCollection";
import Card from "./components/card";

export default function Home() {
  return (
    <>
      <Hero heading={en.hero.heroHeading} ctaText={en.hero.heroCTA} />
      <CardCollection title={en.products.productsTitle}>
        {en.products.products.map((product, index) => (
          <Card
            key={index}
            imagePath={product.deiInImage}
            imageAlt={product.deiInImageAlt}
            title={product.title}
            description={product.DeiInDescription}
            price={product.price}
          />
        ))}
      </CardCollection>
    </>
  );
}
