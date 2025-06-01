import Link from "next/link";
import Modal from "./modal";
import Arrow from "@/app/assets/svg/arrow.svg";

export const LanguageSwitcher = ({
	locale,
	pathname,
	visible,
	setVisible,
	onClose,
}: {
	locale: "en" | "fi";
	pathname: string;
	visible: boolean;
	setVisible: (visible: boolean) => void;
	onClose: () => void;
}) => {
	const otherLocale = locale === "en" ? "fi" : "en";

	const localizedPath = pathname.replace(`/${locale}`, "") || "/";
	const newPath = `/${otherLocale}${localizedPath}`;

	const handleClose = () => {
		const timeout = setTimeout(() => setVisible(!visible), 200); // match animation duration
		return () => clearTimeout(timeout);
	};

	return (
		<Modal visible={visible} onClose={onClose} headline="Language:">
			<div className="flex flex-col gap-2">
				<h3 className="pb-16"></h3>
				<Link
					className="w-full p-2 rounded-lg flex justify-between items-center px-3 py-3 bg-foreground transition-background hover:bg-[#232323] duration-200 ease-in-out cursor-pointer"
					href={`/${locale}${localizedPath}`}
					onClick={handleClose}>
					<span className="font-bold text-white">{`${locale.toUpperCase()}`}</span>
					<div className="[&>svg]:h-3 [&>svg]:fill-white">
						<Arrow />
					</div>
				</Link>
				<Link
					className="w-full p-2 rounded-lg flex justify-between items-center px-3 py-3 bg-foreground transition-background hover:bg-[#232323] duration-200 ease-in-out cursor-pointer"
					href={newPath}>
					<span className="font-bold text-white">{`${otherLocale.toUpperCase()}`}</span>
					<div className="[&>svg]:h-3 [&>svg]:fill-white">
						<Arrow />
					</div>
				</Link>
			</div>
			{/* <Link
				href={`/${locale}${localizedPath}`}
				onClick={onClose}
				className={cn(
					"hover:bg-[#00000008] w-full transition-background ease-in-out duration-150 p-4 pr-16 text-sm border-b-2 border-[#00000008]",
					"font-bold"
				)}>
				{`${locale.toUpperCase()} (current)`}
			</Link>
			<Link
				href={newPath}
				onClick={onClose}
				className="hover:bg-[#00000010] w-full transition-background ease-in-out duration-150 p-4 pr-16 text-sm">
				{otherLocale.toUpperCase()}
			</Link> */}
		</Modal>
	);
};
