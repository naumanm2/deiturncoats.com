import React from "react";

type cardOptions = {
  imagePath: string;
  imageAlt: string;
  eyebrow?: string;
  title: string;
  description: string;
  price: string;
};

export default function Card({
  imagePath,
  imageAlt,
  eyebrow,
  title,
  description,
  price,
}: cardOptions) {
  return (
    <div className="flex flex-col flex-1">
      <img className="rounded-2xl" src={imagePath} alt={imageAlt} width={1080} height={1920} />
      {eyebrow && <p className="text-disabled-color"></p>}
      <h3>{title}</h3>
      <p>{description}</p>
      <strong>{price}</strong>
    </div>
  );
}
