import Link from "next/link";
import React from "react";
import CardImage from "./card-image";

type tCard = {
  image1src?: string;
  image1alt?: string;
  image2src?: string;
  image2alt?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  price: string;
  address: string;
};

export default function Card({
  image1src,
  image2src,
  image1alt,
  image2alt,
  eyebrow,
  title,
  description,
  price,
  address,
}: tCard) {
  return (
    <Link
      className="flex flex-col flex-1 group transition-all duration-300 ease-in-out h-max"
      href={address}
    >
      {image1alt && image1src && image2alt && image2src ? (
        <CardImage
          src1={image1src}
          src2={image2src}
          alt1={image1alt}
          alt2={image2alt}
        />
      ) : (
        <div className="rounded-2xl bg-[#88888A] mb-1 aspect-[4/5] w-full"></div>
      )}
      <div className="flex flex-col gap-2 mt-2">
        {eyebrow && (
          <p className="text-disabled-color capitalize py-2">{eyebrow}</p>
        )}
        {title && <h3 className=" group-hover:underline">{title}</h3>}
        {description && <p>{description}</p>}
        <strong className="">{price}</strong>
      </div>
    </Link>
  );
}
