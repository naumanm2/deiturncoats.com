import Link from "next/link";
import React from "react";

type cardOptions = {
  imagePath?: string;
  imageAlt?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  price: string;
  address: string;
};

export default function Card({
  imagePath,
  imageAlt,
  eyebrow,
  title,
  description,
  price,
  address,
}: cardOptions) {
  return (
    <Link className="flex flex-col flex-1 group" href={address}>
      {!imagePath ? (
        <div className="rounded-2xl bg-zinc-300 mb-1 h-full w-full"></div>
      ) : (
        <div className="overflow-hidden rounded-2xl mb-1">
          <img
            className="rounded-2xl group-hover:scale-110 ease-in-out transition-all duration-300"
            src={imagePath}
            alt={imageAlt}
            width={1080}
            height={1920}
          />
        </div>
      )}

      {eyebrow && <p className="text-disabled-color capitalize py-2">{eyebrow}</p>}
      <h3 className="pb-2 group-hover:opacity-80 ease-in-out transition-all duration-300">
        {title}
      </h3>
      <p>{description}</p>
      <strong className="pt-2">{price}</strong>
    </Link>
  );
}
