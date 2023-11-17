import Link from "next/link";
import Image from "next/image";

type NavigationLink = {
	label: string,
	icon: string,
	route: string,
};

export function Navigation() {
	const links: NavigationLink[] = [
		{
			label: "Recents",
			icon: "/recent.svg",
			route: "/recents",
		},
		{
			label: "All",
			icon: "/album.svg",
			route: "/",
		},
	];

	return (
		<nav className="fixed w-full md:w-auto md:h-screen bottom-0 p-4">
			<ul className="flex justify-center gap-4 md:flex-col md:h-full">
				{links.map((link) => (
					<li key={link.route}>
						<Link href={link.route} className="group flex items-center gap-2 w-8">
							<Image src={link.icon} alt="" width="32" height="32" className="opacity-30 hover:opacity-100" />
							<span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 pointer-events-none">{link.label}</span>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
