import Link from "next/link";
import Modal from "./modal";
import Arrow from "@/app/assets/svg/arrow.svg";

export const LanguageSwitcher = ({
	locale,
	pathname,
	visible,
	onClose,
}: {
	locale: "en" | "fi";
	pathname: string;
	visible: boolean;
	onClose: () => void;
}) => {
	const otherLocale = locale === "en" ? "fi" : "en";

	const localizedPath = pathname.replace(`/${locale}`, "") || "/";
	const newPath = `/${otherLocale}${localizedPath}`;



	return (
		<Modal visible={visible} onClose={onClose} headline="Language:">
			{({ onClose }) => (
				<div className="flex flex-col gap-2">
					<h3 className="pb-16"></h3>
					<Link
						className="w-full p-2 rounded-lg flex justify-between items-center px-3 py-3 bg-foreground transition-background hover:bg-[#232323] duration-200 ease-in-out cursor-pointer"
						href={`/${locale}${localizedPath}`}
						onClick={onClose}>
						<span className="font-bold text-white">{`${locale.toUpperCase()}`}</span>
						<div className="[&>svg]:h-3 [&>svg]:fill-white">
							<Arrow />
						</div>
					</Link>
					<Link
						className="w-full p-2 rounded-lg flex justify-between items-center px-3 py-3 bg-foreground transition-background hover:bg-[#232323] duration-200 ease-in-out cursor-pointer"
						href={newPath}
						onClick={onClose}>
						<span className="font-bold text-white">{`${otherLocale.toUpperCase()}`}</span>
						<div className="[&>svg]:h-3 [&>svg]:fill-white">
							<Arrow />
						</div>
					</Link>
				</div>
			)}
		</Modal>
	);
};
