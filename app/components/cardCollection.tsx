import React from "react";

export default function CardCollection({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="py-16 md:py-24">
      <h2 className="pb-6">{title}</h2>
      <div className="flex flex-col md:flex-row gap-8 md:gap-4">{children}</div>
    </div>
  );
}
