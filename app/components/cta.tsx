import React from "react";

import { cn } from "@/lib/utils";
import Arrow from "@/app/assets/svg/arrow.svg";

type ctaOptions = {
  text: string;
  ghost?: boolean;
  primary?: boolean;
};

export default function CTA({ text, ghost, primary }: ctaOptions) {
  return (
    <button
      className={cn(
        "px-3 py-1.5 rounded-full uppercase text-white",
        ghost && "border-white border-[1px] flex flex-row gap-2 items-center",
        primary && "bg-brand font-bold"
      )}
    >
      {text}
      {ghost && (
        <div className="[&>svg]:h-3 [&>svg]:fill-white">
          <Arrow />
        </div>
      )}
    </button>
  );
}
