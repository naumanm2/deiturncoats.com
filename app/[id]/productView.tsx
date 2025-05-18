"use client";

import React, { useState } from "react";
import Pill from "@/app/components/pill";
import CTA from "@/app/components/cta";
import Link from "next/link";

type productPageOptions = {
  id: string;
  headline: string;
  price: string;
  descriptionDeiIn: string;
  descriptionDeiOut: string;
  availableSizes: string[];
  nonAvailableSizes: string[];
  deiInImageSrc: string;
  deiInImageAlt: string;
  deiOutImageSrc: string;
  deiOutImageAlt: string;
};

export default function ProductView({
  id,
  headline,
  price,
  descriptionDeiIn,
  descriptionDeiOut,
  availableSizes,
  nonAvailableSizes,
  deiInImageSrc,
  deiInImageAlt,
  deiOutImageSrc,
  deiOutImageAlt,
}: productPageOptions) {
  const [deiIn, setDeiStatus] = useState(false);
  const [activePill, setActivePill] = useState(-1);

  const handleClick = (index: number) => {
    if (index != activePill) {
      setActivePill(index);
    } else {
      setActivePill(-1);
    }
  };
  return (
    <div className="flex flex-col gap-4 md:gap-8 md:flex-row md:items-center">
      <div className="flex-1">
        <img
          className="aspect-[8/9] w-full rounded-2xl"
          src={deiIn ? deiInImageSrc : deiOutImageSrc}
          alt={deiIn ? deiInImageAlt : deiOutImageAlt}
          onClick={() => setDeiStatus(!deiIn)}
        ></img>
      </div>
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex flex-row items-center gap-2">
          <Link href="/" className="hover:underline">
            <small className="opacity-70 uppercase">Home</small>
          </Link>
          <small className="opacity-70 uppercase pt-1">/</small>
          <small className="opacity-70 uppercase pt-1">{`Product ${id}`}</small>
        </div>
        <h3>{headline}</h3>
        <h4 className="font-normal">{price}</h4>
        <p>{deiIn ? descriptionDeiIn : descriptionDeiOut}</p>
        <div className="flex flex-col gap-6">
          <div>
            <small className="opacity-70">Choose your size</small>
            <div className="flex flex-row flex-wrap -mx-2 gap-2 pt-2">
              {availableSizes.map((size, index) => (
                <Pill
                  text={size}
                  key={index}
                  selected={activePill === index}
                  handleClick={() => handleClick(index)}
                />
              ))}
              {nonAvailableSizes.map((size, index) => (
                <Pill text={size} key={index} disabled={true} />
              ))}
            </div>
          </div>
          <CTA
            primary
            text={activePill < 0 ? "Choose size" : "Buy now"}
            disabled={activePill < 0}
          />
        </div>
      </div>
    </div>
  );
}
