import Link from "next/link";
import React from "react";
import CardImage from "./card-image";
import Image from "next/image";
import Placeholder from "@/public/jpg/placeholder.png";
import Arrow from "@/app/assets/svg/arrow.svg";

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
      className="flex flex-col group transition-all duration-300 ease-in-out h-min"
      href={address}
    >
      {image1alt && image1src && image2alt && image2src && (
        <CardImage
          src1={image1src}
          src2={image2src}
          alt1={image1alt}
          alt2={image2alt}
        />
      )}
      {image1src && !image2src && (
        <div className="relative overflow-hidden aspect-[4/5] z-0 rounded-2xl mb-1 group">
          <Image
            className="rounded-2xl"
            src={image1src}
            alt={"image1alt"}
            width={1080}
            height={1350}
            style={{ objectFit: "contain" }}
            sizes="(max-width:768px) 50vw, 100vw"
            placeholder="blur"
            blurDataURL={Placeholder.src}
          />
        </div>
      )}

      <div className="flex flex-col flex-1 gap-2 mt-2 h-full">
        {eyebrow && (
          <p className="text-disabled-color capitalize py-2">{eyebrow}</p>
        )}
        {title && <h3 className=" group-hover:underline">{title}</h3>}
        {description && (
          <div className="flex-1">
            <p className="flex-1">{description}</p>
          </div>
        )}
        <div className="flex flex-row [&>*]:fill-black items-center gap-2">
          <strong className="">{price}</strong>
          <Arrow width="20px" />
        </div>
      </div>
    </Link>
  );
}
