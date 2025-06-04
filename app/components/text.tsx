import React from "react";
import CTA from "./cta";
import { formatter } from "../util/formatter";

export default function Text({
  heading,
  paragraph,
  signature,
  ctaText,
  ctaUrl,
}: {
  heading?: string;
  paragraph: string;
  signature?: string;
  ctaText?: string;
  ctaUrl?: string;
}) {
  return (
    <div className="py-16 md:py-24 flex flex-col md:flex-row md:gap-8 gap-4">
      <h2 className="flex-1">{heading}</h2>
      <div className="flex-1 flex flex-col gap-4">
        {formatter(paragraph)}
        {ctaText && ctaUrl && <CTA text={ctaText} primary url={ctaUrl} />}
        {signature && <div className="mt-4">{formatter(signature)}</div>}
      </div>
    </div>
  );
}
