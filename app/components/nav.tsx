"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/app/assets/svg/logo-horizontal.svg";
import GlobeIcon from "@/app/assets/svg/globe.svg";
import ShoppingBasketIcon from "@/app/assets/svg/shopping-basket.svg";

import CTA from "./cta";
import { cn } from "@/lib/utils";

const PRODUCT_SLUGS = ["disney", "amazon", "google"];

interface tMenu {
	open: boolean;
	setOpen: (open: boolean) => void;
	locale: "fi" | "en";
}

const Menu = ({ open, setOpen, locale }: tMenu) => {
	return (
		<>
			{open && (
				<div className="w-full flex-1 h-dvh fixed top-0 z-20 p-2 bg-background">
					<div className="flex flex-col h-full justify-end items-start gap-2 pb-32">
						<Link
							href={`/${locale}`}
							onClick={() => setOpen(!open)}
							className="font-medium text-4xl underline p-2 hover:underline">
							Home
						</Link>
						<Link
							href={locale == "fi" ? `/${locale}/about` : `/${locale}/about`}
							onClick={() => setOpen(!open)}
							className="font-medium text-4xl underline p-2 hover:underline">
							About
						</Link>
					</div>
				</div>
			)}
		</>
	);
};

type NavProps = {
	footer?: boolean;
	locale: "en" | "fi";
};

const LanguageSwitcher = ({
	locale,
	pathname,
	onClose,
}: {
	locale: "en" | "fi";
	pathname: string;
	onClose: () => void;
}) => {
	const otherLocale = locale === "en" ? "fi" : "en";

	const localizedPath = pathname.replace(`/${locale}`, "") || "/";
	const newPath = `/${otherLocale}${localizedPath}`;

	return (
		<div className="h-min overflow-visible">
			<div className="flex flex-col bg-white rounded-2xl shadow-md border border-[#00000005] font-normal">
				<Link
					href={`/${locale}${localizedPath}`}
					onClick={onClose}
					className={cn(
						"hover:bg-[#00000010] w-full p-4 pr-16 text-sm border-b-2 border-[#00000008] rounded-t-2xl",
						"font-bold"
					)}>
					{locale.toUpperCase()}
				</Link>
				<Link
					href={newPath}
					onClick={onClose}
					className="hover:bg-[#00000010] w-full p-4 pr-16 text-sm rounded-b-2xl">
					{otherLocale.toUpperCase()}
				</Link>
			</div>
		</div>
	);
};

const ShoppingBasket = ({
	locale,
	onClose,
}: {
	locale: "en" | "fi";
	onClose: () => void;
}) => {
	const randomSlug = PRODUCT_SLUGS[Math.floor(Math.random() * PRODUCT_SLUGS.length)];
	const isFinnish = locale === "fi";

	return (
		<div className="h-min w-0 overflow-visible flex flex-col items-end" onClick={onClose}>
			<div className="max-w-sm w-[94vw] flex flex-col gap-8 p-8 bg-white rounded-2xl border border-[#00000005] font-bold shadow-md">
				<p>
					{isFinnish ? "Ostoskorisi on tyhjä" : "Your shopping basket seems to be empty."}
				</p>
				<div className="w-full">
					<CTA
						text={isFinnish ? "Ostoksille" : "Get to Shopping"}
						primary
						url={`/${locale}/${randomSlug}`}
					/>
				</div>
			</div>
		</div>
	);
};

export default function Nav({ footer, locale }: NavProps) {
	const pathname = usePathname();
	const [langOpen, setLangOpen] = useState(false);
	const [basketOpen, setBasketOpen] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleLang = () => {
		setBasketOpen(false);
		setLangOpen((open) => !open);
	};

	const toggleBasket = () => {
		setLangOpen(false);
		setBasketOpen((open) => !open);
	};

	return (
		<nav className="flex flex-col">
			<div
				className={cn(
					"flex flex-row justify-between items-start max-w-screen-[1720px] h-16 md:h-24 p-4 md:p-8 w-full z-0 top-0",
					footer ? "z-0" : "z-30"
				)}>
				<div className="flex-1">
					<Link
						href={`/${locale}`}
						className="[&>svg]:md:h-12 [&>svg]:h-8 h-min [&>svg]:w-auto">
						<Logo />
					</Link>
				</div>
				<div className="flex flex-1 justify-end gap-2">
					<div className="flex flex-col flex-1 max-md:hidden">
						<div className="inline-block">
							<Link className="p-2 -m-2" href={`/${locale}`}>
								Home
							</Link>
						</div>
						<div className="inline-block">
							<Link className="p-2 -m-2" href={`/${locale}/about`}>
								{locale == "en" ? "About" : "Meistä"}
							</Link>
						</div>
					</div>
					<div className="flex items-center">
						{/* Language Toggle */}
						<div className={cn("relative flex flex-col", footer && "flex-col-reverse")}>
							<button
								className="p-3 md:p-4 [&>svg]:h-16 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center hover:bg-[#00000010] rounded-lg"
								onClick={toggleLang}
								aria-label="Toggle language">
								<GlobeIcon />
							</button>
							{langOpen && (
								<div className="absolute top-full mt-2 right-0 z-30">
									<LanguageSwitcher
										locale={locale}
										pathname={pathname}
										onClose={() => setLangOpen(false)}
									/>
								</div>
							)}
						</div>

						{/* Basket Toggle */}
						<div
							className={cn(
								"relative flex flex-col items-end",
								footer && "flex-col-reverse"
							)}>
							<button
								className="p-3 md:p-4 [&>svg]:h-16 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center hover:bg-[#00000010] rounded-lg"
								onClick={toggleBasket}
								aria-label="Toggle shopping basket">
								<ShoppingBasketIcon />
							</button>
							{basketOpen && (
								<div className="absolute top-full mt-2 right-0 z-30">
									<ShoppingBasket locale={locale} onClose={() => setBasketOpen(false)} />
								</div>
							)}
						</div>
						{/* Menu */}
						{!footer && (
							<div className="">
								<button
									className="p-4 [&>svg]:h-5 md:hidden"
									onClick={() => setMenuOpen(!menuOpen)}>
									{!menuOpen ? (
										<>
											<div className="h-0.5 w-8 rounded-[0.4px] mb-1 bg-foreground"></div>
											<div className="h-0.5 w-8 rounded-[0.4px] mb-1 bg-foreground"></div>
										</>
									) : (
										<>
											<div className="h-0.5 w-8 rounded-[0.4px] -mb-0.5 bg-foreground origin-center rotate-[20deg]"></div>
											<div className="h-0.5 w-8 rounded-[0.4px] bg-foreground origin-center -rotate-[20deg]"></div>
										</>
									)}
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
			{menuOpen && !footer && (
				<Menu setOpen={setMenuOpen} open={menuOpen} locale={locale} />
			)}
		</nav>
	);
}
