import React from "react";
import products from "@/app/content/en.json";
import ProductView from "./productView";
import Text from "@/app/components/text";

import en from "@/app/content/en.json";
import CardCollection from "@/app/components/cardCollection";
import Card from "@/app/components/card";


export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
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
        subtitle={product.subtitle}
        price={product.price}
        deiInHeadline={product.deiInHeadline}
        deiOutHeadline={product.deiOutHeadline}
        descriptionDeiIn={product.deiInDescription}
        descriptionDeiOut={product.deiOutDescription}
        availableSizes={product.availableSizes}
        nonAvailableSizes={product.nonAvailableSizes}
        deiInImageSrc={product.deiInImage}
        deiInImageAlt={product.deiInImageAlt}
        deiOutImageSrc={product.deiOutImage}
        deiOutImageAlt={product.deiOutImageAlt}
      />
      <CardCollection title="Muut tuotteet">
        {en.products.items
          .filter((p) => p.id != id)
          .map((product, index) => (
            <Card
              key={index}
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

export async function generateStaticParams() {
  return products.products.items.map((product) => ({
    id: product.id,
  }));
}
