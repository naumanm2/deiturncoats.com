import React from "react";
import products from "@/app/content/fi.json";
import ProductView from "./productView";
import Text from "@/app/components/text";

import fi from "@/app/content/fi.json";
import CardCollection from "@/app/components/cardCollection";
import Card from "@/app/components/card";

type Props = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
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
      <CardCollection title="Muut tuotteet">
        {fi.products.items
          .filter((p) => p.id != id)
          .map((product, index) => (
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

export async function generateStaticParams() {
  return products.products.items.map((product) => ({
    id: product.id,
  }));
}
