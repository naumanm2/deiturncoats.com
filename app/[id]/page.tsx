import React from "react";
import products from "@/app/content/en.json";
import ProductView from "./productView";
import Text from "../components/text";

import en from "@/app/content/en.json";
import CardCollection from "../components/cardCollection";
import Card from "../components/card";

type Props = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: Props) {
  const { id } = params;
  const product = products.products.items.find((p) => p.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <>
      <ProductView
        id={product.id}
        headline={product.title}
        price={product.price}
        descriptionDeiIn={product.DeiInDescription}
        descriptionDeiOut={product.DeiOutDescription}
        availableSizes={product.availableSizes}
        nonAvailableSizes={product.nonAvailableSizes}
        deiInImageSrc={product.deiInImage}
        deiInImageAlt={product.deiInImageAlt}
        deiOutImageSrc={product.deiOutImage}
        deiOutImageAlt={product.deiOutImageAlt}
      />
      <CardCollection title="Related products">
        {en.products.items
          .filter((p) => p.id != id)
          .map((product, index) => (
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

export async function generateStaticParams() {
  return products.products.items.map((product) => ({
    id: product.id,
  }));
}
