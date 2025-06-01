"use client";

import React, { useEffect, useRef, useState } from "react";
import CTA from "./cta";
import Image from "next/image";
import { cn } from "@/lib/utils";

type heroOptions = {
	heading: string;
	subtitle: string;
	images: string[];
	ctaText?: string;
	ctaLink?: string;
	time?: number;
};

export default function Hero({
	heading,
	subtitle,
	images,
	ctaText,
	ctaLink,
	time = 5000,
}: heroOptions) {
	const [status, setStatus] = useState(0);
	const length = images.length;

	const touchStartX = useRef<number | null>(null);
	const touchEndX = useRef<number | null>(null);

	// Auto-play interval
	useEffect(() => {
		const intervalId = setInterval(() => {
			setStatus((prev) => (prev + 1) % length);
		}, time);
		return () => clearInterval(intervalId);
	}, [length, time]);

	const handleTouchStart = (e: React.TouchEvent) => {
		touchStartX.current = e.changedTouches[0].screenX;
	};

	const handleTouchEnd = (e: React.TouchEvent) => {
		touchEndX.current = e.changedTouches[0].screenX;
		if (touchStartX.current !== null && touchEndX.current !== null) {
			const delta = touchStartX.current - touchEndX.current;
			if (delta > 50) setStatus((prev) => (prev + 1) % length); // swipe left
			else if (delta < -50) setStatus((prev) => (prev - 1 + length) % length); // swipe right
		}
	};
	return (
		<>
			<div
				className="relative w-full aspect-[9/16] md:aspect-[2/1] "
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}>
				{/* Background image */}
				<div
					className={`absolute inset-0 rounded-2xl overflow-hidden`}>
					{images.map((image, index) => (
						<Image
							key={index}
							src={image}
							alt={"lorem"}
							width={1080}
							height={1920}
							priority
							style={{ objectFit: "cover" }}
							className={cn(
								"absolute top-0 left-0 transition-opacity duration-200 ease-in-out",
								index === status ? "opacity-100" : "delay-200 opacity-0"
							)}
							sizes="90vw"
						/>
					))}
					{/* <Image
						src={images[status]}
						alt={"lorem"}
						width={1920}
						height={1080}
						priority
						style={{ objectFit: "fill", objectPosition: "center" }}
						className="absolute top-0 left-0"
					/> */}
				</div>

				{/* Overlay */}
				<div className="absolute inset-0 bg-black opacity-20 rounded-2xl" />

				{/* Dots */}
				<div className="absolute bottom-0 z-20 -translate-y-full left-1/2 -translate-x-1/2 ">
					<div className="mt-6 flex justify-center gap-2 cursor-pointer">
						{images.map((_, index) => (
							<button
								key={index}
								onClick={() => setStatus(index)}
								className={`relative h-2 overflow-hidden rounded-full cursor-pointer transition-all duration-500 ${
									index === status ? "bg-background w-16" : "bg-background w-3"
								}`}
								aria-label={`Go to slide ${index + 1}`}>
								{index === status && (
									<div
										className="bg-foreground absolute top-0 left-0 h-full"
										style={{
											animation: `animate-fill-bar ${time}ms ease-in-out forwards`,
										}}
									/>
								)}
							</button>
						))}
					</div>
				</div>
				{/* Keyframes for fill animation */}
				<style jsx>{`
					@keyframes animate-fill-bar {
						0% {
							width: 0%;
						}
						100% {
							width: 100%;
						}
					}
				`}</style>

				{/* Content */}
				<div className="relative z-10 w-max max-w-full text-center m-auto px-4 md:px-12 flex uppercase flex-col items-center justify-center text-white h-full">
					<h1 className="pb-4 text-center leading-none">{heading}</h1>
					<strong className="pb-5 leading-none">{subtitle}</strong>
					<div className="w-full max-w-96 [&>*]:m-auto">
						{ctaLink && ctaText && <CTA ghost text={ctaText} url={ctaLink} />}
					</div>
				</div>
			</div>
		</>
	);
}
