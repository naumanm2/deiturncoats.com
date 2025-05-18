import { cn } from "@/lib/utils";
import React from "react";

type pillOptions = {
  text: string;
  selected?: boolean;
  disabled?: boolean;
  handleClick?: React.MouseEventHandler;
};

export default function Pill({
  text,
  selected,
  disabled,
  handleClick,
}: pillOptions) {
  return (
    <button
      onClick={handleClick}
      className={cn(
        "rounded-full px-4 py-1 pb-1.5 uppercase cursor-pointer",
        selected
          ? "bg-selected-background text-selected-color border-[1px] border-selected-border hover:opacity-90"
          : "bg-unselected-background text-unselected-color border-[1px] border-unselected-border hover:bg-unselected-background-hover",
        disabled &&
          "bg-disabled-background text-disabled-color border-[1px] border-disabled-border cursor-auto"
      )}
    >
      <small>{text}</small>
    </button>
  );
}
