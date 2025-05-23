import React from "react";
import CTA from "./cta";

type heroOptions = {
  heading: string;
  ctaText?: string;
  ctaLink?: string;
};

export default function Hero({ heading, ctaText }: heroOptions) {
  return (
    <>
      <div className="relative w-full aspect-[9/16] md:aspect-[2/1]">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/png/hero1.png')] rounded-2xl bg-cover bg-center" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-20 rounded-2xl" />

        {/* Content */}
        <div className="relative z-10 flex uppercase flex-col items-center justify-center text-white h-full">
          <h1 className="tracking-tighter">{heading}</h1>
          {ctaText && <CTA ghost={true} text={ctaText} />}
        </div>
      </div>
    </>
  );
}
