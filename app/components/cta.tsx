import React from "react";

import { cn } from "@/lib/utils";
import Arrow from "@/app/assets/svg/arrow.svg";
import Link from "next/link";

type ctaOptions = {
  text: string;
  ghost?: boolean;
  primary?: boolean;
  disabled?: boolean;
  url?: string;
};

export default function CTA({
  text,
  ghost,
  primary,
  disabled,
  url,
}: ctaOptions) {
  return (
    <Link
      href={url!}
      className={cn(
        "px-3 py-1.5 rounded-full uppercase text-white -mx-0.5",
        ghost &&
          "border-white border-[1px] flex flex-row gap-2 items-center hover:bg-white hover:text-black group transition-all duration-300 ease-in-out",
        primary &&
          "bg-brand font-bold py-2 border-[1px] border-brand-border hover:bg-brand-hover active:bg-brand-active",
        disabled &&
          "bg-disabled-background py-2 text-disabled-color hover:bg-disabled-background border-[1px] border-disabled-border font-medium"
      )}
    >
      {text}
      {ghost && (
        <div className="[&>svg]:h-3 [&>svg]:fill-white group-hover:[&>svg]:fill-black">
          <Arrow />
        </div>
      )}
    </Link>
  );
}
