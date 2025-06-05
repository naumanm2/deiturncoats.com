import Image from "next/image";

import React from "react";
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
  return (
    <div className="relative overflow-hidden aspect-[4/5] z-0 rounded-2xl mb-1 group">
      {/* Base image */}
      <Image
        className="rounded-2xl group-hover:opacity-0"
        src={src2}
        alt={alt2}
        width={1080}
        height={1350}
        style={{ objectFit: "contain" }}
        sizes="(max-width:768px) 50vw, 100vw"
        placeholder="blur"
        blurDataURL={Placeholder.src}
      />

      {/* Hover image (on top, starts hidden) */}
      <Image
        className="absolute inset-0 rounded-2xl opacity-0 z-0 group-hover:opacity-100"
        src={src1}
        alt={alt1}
        width={1080}
        height={1350}
        style={{ objectFit: "contain" }}
        sizes="(max-width:768px) 50vw, 100vw"
        placeholder="blur"
        blurDataURL={Placeholder.src}
      />
    </div>
  );
}
