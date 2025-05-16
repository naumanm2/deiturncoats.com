import React from "react";

export default function Text({
  heading,
  paragraph,
}: {
  heading: string;
  paragraph: string;
}) {
  return (
    <div className="py-16 md:py-24 flex flex-col md:flex-row gap-8">
      <h2 className="flex-1">{heading}</h2>
      <p className="md:pt-6 flex-1">{paragraph}</p>
    </div>
  );
}
