import Link from "next/link";
import CTA from "../cta";
import { PRODUCT_SLUGS } from "./nav";
import Modal from "./modal";

export const ShoppingBasket = ({
	locale,
	visible,
	onClose,
}: {
	locale: "en" | "fi";
	visible: boolean;
	onClose: () => void;
}) => {
	const randomSlug = PRODUCT_SLUGS[Math.floor(Math.random() * PRODUCT_SLUGS.length)];
	const isFinnish = locale === "fi";

	return (
		<Modal visible={visible} onClose={onClose}>
			{({ onClose }) => (
				<div className="w-full">
					<div className="w-full text-center">
						<div className="my-16 mt-8">
							<span className="text-stone-500 font-bold">
								{isFinnish
									? "Ostoskorisi on tyhjä"
									: "Your shopping basket seems to be empty."}
							</span>
						</div>
						<div className="w-full border-t border-stone-500/20">
							<Link
								className="w-full p-2 mt-4 rounded-lg flex justify-between items-center px-3 py-3 bg-foreground transition-background hover:bg-[#232323] duration-200 ease-in-out"
								onClick={onClose}
								href={`/${locale}/${randomSlug}`}>
								<span className="font-bold text-white">
									{isFinnish ? "Ostoksille" : "Get to Shopping"}
								</span>
								<span className="text-white ">0,00 €</span>
							</Link>
						</div>
					</div>
				</div>
			)}
		</Modal>
	);
};
