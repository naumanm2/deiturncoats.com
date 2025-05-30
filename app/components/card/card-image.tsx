"use client";

import Image from "next/image";

import React, { useState } from "react";
import Placeholder from "@/public/jpg/placeholder.png";

export default function CardImage({
  src1,
  src2,
  alt1,
  alt2,
}: {
  src1: string;
  src2: string;
  alt1: string;
  alt2: string;
}) {
  const [isHovering, setIsHovering] = useState(false);
  const onMouseEnter = () => setIsHovering(true);
  const onMouseLeave = () => setIsHovering(false);
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="overflow-hidden aspect-[4/5] rounded-2xl mb-1"
    >
      {isHovering ? (
        <Image
          className="rounded-2xl"
          src={src1}
          alt={alt1}
          blurDataURL={Placeholder.src}
          width={1080}
          height={1350}
          style={{ objectFit: "fill" }}
          sizes="(max-width:768px) 50vw, 100vw"
          placeholder="blur"
          priority
          loading="eager"
        />
      ) : (
        <Image
          className="rounded-2xl"
          src={src2}
          alt={alt2}
          width={1080}
          height={1350}
          style={{ objectFit: "fill" }}
          sizes="(max-width:768px) 50vw, 100vw"
          blurDataURL={Placeholder.src}
          placeholder="blur"
          priority
          loading="eager"
        />
      )}
    </div>
  );
}
