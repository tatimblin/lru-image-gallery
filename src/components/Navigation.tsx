import Link from "next/link";

export function Navigation() {
	return (
		<nav className="fixed w-full md:w-auto md:h-screen bottom-0 p-4">
			<ul className="flex justify-center gap-4 md:flex-col md:h-full">
				<li>
					<Link href="/recents">Recents</Link>
				</li>
				<li>
					<Link href="/">All</Link>
				</li>
			</ul>
		</nav>
	);
}
