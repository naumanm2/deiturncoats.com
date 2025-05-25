"use client";

import React, { useState } from "react";
import Pill from "@/app/components/pill";
import CTA from "@/app/components/cta";
import Link from "next/link";

type productPageOptions = {
	id: string;
	locale: "en" | "fi";
	headline: string;
	subtitle: string;
	price: string;
	descriptionDeiIn?: string;
	deiInHeadline?: string;
	deiInSubtitle?: string;
	descriptionDeiOut?: string;
	deiOutHeadline?: string;
	deiOutSubtitle?: string;
	availableSizes?: string[];
	nonAvailableSizes?: string[];
	deiInImageSrc?: string;
	deiInImageAlt?: string;
	deiOutImageSrc?: string;
	deiOutImageAlt?: string;
	url: string;
};

export default function ProductView({
	id,
	locale,
	headline,
	subtitle,
	price,
	deiInHeadline,
	deiInSubtitle,
	descriptionDeiIn,
	deiOutHeadline,
	deiOutSubtitle,
	descriptionDeiOut,
	availableSizes,
	nonAvailableSizes,
	deiInImageSrc,
	deiInImageAlt,
	deiOutImageSrc,
	deiOutImageAlt,
	url,
}: productPageOptions) {
	const [deiIn, setDeiStatus] = useState(true);
	const [activePill, setActivePill] = useState(-1);

	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const images = [
		{ src: deiInImageSrc, alt: deiInImageAlt },
		{ src: deiOutImageSrc, alt: deiOutImageAlt },
	];

	const handlePrev = () => {
		setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
		setDeiStatus(!deiIn);
	};

	const handleNext = () => {
		setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
		setDeiStatus(!deiIn);
	};

	const handleClick = (index: number) => {
		if (index != activePill) {
			setActivePill(index);
		} else {
			setActivePill(-1);
		}
	};
	const icap =
		headline.charAt(0).toUpperCase() + String(headline).slice(1).replaceAll("-", " ");
	return (
		<div className="flex flex-col gap-4 md:gap-8 md:flex-row md:items-center">
			{deiInImageSrc ? (
				<div className="flex-1 relative">
					{images[currentImageIndex]?.src ? (
						<img
							className="aspect-[8/9] w-full rounded-2xl object-cover"
							src={images[currentImageIndex].src!}
							alt={images[currentImageIndex].alt || ""}
						/>
					) : (
						<div className="aspect-[8/9] w-full rounded-2xl bg-zinc-300" />
					)}

					{/* Arrows */}
					<div className="absolute bottom-1/2 translate-y-1/2 gap-2 p-2 w-full flex flex-row justify-between">
						<button
							onClick={handlePrev}
							className=" bg-white/80 rounded-full hover:bg-white/90 backdrop-blur-xl md:p-4 md:px-5 p-3 px-4 flex items-center justify-center shadow-md"
							aria-label="Previous image">
							◀
						</button>
						<button
							onClick={handleNext}
							className=" bg-white/80 rounded-full hover:bg-white/90 backdrop-blur-xl md:p-4 md:px-5 p-3 px-4 flex items-center justify-center shadow-md"
							aria-label="Next image">
							▶
						</button>
					</div>
				</div>
			) : (
				<div className="flex-1 aspect-[8/9] w-full rounded-2xl bg-zinc-300"></div>
			)}
			<div className="flex-1 flex flex-col gap-4">
				<div className="flex flex-row items-center gap-2">
					<Link href={`/${locale}`} className="hover:underline">
						<small className="opacity-70 uppercase">Home</small>
					</Link>
					<small className="opacity-70 uppercase pt-1">/</small>
					<small className="opacity-70 uppercase pt-1">{`${icap}`}</small>
				</div>
				<div className="flex flex-col gap-2">
					<h3>{headline}</h3>
					<small className="uppercase text-stone-700">{subtitle}</small>
				</div>
				<h4 className="font-bold">{price}</h4>
				<div className="flex flex-col gap-1">
					<div className="flex flex-row items-center gap-2">
						<small className="uppercase text-stone-700 px-2 py-1 rounded-full border border-stontext-stone-700 w-max -ml-1">
							{deiIn ? deiInHeadline : deiOutHeadline}
						</small>
						<strong>{deiIn ? deiInSubtitle : deiOutSubtitle}</strong>
					</div>
					<p className="mt-2">{deiIn ? descriptionDeiIn : descriptionDeiOut}</p>
				</div>
				{availableSizes && (
					<div className="flex flex-col gap-6">
						<div>
							<>
								<small className="text-stone-700">Choose size:</small>
								<div className="flex flex-row flex-wrap -mx-2 gap-2 pt-2">
									{availableSizes!.map((size, index) => (
										<Pill
											text={size}
											key={index}
											selected={activePill === index}
											handleClick={() => handleClick(index)}
										/>
									))}
									{nonAvailableSizes!.map((size, index) => (
										<Pill text={size} key={index} disabled={true} />
									))}
								</div>
							</>
						</div>
						<CTA
							primary
							text={activePill < 0 ? "Choose size" : "Buy now"}
							disabled={activePill < 0}
							url={url}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
