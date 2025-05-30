import React from "react";

import { cn } from "@/lib/utils";
import Arrow from "@/app/assets/svg/arrow.svg";
import Link from "next/link";

type ctaOptions = {
	text: string;
	ghost?: boolean;
	primary?: boolean;
	disabled?: boolean;
	url: string;
};

export default function CTA({ text, ghost, primary, disabled, url }: ctaOptions) {
	return (
		<Link
			href={url!}
			className={cn(
				"px-3 py-1.5 rounded-lg bg-white/10 w-full flex flex-row items-center justify-between text-center uppercase text-white transition-color duration-300 ease-in-out -mx-1",
				ghost &&
					"border-slate-100/40 border flex font-bold flex-row backdrop-blur-2xl hover:backdrop-blur-sm active:backdrop-blur-lg gap-2 items-center group",
				primary &&
					"bg-foreground font-bold py-2 border-[1px] hover:bg-brand-hover active:bg-brand-active",
				disabled &&
					"bg-disabled-background py-2 text-disabled-color border-[1px] border-disabled-border hover:bg-disabled pointer-events-none"
			)}
			aria-disabled={disabled}
			tabIndex={disabled ? -1 : undefined}>
			<strong> {text}</strong>
			{ghost && (
				<div className="[&>svg]:h-3 [&>svg]:fill-white">
					<Arrow />
				</div>
			)}
		</Link>
	);
}
