"use client";

import { useEffect, useRef, useState } from "react";

import Close from "@/app/assets/svg/close.svg";
import { cn } from "@/lib/utils";

export default function Modal({
	children,
	visible,
	headline,
	onClose,
}: {
	children: React.ReactNode;
	visible: boolean;
	headline?: string;
	onClose: () => void;
}) {
	const [modalVisible, setModalVisible] = useState(visible);
	// Optional: prevent body scroll when modal is open
	useEffect(() => {
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		const navbar = document.querySelector(".navbar") as HTMLElement | null;

		const preventTouchMove = (e: TouchEvent) => {
			e.preventDefault();
		};

		// Lock scroll
		document.body.style.overflow = "hidden";
		document.body.style.touchAction = "none";
		document.body.style.paddingInlineEnd = `${scrollbarWidth}px`;

		// Lock navbar
		if (navbar) {
			navbar.style.paddingInlineEnd = `${scrollbarWidth}px`;
		}

		// Prevent iOS scroll
		document.addEventListener("touchmove", preventTouchMove, {
			passive: false,
		});

		return () => {
			// Restore scroll
			document.body.style.overflow = "";
			document.body.style.touchAction = "";
			document.body.style.paddingInlineEnd = "0px";

			// Restore navbar
			if (navbar) {
				navbar.style.paddingInlineEnd = "0px";
			}

			// Remove scroll lock
			document.removeEventListener("touchmove", preventTouchMove);
		};
	}, []);

	const touchStartY = useRef<number | null>(null);
	const touchEndY = useRef<number | null>(null);

	const handleTouchStart = (e: React.TouchEvent) => {
		touchStartY.current = e.changedTouches[0].screenY;
	};

	const handleTouchEnd = (e: React.TouchEvent) => {
		touchEndY.current = e.changedTouches[0].screenY;

		if (touchStartY.current !== null && touchEndY.current !== null) {
			const deltaY = touchEndY.current - touchStartY.current;

			if (deltaY > 50) {
				handleClose();
			}
		}
	};

	const handleClose = () => {
		setModalVisible(false);
		const timeout = setTimeout(() => onClose(), 200); // match animation duration
		return () => clearTimeout(timeout);
	};

	return (
		<div
			className={cn(
				"fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs",
				!modalVisible ? "animate-disappear opacity-100" : "animate-emerge opacity-0"
			)}
			onClick={handleClose}
			style={{ willChange: "opacity" }}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}>
			<div
				className={cn(
					"text-foreground bg-background/90 backdrop-blur-2xl border-util-border animate-fade-up relative mx-4 flex max-h-[90vh] w-xl max-w-full transform flex-col overflow-y-auto rounded-xl border border-slate-200 pt-2 pr-2 shadow-xl p-3 md:p-4",
					modalVisible ? "animate-fade-up opacity-0" : "animate-fade-down opacity-100"
				)}
				onClick={(e) => e.stopPropagation()}
				style={{ willChange: "opacity, transform" }}>
				<div className="flex flex-row justify-between">
					<h3 className="">{headline}</h3>
					<div className="">
						<div
							className="text-foreground hover:bg-stone-900/5 transition-colors duration-150 ease-in-out flex cursor-pointer flex-row items-center self-end rounded-md pl-2"
							onClick={handleClose}>
							<span className="pt-0.5 font-bold uppercase">Close</span>

							<Close className="w-7 p-2" />
						</div>
					</div>
				</div>
				{children}
			</div>
		</div>
	);
}
