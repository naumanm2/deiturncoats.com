"use client";

import Image from "next/image";

import React, { useState } from "react";

export default function CardImage({
	src1,
	src2,
	alt1,
	alt2,
}: {
	src1: string;
	src2: string;
	alt1: string;
	alt2: string;
}) {
	const [isHovering, setIsHovering] = useState(false);
	const onMouseEnter = () => setIsHovering(true);
	const onMouseLeave = () => setIsHovering(false);
	return (
		<div
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			className="overflow-hidden aspect-[4/5] w-full rounded-2xl mb-1">
			<Image
				className="rounded-2xl"
				src={isHovering ? src1 : src2}
				alt={isHovering ? alt1 : alt2}
				width={1080}
				height={1350}
				style={{ objectFit: "fill" }}
				sizes="(max-width:768px) 50vw, 100vw"
			/>
		</div>
	);
}
